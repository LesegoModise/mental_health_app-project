from flask import Flask, request, jsonify
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

app = Flask(__name__)

# Load the model
model = joblib.load('logistic_model.pkl')

# Load and fit the vectorizer with the same data used during training
# This is essential to ensure consistency with how text data was vectorized during model training.
data = pd.read_csv('Combined Data.csv')
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
tfidf_vectorizer.fit(data['statement'].astype(str).fillna(''))

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input JSON data from the request
    input_data = request.get_json()

    # Extract the statement from the input data
    statement = input_data['statement']

    # Transform the input text using the same vectorizer
    input_vector = tfidf_vectorizer.transform([statement])

    # Make a prediction using the logistic regression model
    prediction = model.predict(input_vector)

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
