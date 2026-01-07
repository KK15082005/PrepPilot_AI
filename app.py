import flask from Flask
 app = Flask(__name__)
@app.router("/")
def home():
    return "PrePilot is LIVE on Azure"

