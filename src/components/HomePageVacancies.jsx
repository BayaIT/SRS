import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageVacancies = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Пагинация
    const [images, setImages] = useState([]); // Состояние для картинок
    const navigate = useNavigate();

    // Запрос вакансий
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

    // Запрос изображений с Unsplash
    const fetchImages = async () => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=programming&client_id=vyGV-cW8GPANcXScw38S_0l1o1frMoAjkKuhLMN5MDA`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setImages(data.results);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs(page); // Запрос вакансий при изменении страницы
        fetchImages(); // Запрос изображений с Unsplash
    }, [page]);

    const loadMoreJobs = () => {
        setPage((prevPage) => prevPage + 1); // Переход к следующей странице
    };

    if (error) return <p className="text-black">Ошибка: {error}</p>;

    return (
        <div className="container">
            <h2 className="text-center my-4 text-black">Вакансии для вас</h2>
            <div className="d-flex flex-column align-items-center">
                {jobs.map((job, index) => (
                    <div
                        key={job.id}
                        className="mb-4"
                        onClick={() => navigate(`/job/${job.id}`, { state: { job } })}
                    >
                        <div className="card shadow-sm border-2 border-dark min-w-[780px] max-w-[780px]">
                            <div className="d-flex">
                                <img
                                    src={images[index]?.urls?.regular || "https://via.placeholder.com/250x250"}
                                    alt="card-image"
                                    className="card-img-left"
                                    style={{
                                        width: "250px",
                                        height: "250px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <div className="card-body" style={{ paddingLeft: "16px" }}>
                                    <h5 className="card-title">{job.name}</h5>
                                    <p className="card-text">
                                        <strong>Компания:</strong> {job.employer.name}
                                    </p>
                                    <p className="card-text">
                                        <strong>Город:</strong> {job.area.name}
                                    </p>
                                    <p className="card-text">
                                        <strong>Зарплата:</strong>{" "}
                                        {job.salary
                                            ? `${job.salary.from || "Не указана"} - ${job.salary.to || "Не указана"}`
                                            : "Не указана"}
                                    </p>
                                    <button className="btn btn-primary">Подробнее</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading ? (
                <p className="text-center mt-4">Загрузка...</p>
            ) : (
                <div className="text-center mt-4">
                    <button
                        onClick={loadMoreJobs}
                        className="btn btn-secondary"
                    >
                        Показать еще
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePageVacancies;