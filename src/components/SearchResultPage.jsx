// SearchResultsPage.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResultsPage = () => {
    const location = useLocation();
    const query = location.state?.query; // Получаем запрос из состояния
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            if (!query) return; // Если нет запроса, не делаем поиск

            setLoading(true);
            setError(null); // Сброс ошибок
            try {
                const response = await fetch(
                    `https://api.hh.ru/vacancies?text=${query}&area=48&per_page=50`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Ошибка запроса: ${response.status}`);
                }

                const data = await response.json();
                setJobs(data.items); // Обновляем список вакансий
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [query]);

    return (
        <div style={{ padding: "16px", color: "black", marginTop: "60px" }}>
            <h2>Результаты поиска: "{query}"</h2>

            {/* Выводим состояние загрузки или ошибки */}
            {loading && <p>Загрузка вакансий...</p>}
            {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

            {/* Список вакансий */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center", // Горизонтальное центрирование
                alignItems: "center",
            }}>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            style={{
                                border: "2px solid black",
                                borderRadius: "8px",
                                padding: "16px",
                                maxWidth: "300px",
                                minWidth: "300px",
                                cursor: "pointer",
                                background: "#f9f9f9",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                maxHeight: "180px",
                                minHeight: "180px",
                            }}
                            onClick={() => navigate(`/job/${job.id}`, { state: { job } })}
                        >
                            <h2 style={{ fontSize: "18px", margin: "0 0 8px", color: "black" }}>
                                {job.name}
                            </h2>
                            <p style={{ margin: "0 0 4px", color: "black", textAlign: "left" }}>
                                <strong>Компания:</strong> {job.employer.name}
                            </p>
                            <p style={{ margin: "0 0 4px", color: "black", textAlign: "left" }}>
                                <strong>Город:</strong> {job.area.name}
                            </p>
                            <p style={{ margin: "0", color: "black", textAlign: "left" }}>
                                <strong>Зарплата:</strong>{" "}
                                {job.salary ? `${job.salary.from || "-"} - ${job.salary.to || "-"} ${job.salary.currency || ""}` : "Не указана"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Нет вакансий по запросу</p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;