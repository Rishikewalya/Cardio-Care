import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HeartTips = () => {
    const [activeTipIndex, setActiveTipIndex] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);
    
    const heartTips = [
        {
            title: "Daily Exercise",
            description: "Aim for at least 30 minutes of moderate exercise daily. Even brisk walking helps reduce heart disease risk by up to 30%.",
            icon: "heartbeat"
        },
        {
            title: "Balanced Diet",
            description: "Incorporate colorful fruits and vegetables, whole grains, and lean proteins. Limit saturated fats and sodium intake.",
            icon: "apple"
        },
        {
            title: "Stress Management",
            description: "Practice meditation, deep breathing, or yoga daily. Chronic stress directly impacts heart health and blood pressure.",
            icon: "leaf"
        },
        {
            title: "Quality Sleep",
            description: "Aim for 7-8 hours of quality sleep. Poor sleep patterns are linked to increased heart disease risk factors.",
            icon: "moon-o"
        },
        {
            title: "Stay Hydrated",
            description: "Drink at least 8 glasses of water daily. Proper hydration supports optimal heart function and circulation.",
            icon: "tint"
        }
    ];
    
    const nextTip = () => {
        setActiveTipIndex((prevIndex) => (prevIndex + 1) % heartTips.length);
    };
    
    const prevTip = () => {
        setActiveTipIndex((prevIndex) => (prevIndex - 1 + heartTips.length) % heartTips.length);
    };
    
    const favoriteTip = () => {
        setFavoriteCount(favoriteCount + 1);
    };
    
    const renderProgressDots = () => {
        return (
            <View style={styles.progressContainer}>
                {heartTips.map((_, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.progressDot, 
                            index === activeTipIndex && styles.activeDot
                        ]} 
                    />
                ))}
            </View>
        );
    };
    
    const activeTip = heartTips[activeTipIndex];
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Heart Health Coach</Text>
                <Text style={styles.subtitle}>Personalized heart wellness tips</Text>
            </View>
            
            <View style={styles.carousel}>
                <TouchableOpacity onPress={prevTip} style={styles.carouselButton}>
                    <FontAwesome name="chevron-left" size={20} color="#e74c3c" />
                </TouchableOpacity>
                
                <View style={styles.tipCard}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name={activeTip.icon} size={40} color="#e74c3c" />
                    </View>
                    <Text style={styles.tipTitle}>{activeTip.title}</Text>
                    <Text style={styles.tipDescription}>{activeTip.description}</Text>
                    
                    <TouchableOpacity style={styles.favoriteButton} onPress={favoriteTip}>
                        <FontAwesome name="heart" size={16} color="#fff" />
                        <Text style={styles.favoriteText}>Save This Tip</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={nextTip} style={styles.carouselButton}>
                    <FontAwesome name="chevron-right" size={20} color="#e74c3c" />
                </TouchableOpacity>
            </View>
            
            {renderProgressDots()}
            
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{favoriteCount}</Text>
                    <Text style={styles.statLabel}>Saved Tips</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{heartTips.length}</Text>
                    <Text style={styles.statLabel}>Total Tips</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>7</Text>
                    <Text style={styles.statLabel}>Day Streak</Text>
                </View>
            </View>
            
            <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleTitle}>Your Heart Health Plan</Text>
                <View style={styles.scheduleProgressBar}>
                    <View style={styles.scheduleProgress} />
                </View>
                <Text style={styles.scheduleText}>Day 7 of 30-Day Heart Challenge</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f3f3',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    carousel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    carouselButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tipCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ffecec',
    },
    tipTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    tipDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    favoriteButton: {
        flexDirection: 'row',
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    favoriteText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#e74c3c',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'space-around',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    statDivider: {
        width: 1,
        height: '80%',
        backgroundColor: '#eee',
    },
    scheduleContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scheduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    scheduleProgressBar: {
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginBottom: 10,
    },
    scheduleProgress: {
        width: '23%', // 7 days out of 30 = ~23%
        height: '100%',
        backgroundColor: '#e74c3c',
        borderRadius: 4,
    },
    scheduleText: {
        fontSize: 14,
        color: '#666',
    },
});

export default HeartTips;