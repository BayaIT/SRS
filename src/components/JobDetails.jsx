// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Функция для удаления HTML-тегов из строки
const removeHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, ""); // Убирает все HTML теги
};

const JobDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(location.state?.job || null); // Берем из state или загружаем
    const [loading, setLoading] = useState(!job); // Загружаем, если job нет в state

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

    if (loading) {
        return (
            <p style={{ color: "black", fontSize: "18px", textAlign: "center" }}>
                Загрузка данных...
            </p>
        );
    }

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
        Требования: removeHtmlTags(job.snippet?.requirement || "Не указаны"),
        Обязанности: removeHtmlTags(job.snippet?.responsibility || "Не указаны"),
    };

    // Блок вакансии
    const jobInfoBlock = (
        <div
            style={{
                padding: "16px",
                maxWidth: "1200px",
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

    // Блок с информацией о компании
    const companyInfoBlock = (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: "380px",
                maxWidth: "800px",
                padding: "16px",
                border: "1px solid #0077cc",
                borderRadius: "8px",
                backgroundColor: "#e9f7fd",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "32px",
            }}
        >
            {/* Логотип компании */}
            {job.employer.logo_urls?.original && (
                <div style={{ marginRight: "16px" }}>
                    <img
                        src={job.employer.logo_urls.original}
                        alt={`Логотип компании ${job.employer.name}`}
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "8px",
                            objectFit: "contain",
                        }}
                    />
                </div>
            )}

            {/* Информация о компании */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Название компании */}
                <p style={{ color: "black", marginBottom: "16px", fontSize: "20px" }}>
                    <strong>Название:</strong> {job.employer.name}
                </p>

                {/* Кнопка перехода на страницу компании */}
                <button
                    onClick={() => navigate(`/company/${job.employer.id}`)}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#0077cc",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Подробнее о компании
                </button>
            </div>
        </div>
    );

    return (
        <div>
            {companyInfoBlock}
            {jobInfoBlock}
        </div>
    );
};

export default JobDetails;