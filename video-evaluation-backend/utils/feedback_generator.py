import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_feedback(transcript):
    prompt = f"""You are an interview evaluator. Please review the following candidate's response and give feedback on:
- Confidence
- Clarity
- Communication skills
- Suggestions for improvement

Transcript:
"{transcript}"
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    return response.choices[0].message.content
