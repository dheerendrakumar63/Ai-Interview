import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import "../css/newPage.css";

const NewPage = () => {

    // =====================================
    // Form State
    // =====================================

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        education: "",
        skills: "",
    });

    // =====================================
    // File State
    // =====================================

    const [resumeFile, setResumeFile] = useState(null);

    // =====================================
    // Saved Resumes
    // =====================================

    const [resumes, setResumes] = useState([]);

    // =====================================
    // Loading State
    // =====================================

    const [loading, setLoading] = useState(false);

    // =====================================
    // Edit State
    // =====================================

    const [editingId, setEditingId] = useState(null);


    // =====================================
    // Handle Input
    // =====================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =====================================
    // Handle File
    // =====================================

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        setResumeFile(file || null);

    };


    // =====================================
    // Get Saved Resumes
    // =====================================

    const fetchResumes = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res = await API.get(
                "/resume/my-resumes",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setResumes(
                res.data.resumes || []
            );

        } catch (error) {

            console.error(
                "Fetch Resume Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch resumes"
            );

        }

    };


    // =====================================
    // Load Resumes
    // =====================================

    useEffect(() => {

        fetchResumes();

    }, []);


    // =====================================
    // Submit / Update Resume
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");


            // =================================
            // FormData
            // =================================

            const data = new FormData();

            data.append(
                "name",
                formData.name
            );

            data.append(
                "email",
                formData.email
            );

            data.append(
                "phone",
                formData.phone
            );

            data.append(
                "education",
                formData.education
            );

            data.append(
                "skills",
                formData.skills
            );


            // =================================
            // File Optional
            // =================================

            if (resumeFile) {

                data.append(
                    "resume",
                    resumeFile
                );

            }


            // =================================
            // ADD or UPDATE API
            // =================================

            let res;

            if (editingId) {

                // UPDATE

                res = await API.put(
                    `/resume/${editingId}`,
                    data,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            } else {

                // CREATE

                res = await API.post(
                    "/resume/create",
                    data,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            }


            // =================================
            // Success Message
            // =================================

            toast.success(
                editingId
                    ? "Resume Updated Successfully!"
                    : "Resume Added Successfully!"
            );


            // =================================
            // Update Resume List
            // =================================

            if (editingId) {

                setResumes((prev) =>
                    prev.map((resume) =>
                        resume._id === editingId
                            ? res.data.resume
                            : resume
                    )
                );

            } else {

                setResumes((prev) => [
                    res.data.resume,
                    ...prev,
                ]);

            }


            // =================================
            // Reset Form
            // =================================

            setFormData({
                name: "",
                email: "",
                phone: "",
                education: "",
                skills: "",
            });

            setResumeFile(null);

            setEditingId(null);

            // Reset file input

            e.target.reset();


        } catch (error) {

            console.error(
                "Resume Save Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to save resume"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // Edit Resume
    // =====================================

    const handleEdit = (resume) => {

        setEditingId(resume._id);

        // Existing data form me fill karo

        setFormData({
            name: resume.name || "",
            email: resume.email || "",
            phone: resume.phone || "",
            education: resume.education || "",
            skills: resume.skills || "",
        });

        // Existing file ko file input me
        // automatically set nahi kar sakte

        setResumeFile(null);

        // Scroll to top

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // =====================================
    // Cancel Edit
    // =====================================

    const handleCancelEdit = () => {

        setEditingId(null);

        setFormData({
            name: "",
            email: "",
            phone: "",
            education: "",
            skills: "",
        });

        setResumeFile(null);

    };


    // =====================================
    // Delete Resume
    // =====================================

    const handleDelete = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await API.delete(
                `/resume/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            // Remove from UI

            setResumes((prev) =>
                prev.filter(
                    (resume) =>
                        resume._id !== id
                )
            );


            // If currently editing

            if (editingId === id) {

                handleCancelEdit();

            }


            toast.success(
                "Resume Deleted Successfully"
            );


        } catch (error) {

            console.error(
                "Delete Resume Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to delete resume"
            );

        }

    };


    // =====================================
    // Get Currently Editing Resume
    // =====================================

    const currentResume = editingId
        ? resumes.find(
            (resume) =>
                resume._id === editingId
        )
        : null;


    // =====================================
    // JSX
    // =====================================

    return (

        <div className="resume-page">


            {/* =================================
                LEFT SIDE
            ================================= */}

            <div className="resume-container">

                <div className="resume-card">


                    {/* Heading */}

                    <h1>

                        {editingId
                            ? "Edit Resume"
                            : "Add Resume"}

                    </h1>


                    <p className="subtitle">

                        {editingId
                            ? "Update your resume details"
                            : "Add your resume details to continue"}

                    </p>


                    {/* =================================
                        FORM
                    ================================= */}

                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* Name */}

                        <div className="form-group">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Phone */}

                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Education */}

                        <div className="form-group">

                            <label>
                                Education
                            </label>

                            <textarea
                                name="education"
                                placeholder="Enter your education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Skills */}

                        <div className="form-group">

                            <label>
                                Skills
                            </label>

                            <textarea
                                name="skills"
                                placeholder="Enter your skills"
                                value={formData.skills}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* =================================
                            EXISTING RESUME
                        ================================= */}

                        {editingId &&
                            currentResume?.fileName && (

                                <div className="current-resume">

                                    <label>
                                        Current Resume
                                    </label>

                                    <div className="current-resume-box">

                                        <span>
                                            📄{" "}
                                            {currentResume.fileName}
                                        </span>


                                        {/* View Resume
                                            only if fileUrl exists
                                        */}

                                        {currentResume.fileUrl && (

                                            <a
                                                href={
                                                    currentResume.fileUrl
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-sm"
                                            >
                                                👁️ View
                                            </a>

                                        )}

                                    </div>

                                </div>

                            )}


                        {/* =================================
                            Upload / Replace Resume
                        ================================= */}

                        <div className="form-group">

                            <label>

                                {editingId
                                    ? "Replace Resume (Optional)"
                                    : "Upload Resume"}

                            </label>


                            <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                onChange={
                                    handleFileChange
                                }
                            />


                            {/* Selected New File */}

                            {resumeFile && (

                                <div className="selected-file">

                                    📄 New File:

                                    <strong>
                                        {" "}
                                        {resumeFile.name}
                                    </strong>

                                </div>

                            )}


                            {/* Edit Help */}

                            {editingId && (

                                <small className="text-muted d-block mt-2">

                                    Select a new file only if
                                    you want to replace the
                                    existing resume.

                                </small>

                            )}

                        </div>


                        {/* =================================
                            BUTTONS
                        ================================= */}

                        <div className="resume-actions">


                            {/* Submit */}

                            <button
                                type="submit"
                                className="resume-btn"
                                disabled={loading}
                            >

                                {loading

                                    ? editingId
                                        ? "Updating Resume..."
                                        : "Adding Resume..."

                                    : editingId
                                        ? "Update Resume"
                                        : "Add Resume"}

                            </button>


                            {/* Cancel */}

                            {editingId && (

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={
                                        handleCancelEdit
                                    }
                                >
                                    Cancel
                                </button>

                            )}

                        </div>


                    </form>

                </div>

            </div>


            {/* =================================
                RIGHT SIDE
                BOOTSTRAP TABLE
            ================================= */}

            <div className="saved-resumes">

                <h2>
                    My Resumes
                </h2>


                {resumes.length === 0 ? (

                    <div className="alert alert-info">

                        No resume added yet.

                    </div>

                ) : (

                    <div className="table-responsive">


                        <table className="table table-bordered table-hover align-middle">


                            {/* TABLE HEADER */}

                            <thead className="table-primary">

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Education
                                    </th>

                                    <th>
                                        Skills
                                    </th>

                                    <th>
                                        Resume
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            {/* TABLE BODY */}

                            <tbody>

                                {resumes.map(
                                    (resume, index) => (

                                        <tr
                                            key={
                                                resume._id
                                            }
                                        >

                                            {/* # */}

                                            <td>
                                                {index + 1}
                                            </td>


                                            {/* Name */}

                                            <td>
                                                {resume.name}
                                            </td>


                                            {/* Email */}

                                            <td>
                                                {resume.email}
                                            </td>


                                            {/* Phone */}

                                            <td>
                                                {resume.phone}
                                            </td>


                                            {/* Education */}

                                            <td>
                                                {resume.education}
                                            </td>


                                            {/* Skills */}

                                            <td>
                                                {resume.skills}
                                            </td>


                                            {/* Resume */}

                                            <td>

                                                {resume.fileName ? (

                                                    <div>

                                                        📄{" "}

                                                        {resume.fileName}


                                                        {/* View Existing Resume */}

                                                        {resume.fileUrl && (

                                                            <a
                                                                href={
                                                                    resume.fileUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-primary btn-sm d-block mt-2"
                                                            >
                                                                👁️ View
                                                            </a>

                                                        )}

                                                    </div>

                                                ) : (

                                                    <span className="text-muted">
                                                        No File
                                                    </span>

                                                )}

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                <div className="d-flex gap-2">


                                                    {/* Edit */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() =>
                                                            handleEdit(
                                                                resume
                                                            )
                                                        }
                                                    >
                                                        ✏️ Edit
                                                    </button>


                                                    {/* Delete */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                resume._id
                                                            )
                                                        }
                                                    >
                                                        🗑️ Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

};

export default NewPage;