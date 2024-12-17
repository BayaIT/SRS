// JobDetails.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../JobDetails.css";

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
        // Проверка на дубликаты
        if (!savedJobs.find((savedJob) => savedJob.id === job.id)) {
            localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, job]));
            alert("Вакансия сохранена!");
        } else {
            alert("Эта вакансия уже сохранена.");
        }
    };

    if (loading) {
        return (
            <p className="job-details-info" style={{ textAlign: "center" }}>
                Загрузка данных...
            </p>
        );
    }

    if (!job) {
        return (
            <p className="job-details-info" style={{ textAlign: "center" }}>
                Данные о вакансии не найдены!
            </p>
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
        <div className="job-details-container">
            {/* Кнопка назад */}
            <button
                onClick={() => navigate(-1)}
                className="job-details-back-button"
            >
                Назад
            </button>

            {/* Информация о компании */}
            <div>
                <h1 className="job-details-header">Детали вакансии</h1>
                {Object.entries(usefulData).map(([key, value]) => (
                    <p key={key} className="job-details-info">
                        <strong>{key}:</strong> {value}
                    </p>
                ))}
            </div>

            {/* Кнопка сохранить */}
            <button onClick={saveJob} className="job-details-save-button">
                Сохранить вакансию
            </button>
        </div>
    );
};

export default JobDetails;