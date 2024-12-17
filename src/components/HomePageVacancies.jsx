// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageVacancies = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Для пагинации
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(
                    `https://api.hh.ru/vacancies?text=Программирование&area=48&per_page=20&page=${page}`, // Фильтр по программированию
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setJobs((prevJobs) => [...prevJobs, ...data.items]); // Добавляем новые вакансии к старым
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [page]); // Когда страница меняется, перезапускаем запрос

    const loadMoreJobs = () => {
        setPage((prevPage) => prevPage + 1); // Переход к следующей странице
        setLoading(true); // Устанавливаем состояние загрузки
    };

    if (loading) return <p style={{ color: "black" }}>Загрузка вакансий...</p>;
    if (error) return <p style={{ color: "black" }}>Ошибка: {error}</p>;

    return (
        <div>
            <h2 style={{ padding: "16px",color: "black", marginTop: "60px" }}>Вакансии для вас</h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center", // Горизонтальное центрирование
                alignItems: "center",
            }}>
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        style={{
                            border: "0.5px solid black",
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
                            {job.salary
                                ? `${job.salary.from || "-"} - ${job.salary.to || "-"}`
                                : "Не указана"}
                        </p>
                    </div>
                ))}
            </div>
            <button onClick={loadMoreJobs} style={{ marginTop: "20px" }}>
                Показать еще
            </button>
        </div>
    );
};

export default HomePageVacancies;