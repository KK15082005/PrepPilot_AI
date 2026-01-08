# from flask import  Flask
# app = Flask(__name__)
# @app.route("/")
# def home():
#     return "PrePilot is LIVE on Azure"
# application = app
# if __name__ == "__main__":
#     app.run(host="0.0.0.0" , port=8000)

from flask import Flask, render_template, request, jsonify

app = Flask(_name_)

# ---------- PAGE ROUTES ----------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/resources")
def resources():
    return render_template("resources.html")

@app.route("/opportunities")
def opportunities():
    return render_template("opportunities.html")

@app.route("/studyplanner")
def studyplanner():
    return render_template("studyplanner.html")

# ---------- CHATBOT API ----------

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message")

    # TEMP LOGIC (safe for MVP)
    bot_reply = f"PrepPilot says: {user_msg}"

    return jsonify({"reply": bot_reply})

application = app







