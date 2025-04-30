import sys
from transformers import AutoModelForCausalLM, AutoTokenizer
from pathlib import Path

# Load model
model_path = Path(__file__).parent / "saved_model"

if not model_path.exists():
    raise FileNotFoundError(f"Saved model folder not found at {model_path.resolve()}")

tokenizer = AutoTokenizer.from_pretrained(str(model_path))
model = AutoModelForCausalLM.from_pretrained(str(model_path))
model.eval()

def get_chatbot_response(question):
    # Better prompt formatting
    input_text = f"Question: {question}\nAnswer:"
    
    inputs = tokenizer(input_text, return_tensors="pt")

    outputs = model.generate(
        inputs["input_ids"],
        max_length=100,
        num_return_sequences=1,
        pad_token_id=tokenizer.pad_token_id,
        eos_token_id=tokenizer.eos_token_id,  # <- important to set stopping token
        temperature=0.7,                      # <- better randomness control
        top_p=0.9,                            # <- nucleus sampling (good quality)
        repetition_penalty=1.1                # <- avoid repeating
    )

    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Only return the "Answer" part
    if "Answer:" in output_text:
        return output_text.split("Answer:")[1].strip()
    else:
        return output_text.strip()

if __name__ == "__main__":
    question = sys.argv[1]
    response = get_chatbot_response(question)

    print(response, flush=True)
