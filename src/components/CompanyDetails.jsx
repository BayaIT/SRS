import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("about");
    const [vacancies, setVacancies] = useState([]);
    const [vacanciesLoading, setVacanciesLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`https://api.hh.ru/employers/${id}`);
                const data = await response.json();
                setCompany(data);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка загрузки данных о компании:", error);
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [id]);

    const fetchVacancies = async () => {
        if (vacancies.length > 0) return;
        setVacanciesLoading(true);
        try {
            const response = await fetch(`https://api.hh.ru/vacancies?employer_id=${id}`);
            const data = await response.json();
            setVacancies(data.items || []);
        } catch (error) {
            console.error("Ошибка загрузки вакансий:", error);
        } finally {
            setVacanciesLoading(false);
        }
    };

    if (loading) return <p>Загрузка данных...</p>;
    if (!company) return <p>Данные о компании не найдены!</p>;

    return (
        <div className="container my-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 mb-4">
                    <div className="card shadow-sm border-dark">
                        {company.logo_urls?.original && (
                            <img
                                src={company.logo_urls.original}
                                alt="Логотип компании"
                                className="card-img-top p-3"
                                style={{ objectFit: "contain", height: "200px" }}
                            />
                        )}
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Локация:</strong> {company.areas?.[0]?.name || "Не указано"}
                            </p>
                            <p className="card-text">
                                <strong>Активных вакансий:</strong>{" "}
                                {company.open_vacancies || "0"}
                            </p>
                            <p className="card-text">
                                <strong>Сферы деятельности:</strong>{" "}
                                {company.industries
                                    ?.map((industry) => industry.name)
                                    .join(", ") || "Не указано"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    <div className="d-flex justify-content-start mb-3">
                        {/* Кнопка "Назад" */}
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            ← Назад
                        </button>
                    </div>

                    <div className="card shadow-sm border-dark">
                        <div className="card-header bg-dark text-white">
                            <h3 className="mb-0">{company.name}</h3>
                        </div>

                        <div className="card-body">
                            <ul className="nav nav-tabs mb-3">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${
                                            activeTab === "about" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("about")}
                                    >
                                        О компании
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${
                                            activeTab === "vacancies" ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            setActiveTab("vacancies");
                                            fetchVacancies();
                                        }}
                                    >
                                        Вакансии
                                    </button>
                                </li>
                            </ul>

                            {/* Tab Content */}
                            {activeTab === "about" && (
                                <p className="text-muted">
                                    {company.description
                                        ? company.description.replace(/<\/?[^>]+(>|$)/g, "")
                                        : "Описание не указано"}
                                </p>
                            )}

                            {activeTab === "vacancies" && (
                                <div>
                                    {vacanciesLoading && (
                                        <p className="text-center">Загрузка вакансий...</p>
                                    )}
                                    {!vacanciesLoading && vacancies.length === 0 && (
                                        <p className="text-center">Вакансий не найдено.</p>
                                    )}

                                    <ul className="list-group">
                                        {vacancies.map((vacancy) => (
                                            <li
                                                key={vacancy.id}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                                onClick={() => navigate(`/job/${vacancy.id}`)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span>{vacancy.name}</span>
                                                <span className="text-muted">
                                                    Зарплата:{" "}
                                                    {vacancy.salary
                                                        ? `${vacancy.salary.from || 0} - ${
                                                            vacancy.salary.to || "Не указано"
                                                        } ${vacancy.salary.currency}`
                                                        : "Не указана"}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;