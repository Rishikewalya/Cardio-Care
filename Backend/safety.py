from transformers import AutoModelForCausalLM, AutoTokenizer
from pathlib import Path

# Correct local path
model_path = Path(__file__).parent / "saved_model"

if not model_path.exists():
    raise FileNotFoundError(f"Saved model folder not found at {model_path.resolve()}")

# Now load properly
tokenizer = AutoTokenizer.from_pretrained(str(model_path))
model = AutoModelForCausalLM.from_pretrained(str(model_path))
model.eval()

def get_chatbot_response(question):
    input_text = f"Question: {question}"
    inputs = tokenizer(input_text, return_tensors="pt")
    
    outputs = model.generate(
        inputs["input_ids"],
        max_length=256,
        num_return_sequences=1,
        pad_token_id=tokenizer.pad_token_id,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        no_repeat_ngram_size=2
    )
    
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    if "Answer:" in generated_text:
        response = generated_text.split("Answer:")[1].split("END")[0].strip()
    else:
        response = generated_text.replace(input_text, "").strip()
    
    if not response or response == question:
        response = "I'm here to help with heart health questions. Could you please rephrase your question?"
    
    return response

if __name__ == "__main__":
    test_question = "What are symptoms of heart disease?"
    print(f"Q: {test_question}")
    print(f"A: {get_chatbot_response(test_question)}")
