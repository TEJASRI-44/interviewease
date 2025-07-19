import openai
openai.api_key = "REMOVED"

def generate_questions(jd_text):
    prompt = f"""
You're an experienced technical interviewer. Based on the job description below, generate 5 concise and relevant interview questions.

Job Description:
{jd_text}

Questions:"""

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=300,
        temperature=0.6
    )
    questions = response.choices[0].text.strip().split('\n')
    return [q.strip("- ").strip() for q in questions if q.strip()]
