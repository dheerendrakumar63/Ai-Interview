import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/profile.css";

function Profile() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // ================= Profile States =================

    const [interviews, setInterviews] = useState([]);

    const [editing, setEditing] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    // ================= Change Password States =================

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [passwordLoading, setPasswordLoading] = useState(false);

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // ================= Fetch Interviews =================

    useEffect(() => {
        fetchInterviews();
    }, []);

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

    // ================= Statistics =================

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
                ...completedInterviews.map((item) =>
                    Number(item.score || 0)
                )
            )
            : 0;

    // ================= Edit Profile =================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleUpdateProfile = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await API.put(
                "/user/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("✅ Profile Updated Successfully");

            setEditing(false);

            window.location.reload();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Profile Update Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    // ================= Password Input =================

    const handlePasswordInput = (e) => {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });

    };

    // ================= Change Password =================

    const handleChangePassword = async () => {

        try {

            setPasswordLoading(true);

            const token = localStorage.getItem("token");

            const res = await API.put(
                "/user/change-password",
                passwordData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setShowPasswordForm(false);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Password Change Failed"
            );

        } finally {

            setPasswordLoading(false);

        }

    };

    // ================= Logout =================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };
        return (

        <div className="profile-container">

            <div className="profile-card">

                {/* ================= Header ================= */}

                <div className="profile-header">

                    <div className="avatar">
                        👤
                    </div>

                    <h1>My Profile</h1>

                </div>

                {/* ================= User Info ================= */}

                <div className="profile-info">

                    {/* Name */}

                    <div className="info-row">

                        <span>Name</span>

                        {editing ? (

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        ) : (

                            <strong>
                                {user?.name || "User"}
                            </strong>

                        )}

                    </div>

                    {/* Email */}

                    <div className="info-row">

                        <span>Email</span>

                        {editing ? (

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        ) : (

                            <strong>
                                {user?.email}
                            </strong>

                        )}

                    </div>

                    {/* Joined */}

                    <div className="info-row">

                        <span>Joined</span>

                        <strong>
                            {new Date().toLocaleDateString()}
                        </strong>

                    </div>

                </div>

                {/* ================= Change Password Form ================= */}

                {showPasswordForm && (

                    <div className="password-card">

                        <h2>
                            🔒 Change Password
                        </h2>

                        <input
                            type="password"
                            placeholder="Old Password"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordInput}
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInput}
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInput}
                        />

                        <div className="password-buttons">

                            <button
                                className="save-password-btn"
                                onClick={handleChangePassword}
                                disabled={passwordLoading}
                            >
                                {
                                    passwordLoading
                                        ? "Updating..."
                                        : "🔒 Change Password"
                                }
                            </button>

                            <button
                                className="cancel-password-btn"
                                onClick={() => {

                                    setShowPasswordForm(false);

                                    setPasswordData({
                                        oldPassword: "",
                                        newPassword: "",
                                        confirmPassword: "",
                                    });

                                }}
                            >
                                ❌ Cancel
                            </button>

                        </div>

                    </div>

                )}

                {/* ================= Statistics ================= */}

                <h2 className="stats-title">

                    📊 Interview Statistics

                </h2>

                <div className="stats-grid">

                    <div className="stat-box">

                        <h3>Total Interviews</h3>

                        <h1>{interviews.length}</h1>

                    </div>

                    <div className="stat-box">

                        <h3>Completed</h3>

                        <h1>{completed}</h1>

                    </div>

                    <div className="stat-box">

                        <h3>Pending</h3>

                        <h1>{pending}</h1>

                    </div>

                    <div className="stat-box">

                        <h3>Average Score</h3>

                        <h1>{averageScore}/10</h1>

                    </div>

                    <div className="stat-box">

                        <h3>Highest Score</h3>

                        <h1>{highestScore}/10</h1>

                    </div>

                </div>
                                {/* ================= Buttons ================= */}

                <div className="profile-buttons">

                    {/* Edit Profile Buttons */}

                    {editing ? (

                        <>
                            <button
                                className="edit-btn"
                                onClick={handleUpdateProfile}
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "💾 Save Changes"}
                            </button>

                            <button
                                className="password-btn"
                                onClick={() => {

                                    setEditing(false);

                                    setFormData({
                                        name: user?.name,
                                        email: user?.email,
                                    });

                                }}
                            >
                                ❌ Cancel
                            </button>

                        </>

                    ) : (

                        <button
                            className="edit-btn"
                            onClick={() => setEditing(true)}
                        >
                            ✏️ Edit Profile
                        </button>

                    )}

                    {/* Change Password */}

                    <button
                        className="password-btn"
                        onClick={() =>
                            setShowPasswordForm(!showPasswordForm)
                        }
                    >
                        {showPasswordForm
                            ? "❌ Close Password Form"
                            : "🔒 Change Password"}
                    </button>

                    {/* History */}

                    <button
                        className="history-btn"
                        onClick={() => navigate("/history")}
                    >
                        📜 Interview History
                    </button>

                    {/* Dashboard */}

                    <button
                        className="dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        🏠 Dashboard
                    </button>

                    {/* Logout */}

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Profile;