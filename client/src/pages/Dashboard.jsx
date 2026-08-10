import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import DashboardChart from "../components/DashboardChart";
import "../css/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // ==========================
    // States
    // ==========================

    const [interviews, setInterviews] = useState([]);

    const [resumeStats, setResumeStats] = useState({

        totalResumes: 0,

        latestScore: 0,

        lastUpload: null,

    });

    // ==========================
    // Load Dashboard
    // ==========================

    useEffect(() => {

        fetchInterviews();

        fetchResumeStats();

    }, []);

    // ==========================
    // Interview API
    // ==========================

    const fetchInterviews = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/interview", {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });

            setInterviews(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Resume Stats API
    // ==========================

    const fetchResumeStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/resume/stats", {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });

            setResumeStats(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Interview Statistics
    // ==========================

    const completedInterviews = interviews.filter(

        (item) => item.status === "Completed"

    );

    const completed = completedInterviews.length;

    const pending = interviews.filter(

        (item) => item.status === "Pending"

    ).length;

    const averageScore =

        completedInterviews.length > 0

            ? (

                  completedInterviews.reduce(

                      (sum, item) =>

                          sum + Number(item.score || 0),

                      0

                  ) / completedInterviews.length

              ).toFixed(1)

            : 0;

    const highestScore =

        completedInterviews.length > 0

            ? Math.max(

                  ...completedInterviews.map(

                      (item) => Number(item.score || 0)

                  )

              )

            : 0;

    const latestInterview =

        interviews.length > 0

            ? interviews[interviews.length - 1]

            : null;

    // ==========================
    // Logout
    // ==========================

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="dashboard">

            {/* Navbar */}

            <div className="navbar">

                <h2>AI Interview Platform</h2>

                <button onClick={logout}>

                    Logout

                </button>

            </div>

            {/* Welcome */}

            <div className="welcome">

                <h1>

                    Welcome {user?.name} 👋

                </h1>

                <div className="welcome-buttons">

                    <button
                        onClick={() =>
                            navigate("/create-interview")
                        }
                    >
                        ➕ Create Interview
                    </button>

                    <button
                        onClick={() =>
                            navigate("/resume")
                        }
                    >
                        📄 Resume Analyzer
                    </button>

                     {/* <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        📄 Add resume
                    </button> */}

                    <button
                        onClick={() =>
                            navigate("/resume-history")
                        }
                    >
                        📂 Resume History
                    </button>

                    <button
                        onClick={() =>
                            navigate("/history")
                        }
                    >
                        📜 Interview History
                    </button>

                    <button
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        👤 Profile
                    </button>

                </div>

            </div>

            {/* Statistics Cards */}

            <div className="cards">

                <div className="card">

                    <h3>Total Interviews</h3>

                    <h1>{interviews.length}</h1>

                </div>

                <div className="card">

                    <h3>Completed</h3>

                    <h1>{completed}</h1>

                </div>

                <div className="card">

                    <h3>Pending</h3>

                    <h1>{pending}</h1>

                </div>

                <div className="card">

                    <h3>Average Score</h3>

                    <h1>{averageScore}/10</h1>

                </div>

                <div className="card">

                    <h3>Highest Score</h3>

                    <h1>{highestScore}/10</h1>

                </div>

                {/* Resume Cards */}

                <div className="card">

                    <h3>📄 Total Resumes</h3>

                    <h1>{resumeStats.totalResumes}</h1>

                </div>

                <div className="card">

                    <h3>⭐ Resume Score</h3>

                    <h1>{resumeStats.latestScore}/100</h1>

                </div>

                <div className="card">

                    <h3>📅 Last Upload</h3>

                    <p>

                        {resumeStats.lastUpload

                            ? new Date(

                                  resumeStats.lastUpload

                              ).toLocaleDateString()

                            : "No Resume"}

                    </p>

                </div>

            </div>

                        {/* ================= Latest Interview ================= */}

            {latestInterview && (

                <div className="latest-card">

                    <h2>📊 Latest Interview</h2>

                    <div className="latest-details">

                        <p>
                            <strong>Role :</strong> {latestInterview.role}
                        </p>

                        <p>
                            <strong>Difficulty :</strong> {latestInterview.difficulty}
                        </p>

                        <p>
                            <strong>Status :</strong>

                            <span
                                className={
                                    latestInterview.status === "Completed"
                                        ? "status completed"
                                        : "status pending"
                                }
                            >
                                {latestInterview.status}
                            </span>

                        </p>

                        <p>
                            <strong>Score :</strong>

                            {latestInterview.status === "Completed"
                                ? `${latestInterview.score}/10`
                                : "--"}
                        </p>

                    </div>

                    <div className="progress-container">

                        <div
                            className="progress-bar"
                            style={{
                                width:
                                    latestInterview.status === "Completed"
                                        ? `${latestInterview.score * 10}%`
                                        : "0%",
                            }}
                        ></div>

                    </div>

                    <div className="latest-buttons">

                        {latestInterview.status === "Completed" ? (

                            <button
                                className="view-btn"
                                onClick={() =>
                                    navigate(`/result/${latestInterview._id}`)
                                }
                            >
                                View Result
                            </button>

                        ) : (

                            <button
                                className="continue-btn"
                                onClick={() =>
                                    navigate(`/interview/${latestInterview._id}`)
                                }
                            >
                                Continue Interview
                            </button>

                        )}

                    </div>

                </div>

            )}

            {/* ================= Charts ================= */}

            <DashboardChart
                completed={completed}
                pending={pending}
                interviews={interviews}
            />

            {/* ================= Recent Interviews ================= */}

            <h2 className="recent-title">

                Recent Interviews

            </h2>

            <table className="recent-table">

                <thead>

                    <tr>

                        <th>Role</th>

                        <th>Difficulty</th>

                        <th>Status</th>

                        <th>Score</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {interviews.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                }}
                            >
                                No Interviews Found
                            </td>

                        </tr>

                    ) : (

                        interviews.map((item) => (

                            <tr key={item._id}>

                                <td>{item.role}</td>

                                <td>{item.difficulty}</td>

                                <td>

                                    <span
                                        className={
                                            item.status === "Completed"
                                                ? "status completed"
                                                : "status pending"
                                        }
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td>

                                    {item.status === "Completed"
                                        ? `${item.score}/10`
                                        : "--"}

                                </td>

                                <td>

                                    {item.status === "Completed" ? (

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                navigate(`/result/${item._id}`)
                                            }
                                        >
                                            View
                                        </button>

                                    ) : (

                                        <button
                                            className="continue-btn"
                                            onClick={() =>
                                                navigate(`/interview/${item._id}`)
                                            }
                                        >
                                            Continue
                                        </button>

                                    )}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Dashboard;