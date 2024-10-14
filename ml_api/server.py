from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return {
        "age": 23,
        "name": "Sbu"
    }


# Machine Learning code goes in here