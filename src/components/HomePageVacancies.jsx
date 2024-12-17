import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageVacancies = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const fetchJobs = async (currentPage) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.hh.ru/vacancies?text=Программирование&area=48&per_page=20&page=${currentPage}`
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

    const fetchImages = async (currentPage) => {
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=programming&page=${currentPage}&per_page=20&client_id=vyGV-cW8GPANcXScw38S_0l1o1frMoAjkKuhLMN5MDA`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setImages((prevImages) => [...prevImages, ...data.results]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs(page);
        fetchImages(page);
    }, [page]);

    const loadMoreJobs = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const getSafeImage = (index, job) => {
        if (images[index]?.urls?.regular) {
            return images[index].urls.regular;
        }
        if (job.employer.logo_urls?.original) {
            return job.employer.logo_urls.original;
        }
        return "https://via.placeholder.com/250x250";
    };

    const handleJobClick = (job) => {
        navigate(`/job/${job.id}`, { state: { job } });
    };

    const handleCompanyClick = (company) => {
        navigate(`/company/${company.id}`, { state: { company } });
    };
    if (error) return <p className="text-black">Ошибка: {error}</p>;

    return (
        <div className="container">
            <h2 className="text-center my-4 text-black">Вакансии для вас</h2>
            <div className="d-flex flex-column align-items-center">
                {jobs.map((job, index) => (
                    <div key={job.id} className="mb-4">
                        <div
                            style={{
                                minWidth: "780px",
                                maxWidth: "780px",
                                padding: "6px",
                            }}
                            className="card shadow-sm border-2 border-dark"
                        >
                            <div className="d-flex">
                                <img
                                    src={getSafeImage(index, job)}
                                    alt="card-image"
                                    className="card-img-left"
                                    style={{
                                        width: "250px",
                                        height: "250px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <div className="card-body d-flex flex-column" style={{paddingLeft: "16px"}}>
                                    <h5 className="card-title">{job.name}</h5>
                                    <p className="card-text" style={{textAlign: "left"}}>
                                        <strong>Компания:</strong> {job.employer.name}
                                    </p>
                                    <p className="card-text" style={{textAlign: "left"}}>
                                        <strong>Город:</strong> {job.area.name}
                                    </p>
                                    <p className="card-text" style={{textAlign: "left"}}>
                                        <strong>Зарплата:</strong>{" "}
                                        {job.salary
                                            ? `${job.salary.from || "Не указана"} - ${job.salary.to || "Не указана"}`
                                            : "Не указана"}
                                    </p>
                                    <div className="mt-auto d-flex justify-content-end">
                                        <button
                                            onClick={() => handleCompanyClick(job.employer)}
                                            className="btn btn-outline-dark me-2"
                                            style={{padding: "6px 12px"}}
                                        >
                                            О компании
                                        </button>
                                        <button
                                            onClick={() => handleJobClick(job)}
                                            className="btn btn-dark"
                                            style={{padding: "6px 12px"}}
                                        >
                                            Подробнее
                                        </button>
                                    </div>
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
                    <button onClick={loadMoreJobs} className="btn btn-secondary">
                        Показать еще
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePageVacancies;