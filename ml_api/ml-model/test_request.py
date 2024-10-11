import requests

url = 'http://127.0.0.1:5000/predict'
input_data = {'statement': 'I feel happy and energetic today.'}

response = requests.post(url, json=input_data)
print(response.json())  # This will print the prediction from the model
