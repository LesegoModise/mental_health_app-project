from flask import Flask, request, jsonify

# Option 1 (if ml_model.py is in the same directory)

# Option 2 (if ml_model.py is in a different directory)
from ml_model.py import predict # type: ignore

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text')
    # Preprocess the text (optional)
    # ...
    prediction = predict([text])[0]
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)