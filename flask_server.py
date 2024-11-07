from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Endpoint to handle requests from the frontend
@app.route('/api/generate', methods=['POST'])
def generate():
    user_prompt = request.json.get('prompt')
    
    # Set up the request to the Ollama API
    url = "http://localhost:11434/api/generate"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "gemma2:latest",  # Change to your model
        "prompt": user_prompt,
        "stream": False
    }

    # Call the Ollama API
    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        response_text = response.json()
        return jsonify(response_text)  # Forward the response to the frontend
    else:
        return jsonify({"error": response.status_code, "message": response.text}), response.status_code

if __name__ == '__main__':
    app.run(port=5000)  # Change port if necessary
