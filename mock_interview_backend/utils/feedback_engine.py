import openai
openai.api_key = "REMOVED"

def generate_feedback(transcript):
    prompt = f"""
You're an AI Interview Coach. Analyze the following interview answer transcript. Provide constructive feedback on:

- Content relevance
- Communication clarity
- Confidence and fluency
- Technical depth (if any)
- Improvement suggestions

Transcript:
{transcript}

AI Feedback:
"""

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=300,
        temperature=0.7
    )
    return response.choices[0].text.strip()
