import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/history.css";

function History() {

    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/interview", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setInterviews(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    // ===============================
    // Delete Interview
    // ===============================

    const deleteInterview = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this interview?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/interview/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchHistory();

        } catch (err) {

            console.log(err);

            alert("Unable to delete interview");

        }

    };

    // ===============================
    // Filter Interviews
    // ===============================

    const filteredInterviews = interviews.filter((item) => {

        const roleMatch = item.role
            .toLowerCase()
            .includes(search.toLowerCase());

        const statusMatch =
            filter === "All"
                ? true
                : item.status === filter;

        return roleMatch && statusMatch;

    });

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="history-container">

            <h1>Interview History</h1>

            {/* ===============================
                 Search + Filter
            =============================== */}

            <div className="history-toolbar">

                <input
                    type="text"
                    placeholder="🔍 Search by Role..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >

                    <option value="All">
                        All
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                </select>

            </div>

            {filteredInterviews.length === 0 ? (

                <h2>No Interviews Found.</h2>

            ) : (

                <table className="history-table">

                    <thead>

                        <tr>

                            <th>Role</th>

                            <th>Difficulty</th>

                            <th>Status</th>

                            <th>Score</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                                  {filteredInterviews.map((item) => (

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

                                    <span
                                        className={
                                            Number(item.score) >= 8
                                                ? "score excellent"
                                                : Number(item.score) >= 5
                                                ? "score average"
                                                : "score poor"
                                        }
                                    >
                                        {item.status === "Completed"
                                            ? `${item.score}/10`
                                            : "--"}
                                    </span>

                                </td>

                                <td>

                                    {item.createdAt
                                        ? new Date(
                                              item.createdAt
                                          ).toLocaleDateString()
                                        : "--"}

                                </td>

                                <td>

                                    <div className="action-buttons">

                                        {item.status === "Completed" ? (

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/result/${item._id}`
                                                    )
                                                }
                                            >
                                                👁 View
                                            </button>

                                        ) : (

                                            <button
                                                className="continue-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/interview/${item._id}`
                                                    )
                                                }
                                            >
                                                ▶ Continue
                                            </button>

                                        )}

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteInterview(item._id)
                                            }
                                        >
                                            🗑 Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default History;              