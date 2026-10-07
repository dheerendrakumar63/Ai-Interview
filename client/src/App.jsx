import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateInterview from "./pages/CreateInterview";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import ResumeHistory from "./pages/ResumeHistory";
import ResumeReport from "./pages/ResumeReport";
import VideoInterview from "./pages/VideoInterview";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import NewPage from "./pages/newPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
        <Route path="/create-interview" element={<CreateInterview />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/resume-history" element={<ResumeHistory />} />
        <Route path="/resume/:id" element={<ResumeReport />} />
        <Route
          path="/video-interview/:id"
          element={<VideoInterview />}
        />

        <Route path="/newPage" element={<NewPage />} />
      </Routes>
    </>
  );
}

export default App;