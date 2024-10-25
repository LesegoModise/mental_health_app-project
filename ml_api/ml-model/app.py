from flask import Flask, request, jsonify
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
from flask_cors import CORS
import sqlite3
from flask import Flask

app = Flask(__name__)
CORS(app)

moods = [
    {"user_id": 1, "mood": "happy"},
    {"user_id": 1, "mood": "sad"},
    {"user_id": 1, "mood": "neutral"},
    {"user_id": 1, "mood": "happy"},
    {"user_id": 2, "mood": "tired"}
]

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


# Initialize the SQLite database
def init_db():
    with sqlite3.connect('moods.db') as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS moods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            mood TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )''')

@app.route('/api/moods/<int:user_id>', methods=['GET'])
def get_moods(user_id):
    # Filter moods by user_id
    user_moods = [mood['mood'] for mood in moods if mood['user_id'] == user_id]
    
    # Return a mood if available, or a default mood if none found
    if user_moods:
        return jsonify(user_moods)
    else:
        return jsonify(["neutral"]), 200  # Return "neutral" if no moods found

if __name__ == '__main__':
    app.run(port=4011)
