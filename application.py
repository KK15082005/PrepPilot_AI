import streamlit as st
import os
import json
import re
from dotenv import load_dotenv
from openai import AzureOpenAI


load_dotenv()

client = AzureOpenAI(
    api_key= os.getenv("AZURE_OPENAI_KEY"),
    azure_endpoint= os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version = "2025-04-01-preview"

)
st.set_page_config(
    page_title="PrepPilot AI",
    page_icon="🎓",
    layout="centered"
)
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "system",
            "content": (
                "You are PrepPilot, a calm, supportive career mentor for BTech students. "
                "You help students choose career paths (software jobs, internships, startups), "
                "build skill-based roadmaps, and reduce anxiety. "
                "You always give clear, step-by-step plans with timelines, practical tasks, "
                "project ideas, and learning resources. "
                "Focus on career growth, job readiness, and real-world skills — not exams."
            )
        }
    ]
st.title("PrepPilot AI 🎓")
st.write("Ask me anything about studies, careers, or planning.")

for msg in st.session_state.messages:
    if msg["role"] == "user":
        st.markdown(f"*🧑 You:* {msg['content']}")
    elif msg["role"] == "assistant":
        st.markdown(f"*🤖 PrepPilot:* {msg['content']}")

# ------------------ INPUT FORM ------------------
with st.form("prep_pilot_form", clear_on_submit=True):
    user_input = st.text_input("Your question")
    submit = st.form_submit_button("Ask PrepPilot")

# ------------------ CHAT LOGIC ------------------
if submit and user_input.strip():
    # Save user message
    st.session_state.messages.append(
        {"role": "user", "content": user_input}
    )

    with st.spinner("PrepPilot is thinking... 🤖"):
        response = client.chat.completions.create(
            model="gpt-5.2-chat",
            messages=st.session_state.messages
        )

    ai_reply = response.choices[0].message.content

    # Save assistant reply
    st.session_state.messages.append(
        {"role": "assistant", "content": ai_reply}
    )
    # extract bullet points as tasks
tasks = re.findall(r"- (.+)", ai_reply)

if tasks:
    js_code = f"""
    <script>
    localStorage.setItem("aiRoadmap", {json.dumps(tasks)});
    </script>
    """
    st.components.v1.html(js_code)
    st.rerun()
# question = st.text_input("Your question:")

# if st.button("Ask Preppilot"):
#     if question.strip() == "":
#         st.warning("Please ask a question")
#     else:
#         result = client.chat.completions.create(
#             model="gpt-5.2-chat",
#             messages=[
#                 {"role": "system", "content":
#                 "You are PrepPilot, a calm, supportive career mentor for BTech students. "
#                 "You help students choose career paths (software jobs, internships, startups), "
#                 "build skill-based roadmaps, and reduce anxiety. "
#                 "You always give clear, step-by-step plans with timelines, practical tasks, "
#                 "project ideas, and learning resources. "
#                 "Your tone is motivating, friendly, and confidence-building. "
#                 "Focus on career growth, job readiness, and real-world skills — not exams."
#                 }   ,

#                 {"role": "user", "content":
#                 f"""
#                 My goal: {question}

#                 Create a clear career-focused roadmap.
#                 Format the answer like this:

#                 Month 1:
#                 - Task 1
#                 - Task 2
#                 - Mini project

#                 Month 2:
#                 - Task 1
#                 - Task 2
#                 - Mini project

#                 Month 3:
#                 - Task 1
#                 - Task 2
#                 - Resume / job preparation
#                 """
#                 }
#             ]
#         )

#         answer = result.choices[0].message.content
#         st.write(answer)

