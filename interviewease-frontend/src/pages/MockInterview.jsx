import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function MockInterview() {
  const [jobDesc, setJobDesc] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [feedback, setFeedback] = useState("");

  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  const handleGenerateQuestions = async () => {
    if (!jobDesc.trim()) return alert("Please enter a job description.");
    const res = await axios.post("http://127.0.0.1:5000/generate-questions", { jd: jobDesc });
    setQuestions(res.data.questions);
    setCurrentQ(0);
    setFeedback("");
    setVideoURL(null);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    recordedChunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      setVideoURL(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const uploadAndGetFeedback = async () => {
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", blob, "response.webm");

    const res = await axios.post("http://127.0.0.1:5000/video-feedback", formData);
    setFeedback(res.data.feedback);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-12 px-6">
      <motion.h1
        className="text-4xl font-extrabold text-blue-800 mb-8 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
         AI-Powered Mock Interview
      </motion.h1>

      <motion.textarea
        className="w-full max-w-3xl p-4 text-base border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-6"
        rows={6}
        placeholder="Paste the job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />

      <motion.button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition mb-10"
        onClick={handleGenerateQuestions}
        whileTap={{ scale: 0.95 }}
      >
        Generate Interview Questions
      </motion.button>

      {questions.length > 0 && (
        <motion.div
          className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Question {currentQ + 1} of {questions.length}
          </h2>
          <p className="text-gray-700 mb-6">{questions[currentQ]}</p>

          {!recording ? (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
              onClick={startRecording}
            >
              🎥 Start Recording
            </button>
          ) : (
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
              onClick={stopRecording}
            >
              ⏹ Stop Recording
            </button>
          )}

          {videoURL && (
            <div className="mt-6">
              <video
                src={videoURL}
                controls
                className="w-full rounded-lg border border-gray-300"
              />
              <button
                className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg transition"
                onClick={uploadAndGetFeedback}
              >
                🔍 Get AI Feedback
              </button>
            </div>
          )}

          {feedback && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">AI Feedback:</h3>
              <p className="text-gray-700 whitespace-pre-line">{feedback}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
