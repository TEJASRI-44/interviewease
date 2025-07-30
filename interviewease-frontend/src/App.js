import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RoleSelector from "./pages/RoleSelector";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

import CandidateDashboard from "./pages/CandidateDashboard";
import InterviewerDashboard from "./pages/InterviewerDashboard";

import InterviewBooking from "./pages/InterviewBooking";
import MyBookings from "./pages/MyBookings";
import ResumeBuilder from "./pages/ResumeBuilder";
import AutoApply from "./pages/AutoApply";
import InternshipTracker from "./pages/InternshipTracker";
import SavedInternships from "./pages/SavedInternships";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import MockInterview from "./pages/MockInterview";
import InterviewSlotSchedule from "./pages/InterviewSlotSchedule";
import ScheduledInterviews from "./pages/ScheduledInterviews";
import JoinInterview from "./pages/JoinInterviewpage";
import EvaluateCandidates from "./pages/EvaluateCandidates"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/role" element={<RoleSelector />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />

       
        <Route path="/candidate-dashboard" element={<CandidateDashboard />}>
          <Route path="interview-booking" element={<InterviewBooking />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="auto-apply" element={<AutoApply />} />
          <Route path="internship-tracker" element={<InternshipTracker />} />
          <Route path="saved-internships" element={<SavedInternships />} />
          <Route path="profile" element={<Profile />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="mock-interview" element={<MockInterview />} />
        </Route>

        {/* Add Interviewer Dashboard here if needed */}
        <Route path="/interviewer-dashboard" element={<InterviewerDashboard />}>
          <Route path="/interviewer-dashboard/schedule" element={<InterviewSlotSchedule />}/>
          <Route path="/interviewer-dashboard/scheduled-interviews" element={<ScheduledInterviews/>}/>
          <Route path="/interviewer-dashboard/join-interview" element={<JoinInterview/>}/>
          <Route path="/interviewer-dashboard/evaluate-candidates" element={<EvaluateCandidates/>}/>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
