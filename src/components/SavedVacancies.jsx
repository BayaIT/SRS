import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";  // Импортируем иконку мусорки

const SavedVacancies = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedJobs(jobs);
    }, []);

    const removeFromSaved = (jobId) => {
        const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
        setSavedJobs(updatedJobs);
    };

    const removeAllFromSaved = () => {
        localStorage.removeItem("savedJobs");
        setSavedJobs([]);
    };

    const handleJobClick = (job) => {
        navigate(`/job/${job.id}`, { state: { job } });
    };

    const handleCompanyClick = (company) => {
        navigate(`/company/${company.id}`, { state: { company } });
    };

    return (
        <div className="container">
            <h2 className="text-center my-4 text-black">Сохранённые вакансии</h2>
            <div className="d-flex flex-column align-items-center position-relative">
                {/* Иконка мусорки в правом верхнем углу для удаления всех вакансий */}
                <div
                    className="position-absolute top-0 end-0 p-3"
                    style={{ cursor: "pointer" }}
                    onClick={removeAllFromSaved}
                >
                    <FaTrash size={30} color="black" />
                </div>

                {savedJobs.length > 0 ? (
                    savedJobs.map((job) => (
                        <div key={job.id} className="mb-4">
                            <div className="card shadow-sm border-2 border-dark" style={{ minWidth: "780px", maxWidth: "780px", padding: "6px" }}>
                                <div className="d-flex">
                                    <img
                                        src={job.employer?.logo_urls?.original || "https://via.placeholder.com/250x250"}
                                        alt="card-image"
                                        className="card-img-left"
                                        style={{
                                            width: "250px",
                                            height: "250px",
                                            objectFit: "contain",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <div className="card-body d-flex flex-column" style={{ paddingLeft: "16px" }}>
                                        <h5 className="card-title">{job.name}</h5>
                                        <p className="card-text" style={{ textAlign: "left" }}>
                                            <strong>Компания:</strong> {job.employer?.name}
                                        </p>
                                        <p className="card-text" style={{ textAlign: "left" }}>
                                            <strong>Город:</strong> {job.area?.name}
                                        </p>
                                        <p className="card-text" style={{ textAlign: "left" }}>
                                            <strong>Зарплата:</strong>{" "}
                                            {job.salary
                                                ? `${job.salary.from || "Не указана"} - ${job.salary.to || "Не указана"}`
                                                : "Не указана"}
                                        </p>
                                        <div className="mt-auto d-flex justify-content-end">
                                            <button
                                                onClick={() => handleCompanyClick(job.employer)}
                                                className="btn btn-outline-dark me-2"
                                                style={{ padding: "6px 12px" }}
                                            >
                                                О компании
                                            </button>
                                            <button
                                                onClick={() => handleJobClick(job)}
                                                className="btn btn-dark"
                                                style={{ padding: "6px 12px" }}
                                            >
                                                Подробнее
                                            </button>
                                            <button
                                                onClick={() => removeFromSaved(job.id)}
                                                className="btn btn-danger ms-2"
                                                style={{ padding: "6px 12px" }}
                                            >
                                                <FaTrash /> {/* Иконка мусорки для удаления вакансии */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black">Нет сохранённых вакансий.</p>
                )}
            </div>
        </div>
    );
};

export default SavedVacancies;