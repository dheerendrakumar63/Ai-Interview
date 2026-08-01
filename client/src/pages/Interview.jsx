import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import API from "../services/api";
import "../css/interview.css";

function Interview() {

    const { id } = useParams();

    const navigate = useNavigate();

    // ==========================
    // States
    // ==========================

    const [interview, setInterview] = useState(null);

    const [loading, setLoading] = useState(true);

    const [answers, setAnswers] = useState([]);

    const [activeQuestion, setActiveQuestion] = useState(null);

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
    // Fetch Interview
    // ==========================

    useEffect(() => {

        fetchInterview();

    }, []);

    const fetchInterview = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(`/interview/${id}`, {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });

            setInterview(res.data);

            setAnswers(

                res.data.questions.map((question) => ({

                    questionId: question._id,

                    userAnswer: question.userAnswer || "",

                }))

            );

        } catch (error) {

            console.log(error);

            alert("Interview not found");

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Browser Support
    // ==========================

    if (!browserSupportsSpeechRecognition) {

        return (

            <h2>

                Your browser does not support Speech Recognition.

            </h2>

        );

    }
        // ==========================
    // Handle Answer Change
    // ==========================

    const handleAnswerChange = (questionId, value) => {

        setAnswers((prev) =>

            prev.map((item) =>

                item.questionId === questionId

                    ? { ...item, userAnswer: value }

                    : item

            )

        );

    };

    // ==========================
    // Voice Recording
    // ==========================

    const startRecording = (questionId) => {

        setActiveQuestion(questionId);

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

        if (activeQuestion) {

            handleAnswerChange(activeQuestion, "");

        }

    };

    // ==========================
    // Auto Fill Transcript
    // ==========================

    useEffect(() => {

        if (activeQuestion && transcript) {

            handleAnswerChange(

                activeQuestion,

                transcript

            );

        }

    }, [transcript]);

    // ==========================
    // Submit Interview
    // ==========================
const submitInterview = async () => {

    // ==========================
    // Check Answered Questions
    // ==========================

    const answeredQuestions = answers.filter(
        (item) => item.userAnswer.trim() !== ""
    ).length;

    if (answeredQuestions < interview.questions.length) {

        const confirmSubmit = window.confirm(
            `You answered only ${answeredQuestions} out of ${interview.questions.length} questions.\n\nDo you still want to submit?`
        );

        if (!confirmSubmit) {
            return;
        }
    }

    try {

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

        alert("Interview Submitted Successfully");

        navigate(`/result/${id}`);

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to submit interview"
        );
    }
};

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return <h2>Loading Interview...</h2>;

    }

    return (

        <div className="interview-container">

            {/* ==========================
                Header
            ========================== */}

            <div className="interview-header">

                <h1>{interview.role}</h1>

                <p>

                    Difficulty :

                    <b> {interview.difficulty}</b>

                </p>

                <p>

                    Questions :

                    <b> {interview.questions.length}</b>

                </p>

            </div>

            {/* ==========================
                Question List
            ========================== */}

            <div className="question-list">
                                {interview.questions.map((question, index) => (

                    <div
                        className="question-card"
                        key={question._id}
                    >

                        <h3>
                            Question {index + 1}
                        </h3>

                        <p>{question.question}</p>

                        <textarea
                            rows="5"
                            placeholder="Write your answer or use voice..."
                            value={
                                answers.find(
                                    (item) =>
                                        item.questionId === question._id
                                )?.userAnswer || ""
                            }
                            onChange={(e) =>
                                handleAnswerChange(
                                    question._id,
                                    e.target.value
                                )
                            }
                        />

                        {/* ==========================
                            Voice Controls
                        ========================== */}

                        <div className="voice-controls">

                            <button
                                className="voice-btn start-btn"
                                onClick={() =>
                                    startRecording(question._id)
                                }
                            >
                                🎤 Start
                            </button>

                            <button
                                className="voice-btn stop-btn"
                                onClick={stopRecording}
                            >
                                ⏹ Stop
                            </button>

                            <button
                                className="voice-btn clear-btn"
                                onClick={clearRecording}
                            >
                                🗑 Clear
                            </button>

                        </div>

                        {activeQuestion === question._id &&
                            listening && (

                            <p className="listening-text">
                                🎙 Listening...
                            </p>

                        )}

                    </div>

                ))}

            </div>

            {/* ==========================
                Submit Button
            ========================== */}

            <button
                className="submit-btn"
                onClick={submitInterview}
            >
                Submit Interview
            </button>

        </div>

    );

}

export default Interview;
                
            