import whisper

model = whisper.load_model("base")  # You can use "small" or "medium" if needed

def transcribe_video(video_path):
    print(f"Transcribing: {video_path}")
    result = model.transcribe(video_path)
    return result['text']
