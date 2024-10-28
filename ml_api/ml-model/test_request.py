# import requests

# url = 'http://127.0.0.1:5000/predict'
# input_data = {'statement': 'I feel happy and energetic today.'}

# response = requests.post(url, json=input_data)
# print(response.json())  # This will print the prediction from the model

import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, Render!"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

