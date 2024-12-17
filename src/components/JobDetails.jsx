import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const removeHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const JobDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(location.state?.job || null);
    const [loading, setLoading] = useState(!job);

    // Загрузка данных, если их нет в state
    useEffect(() => {
        if (!job) {
            const fetchJobDetails = async () => {
                try {
                    const response = await fetch(`https://api.hh.ru/vacancies/${id}`);
                    if (!response.ok) throw new Error("Ошибка загрузки вакансии");
                    const data = await response.json();
                    setJob(data);
                } catch (error) {
                    console.error("Ошибка загрузки данных о вакансии:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchJobDetails();
        }
    }, [id, job]);

    const saveJob = () => {
        const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        if (!savedJobs.find((savedJob) => savedJob.id === job.id)) {
            localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, job]));
            alert("Вакансия сохранена!");
        } else {
            alert("Эта вакансия уже сохранена.");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="text-center mt-5">
                <p className="text-danger">Данные о вакансии не найдены!</p>
            </div>
        );
    }

    const usefulData = {
        Название: job.name,
        Компания: job.employer?.name,
        Город: job.area?.name,
        Зарплата: job.salary
            ? `${job.salary.from || "-"} - ${job.salary.to || "-"} ${job.salary.currency || ""}`
            : "Не указана",
        Требования: removeHtmlTags(job.snippet?.requirement || "Не указаны"),
        Обязанности: removeHtmlTags(job.snippet?.responsibility || "Не указаны"),
    };

    return (
        <div className="container my-4">
            {/* Основной блок с информацией */}
            <div className="card shadow-sm border-dark">
                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">Детали вакансии</h4>
                </div>
                <div className="card-body">
                    {Object.entries(usefulData).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <p className="mb-1">
                                <strong>{key}:</strong>
                            </p>
                            <p className="text-muted">{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Кнопки внизу */}
            <div className="d-flex justify-content-end mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary me-2"
                >
                    ← Назад
                </button>
                <button onClick={saveJob} className="btn btn-primary">
                    Сохранить вакансию
                </button>
            </div>
        </div>
    );
};

export default JobDetails;