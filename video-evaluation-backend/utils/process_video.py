import os
import speech_recognition as sr
from moviepy import *

def extract_features(video_path):
    # Extract audio from video
    audio_path = "temp_audio.wav"
    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path)


    # Transcribe using speech recognition
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
        transcript = recognizer.recognize_google(audio)
    
    # Clean up temp audio
    os.remove(audio_path)
    return transcript
