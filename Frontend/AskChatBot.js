import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';

// Update this to your actual Python backend address
// For real device testing, this would be your computer's IP address
// For emulator on the same machine, use special addresses:
// - Android emulator: 10.0.2.2:5000
// - iOS simulator: localhost:5000
const API_URL = 'http://172.20.10.5:5000';

const AskChatBot = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  // Function to send question to the Python backend
  const askQuestion = async () => {
    if (!question.trim()) return;
    
    // Add user question to conversation
    const userQuestion = question.trim();
    setConversation([...conversation, { type: 'user', text: userQuestion }]);
    setQuestion('');
    setIsLoading(true);

    try {
      // Connect to your Python Flask backend
      const response = await fetch(`${API_URL}/api/predict/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response to conversation
      setConversation(prevConversation => [
        ...prevConversation, 
        { type: 'bot', text: data.response }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Show an alert with the error details in development
      if (__DEV__) {
        Alert.alert('API Error', error.toString());
      }
      
      // Add error message to conversation
      setConversation(prevConversation => [
        ...prevConversation, 
        { type: 'bot', text: "Sorry, I couldn't process your question. Please check your connection and try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when conversation updates
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Text style={styles.title}>Heart Health Assistant</Text>
      
      <ScrollView 
        style={styles.conversationContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.conversationContent}
      >
        {conversation.length === 0 ? (
          <Text style={styles.introText}>
            Hello! I'm your heart health assistant. Ask me any questions about heart disease symptoms, prevention, or treatments.
          </Text>
        ) : (
          conversation.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.messageContainer,
                item.type === 'user' ? styles.userMessage : styles.botMessage
              ]}
            >
              <Text style={[
                styles.messageText,
                item.type === 'user' ? styles.userMessageText : styles.botMessageText
              ]}>
                {item.text}
              </Text>
            </View>
          ))
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0066cc" />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="Type your heart health question..."
          placeholderTextColor="#999"
          multiline
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={askQuestion}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !question.trim() && styles.disabledButton]} 
          onPress={askQuestion}
          disabled={!question.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0066cc',
    marginTop: 20,
    marginBottom: 10,
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  conversationContent: {
    paddingBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 12,
    marginVertical: 6,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0066cc',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9e9eb',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 12,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#0066cc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AskChatBot;