import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import API from "../services/api";
import "../css/videoInterview.css";

function VideoInterview() {

    const { id } = useParams();

    const navigate = useNavigate();

    const webcamRef = useRef(null);

    // ==========================
    // Interview States
    // ==========================

    const [interview, setInterview] = useState(null);

    const [loading, setLoading] = useState(true);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState([]);

    // ==========================
    // Camera States
    // ==========================

    const [cameraOn, setCameraOn] = useState(false);

    const [snapshot, setSnapshot] = useState(null);

    // ==========================
    // Timer
    // ==========================

    const [timeLeft, setTimeLeft] = useState(600);

    // ==========================
    // Speech Recognition
    // ==========================

    const {

        transcript,

        listening,

        resetTranscript,

        browserSupportsSpeechRecognition,

    } = useSpeechRecognition();

    // ==========================
    // Browser Support
    // ==========================

    if (!browserSupportsSpeechRecognition) {

        return (

            <h2>

                Browser does not support Speech Recognition.

            </h2>

        );

    }

    // ==========================
    // Fetch Interview
    // ==========================

    useEffect(() => {

        fetchInterview();

    }, []);

    const fetchInterview = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(

                `/interview/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setInterview(res.data);

            setAnswers(

                res.data.questions.map((q) => ({

                    questionId: q._id,

                    userAnswer: "",

                }))

            );

        } catch (error) {

            console.log(error);

            alert("Interview not found");

            navigate("/dashboard");

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Current Question
    // ==========================

    const question =

        interview?.questions[currentQuestion];

            // ==========================
    // Camera Controls
    // ==========================

    const startCamera = () => {

        setCameraOn(true);

    };

    const stopCamera = () => {

        setCameraOn(false);

    };

    const captureSnapshot = () => {

        if (!webcamRef.current) return;

        const image = webcamRef.current.getScreenshot();

        if (image) {

            setSnapshot(image);

        }

    };

    // ==========================
    // Speech Controls
    // ==========================

    const startRecording = () => {

        resetTranscript();

        SpeechRecognition.startListening({

            continuous: true,

            language: "en-IN",

        });

    };

    const stopRecording = () => {

        SpeechRecognition.stopListening();

    };

    const clearRecording = () => {

        resetTranscript();

        setAnswers((prev) =>

            prev.map((item, index) =>

                index === currentQuestion

                    ? {

                          ...item,

                          userAnswer: "",

                      }

                    : item

            )

        );

    };

    // ==========================
    // Auto Fill Transcript
    // ==========================

    useEffect(() => {

        if (!transcript) return;

        setAnswers((prev) =>

            prev.map((item, index) =>

                index === currentQuestion

                    ? {

                          ...item,

                          userAnswer: transcript,

                      }

                    : item

            )

        );

    }, [transcript, currentQuestion]);

    // ==========================
    // Speak Current Question
    // ==========================

    const speakQuestion = () => {

        if (!question) return;

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(

            question.question

        );

        speech.lang = "en-US";

        speech.rate = 1;

        speech.pitch = 1;

        window.speechSynthesis.speak(speech);

    };

    // ==========================
    // Speak Question Automatically
    // ==========================

    useEffect(() => {

        if (question) {

            speakQuestion();

        }

    }, [currentQuestion, interview]);

    // ==========================
    // Timer
    // ==========================

    useEffect(() => {

        if (!cameraOn) return;

        if (timeLeft <= 0) {

            finishInterview();

            return;

        }

        const interval = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [cameraOn, timeLeft]);

    // ==========================
    // Format Time
    // ==========================

    const formatTime = (seconds) => {

        const minutes = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${minutes}:${secs < 10 ? "0" + secs : secs}`;

    }; 
        // ==========================
    // Navigation
    // ==========================

    const nextQuestion = () => {

        if (currentQuestion < interview.questions.length - 1) {

            resetTranscript();

            setCurrentQuestion((prev) => prev + 1);

        }

    };

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            resetTranscript();

            setCurrentQuestion((prev) => prev - 1);

        }

    };

    // ==========================
    // Finish Interview
    // ==========================

    const finishInterview = async () => {

        try {

            stopRecording();

            stopCamera();

            const token = localStorage.getItem("token");

            await API.post(

                `/interview/${id}/submit`,

                {

                    answers,

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            navigate(`/result/${id}`);

        } catch (error) {

            console.log(error);

            alert("Failed to submit interview");

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading || !interview) {

        return <div className="loading-screen">Loading...</div>;

    }

    return (

        <div className="video-interview-container">

            <div className="video-card">

                {/* Header */}

                <div className="video-header">

                    <h1>🎥 AI Video Interview</h1>

                    <h2>{interview.role}</h2>

                    <p>

                        Difficulty :

                        <strong> {interview.difficulty}</strong>

                    </p>

                </div>

                {/* Timer */}

                <div className="timer-box">

                    <span>⏱ Time Remaining</span>

                    <h2>{formatTime(timeLeft)}</h2>

                </div>

                {/* Webcam */}

                <div className="webcam-container">

                    {cameraOn ? (

                        <Webcam

                            ref={webcamRef}

                            audio={true}

                            mirrored={true}

                            screenshotFormat="image/jpeg"

                            className="webcam"

                        />

                    ) : (

                        <div className="camera-placeholder">

                            <h2>📷 Camera Off</h2>

                            <p>

                                Click Start Camera

                            </p>

                        </div>

                    )}

                </div>

                {/* Camera Buttons */}

                <div className="camera-buttons">

                    {!cameraOn ? (

                        <button

                            className="start-camera-btn"

                            onClick={startCamera}

                        >

                            🎥 Start Camera

                        </button>

                    ) : (

                        <>

                            <button

                                className="stop-camera-btn"

                                onClick={stopCamera}

                            >

                                ⏹ Stop Camera

                            </button>

                            <button

                                className="capture-btn"

                                onClick={captureSnapshot}

                            >

                                📸 Snapshot

                            </button>

                        </>

                    )}

                </div>

                {/* Current Question */}

                <div className="question-card">

                    <h2>

                        Question {currentQuestion + 1} / {interview.questions.length}

                    </h2>

                    <p>

                        {question.question}

                    </p>

                    <button

                        className="speak-btn"

                        onClick={speakQuestion}

                    >

                        🔊 Speak Again

                    </button>

                </div>

                {/* Answer */}

                <textarea

                    rows="6"

                    className="answer-box"

                    placeholder="Speak or type your answer..."

                    value={answers[currentQuestion]?.userAnswer || ""}

                    onChange={(e) => {

                        const copy = [...answers];

                        copy[currentQuestion].userAnswer = e.target.value;

                        setAnswers(copy);

                    }}

                />
                                {/* ==========================
                    Voice Controls
                ========================== */}

                <div className="voice-controls">

                    <button
                        className="voice-start-btn"
                        onClick={startRecording}
                    >
                        🎤 Start Speaking
                    </button>

                    <button
                        className="voice-stop-btn"
                        onClick={stopRecording}
                    >
                        ⏹ Stop
                    </button>

                    <button
                        className="voice-clear-btn"
                        onClick={clearRecording}
                    >
                        🗑 Clear
                    </button>

                </div>

                {/* Listening Status */}

                {listening && (

                    <div className="listening-indicator">

                        🎙 Listening...

                    </div>

                )}

                {/* Snapshot */}

                {snapshot && (

                    <div className="snapshot-container">

                        <h3>📸 Latest Snapshot</h3>

                        <img
                            src={snapshot}
                            alt="Interview Snapshot"
                            className="snapshot-image"
                        />

                    </div>

                )}

                {/* Question Navigation */}

                <div className="question-navigation">

                    <button
                        className="previous-btn"
                        onClick={previousQuestion}
                        disabled={currentQuestion === 0}
                    >
                        ⬅ Previous
                    </button>

                    {currentQuestion ===
                    interview.questions.length - 1 ? (

                        <button
                            className="submit-btn"
                            onClick={finishInterview}
                        >
                            ✅ Submit Interview
                        </button>

                    ) : (

                        <button
                            className="next-btn"
                            onClick={nextQuestion}
                        >
                            Next ➡
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

}

export default VideoInterview;