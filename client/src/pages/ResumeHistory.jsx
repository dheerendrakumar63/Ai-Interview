import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/resumeHistory.css";

function ResumeHistory() {

    const deleteResume = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        await API.delete(`/resume/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        });

        alert("Resume deleted successfully");

        fetchResumes();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

};

    const [resumes, setResumes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchResumes();

    }, []);

    const fetchResumes = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/resume", {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });

            setResumes(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="resume-history">

            <h1>📄 Resume History</h1>

            {
                resumes.length === 0 ?

                <p>No Resume Found.</p>

                :

                <table>

                    <thead>

                        <tr>

                            <th>File</th>

                            <th>Score</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>
                                               {resumes.map((resume) => (

                            <tr key={resume._id}>

                                <td>{resume.fileName}</td>

                                <td>
                                    ⭐ {resume.score}/100
                                </td>

                                <td>
                                    {new Date(
                                        resume.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate(
                                                `/resume/${resume._id}`
                                            )
                                        }
                                    >
                                        View
                                    </button>

                                   <button
    className="delete-btn"
    onClick={() => deleteResume(resume._id)}
>
    Delete
</button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            }

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
            >
                ⬅ Back to Dashboard
            </button>

        </div>

    );
}

export default ResumeHistory; 
                  
                    