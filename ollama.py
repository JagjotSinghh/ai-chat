import requests
import json

url = "http://localhost:11434/api/generate"

headers = {
    "Content-Type": "application/json"
}

data = {
    "model": "llama3.1:latest", 
    "prompt": "Tell me best songs of Amrinder Gill",
    "stream": False
}

response = requests.post(url, headers=headers, data=json.dumps(data))

if response.status_code == 200:
    response_text = response.text
    data = json.loads(response_text)
    actual_response = data.get("response", "No response field found.")
    print(actual_response)
else:
    print("Error:", response.status_code, response.text)