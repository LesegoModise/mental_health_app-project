from flask import Flask, request, jsonify
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('logistic_model.pkl')

# Load and fit the vectorizer with the same data used during training
data = pd.read_csv('Combined Data.csv')
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
tfidf_vectorizer.fit(data['statement'].astype(str).fillna(''))

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input JSON data from the request
    input_data = request.get_json()

    # Extract the statement from the input data
    statement = input_data.get('statement', '')

    # Transform the input text using the same vectorizer
    input_vector = tfidf_vectorizer.transform([statement])

    # Make a prediction using the logistic regression model
    prediction = model.predict(input_vector)

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction.tolist()})

@app.route("/")
def hello():
    return "Hello, Through The Skull!"

if __name__ == "__main__":
    # Set the host to 0.0.0.0 for Render and use the PORT environment variable if available
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
