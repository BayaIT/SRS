// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../HomePage.css";

const HomePageVacancies = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Пагинация
    const navigate = useNavigate();

    const fetchJobs = async (currentPage) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.hh.ru/vacancies?text=Программирование&area=48&per_page=20&page=${currentPage}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setJobs((prevJobs) => {
                const newJobs = data.items.filter(
                    (job) => !prevJobs.some((prevJob) => prevJob.id === job.id)
                );
                return [...prevJobs, ...newJobs];
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(page); // Запрос при изменении страницы
    }, [page]);

    const loadMoreJobs = () => {
        setPage((prevPage) => prevPage + 1); // Переход к следующей странице
    };

    if (error) return <p style={{ color: "black" }}>Ошибка: {error}</p>;

    return (
        <div>
            <h2 style={{ padding: "16px", color: "black", marginTop: "60px" }}>Вакансии для вас</h2>
            <div
                className="jobs-container"
                style={{
                    display: "flex",
                    flexDirection: "column", // Вакансии в одну колонку
                    gap: "16px",
                    alignItems: "center",
                }}
            >
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        style={{
                            border: "0.5px solid black",
                            borderRadius: "8px",
                            padding: "16px",
                            maxWidth: "600px",
                            width: "100%",
                            cursor: "pointer",
                            background: "#f9f9f9",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s, box-shadow 0.2s",
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
                            {job.salary
                                ? `${job.salary.from || "Не указана"} - ${job.salary.to || "Не указана"}`
                                : "Не указана"}
                        </p>
                    </div>
                ))}
            </div>
            {loading ? (
                <p style={{ marginTop: "20px", color: "black" }}>Загрузка...</p>
            ) : (
                <button onClick={loadMoreJobs} style={{ marginTop: "20px" }}>
                    Показать еще
                </button>
            )}
        </div>
    );
};

export default HomePageVacancies;