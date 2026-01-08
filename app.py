# from flask import  Flask
# app = Flask(__name__)
# @app.route("/")
# def home():
#     return "PrePilot is LIVE on Azure"
# application = app
# if __name__ == "__main__":
#     app.run(host="0.0.0.0" , port=8000)
import streamlit as st
import os
from openai import AzureOpenAI

# ---------------- CONFIG ----------------
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version="2024-02-15-preview"
)

st.set_page_config(
    page_title="PrepPilot AI",
    page_icon="🎓",
    layout="centered"
)

# ---------------- SESSION STATE ----------------
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "system",
            "content": (
                "You are PrepPilot, a calm, supportive career mentor for BTech students. "
                "You help with career paths, internships, jobs, skill roadmaps and confidence."
            )
        }
    ]

# ---------------- UI ----------------
st.title("🎓 PrepPilot AI")
st.write("Career-focused AI mentor powered by Azure OpenAI")

for msg in st.session_state.messages[1:]:
    role = "🧑 You" if msg["role"] == "user" else "🤖 PrepPilot"
    st.markdown(f"*{role}:* {msg['content']}")

user_input = st.chat_input("Ask PrepPilot...")

if user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})

    with st.spinner("Thinking..."):
        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=st.session_state.messages
        )

    reply = response.choices[0].message.content
    st.session_state.messages.append({"role": "assistant", "content": reply})
    st.rerun()

