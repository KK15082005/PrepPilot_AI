import flask from Flask
import gunicorn
app = Flask(__name__)
@app.router("/")
def home():
    return "PrePilot is LIVE on Azure"
    application = app



