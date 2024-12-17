// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SavedVacancies.css"; // Импорт стилей

const SavedVacancies = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedJobs(jobs);
    }, []);

    return (
        <div className="saved-vacancies-container">
            <h1 className="saved-vacancies-header">Сохранённые вакансии</h1>
            {savedJobs.length > 0 ? (
                savedJobs.map((job) => (
                    <div key={job.id} className="saved-vacancy-card">
                        <h2 className="saved-vacancy-title">{job.name}</h2>
                        <p className="saved-vacancy-company">
                            <strong>Компания:</strong> {job.employer?.name}
                        </p>
                        <button
                            onClick={() => navigate(`/job/${job.id}`, { state: { job } })}
                            className="saved-vacancy-button"
                        >
                            Подробнее
                        </button>
                    </div>
                ))
            ) : (
                <p className="saved-vacancy-empty">Нет сохранённых вакансий.</p>
            )}
        </div>
    );
};

export default SavedVacancies;