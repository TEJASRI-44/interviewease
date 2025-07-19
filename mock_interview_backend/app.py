from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    data = request.get_json()
    jd_text = data.get("jd", "")
    if not jd_text:
        return jsonify({"error": "Job description is empty"}), 400

    # ✅ Dummy questions for frontend testing
    questions = [
        "Tell me about yourself.",
        "Why do you want to work at our company?",
        "Explain one of your recent projects.",
        "How do you handle deadlines under pressure?",
        "What are your strengths and weaknesses?"
    ]

    return jsonify({"questions": questions})

@app.route("/video-feedback", methods=["POST"])
def video_feedback():
    video = request.files.get("video")
    if not video:
        return jsonify({"error": "No video uploaded"}), 400

    # ✅ Dummy feedback for testing
    feedback = """✔️ Good communication\n✔️ Confident eye contact\n❌ Minor hesitation\n✔️ Clear structure"""
    return jsonify({"feedback": feedback})

if __name__ == "__main__":
    app.run(debug=True)
