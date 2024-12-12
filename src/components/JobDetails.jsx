// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const job = location.state?.job;

    if (!job) {
        return (
            <p style={{ color: "black", fontSize: "18px", textAlign: "center" }}>
                Данные о вакансии не найдены!
            </p>
        );
    }

    // Полезные данные, которые мы хотим отобразить
    const usefulData = {
        Название: job.name,
        Компания: job.employer?.name,
        Город: job.area?.name,
        Зарплата: job.salary
            ? `${job.salary.from || "-"} - ${job.salary.to || "-"} ${
                job.salary.currency || ""
            }`
            : "Не указана",
        Требования: job.snippet?.requirement || "Не указаны",
        Обязанности: job.snippet?.responsibility || "Не указаны",
    };

    return (
        <div
            style={{
                padding: "16px",
                maxWidth: "800px",
                margin: "0 auto",
                border: "2px solid black",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Кнопка назад */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "16px",
                    padding: "8px 16px",
                    border: "2px solid black",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "black",
                    transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                    e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "black";
                }}
            >
                Назад
            </button>

            <h1 style={{ color: "black", fontSize: "24px", marginBottom: "16px" }}>
                Детали вакансии
            </h1>

            {/* Вывод полезных данных */}
            <div>
                {Object.entries(usefulData).map(([key, value]) => (
                    <p key={key} style={{ marginBottom: "8px", color: "black" }}>
                        <strong>{key}:</strong> {value}
                    </p>
                ))}
            </div>

            {/* Кнопка перехода на HH.ru */}
            <button
                onClick={() => window.open(job.alternate_url, "_blank")}
                style={{
                    marginTop: "16px",
                    padding: "8px 16px",
                    backgroundColor: "#0077cc",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                Открыть вакансию на HH.ru
            </button>
        </div>
    );
};

export default JobDetails;