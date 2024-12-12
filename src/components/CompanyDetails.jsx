import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CompanyDetails.css"; // Подключаем стили

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Для навигации
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("about"); // Управление вкладками
    const [vacancies, setVacancies] = useState([]); // Хранение вакансий
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
        if (vacancies.length > 0) return; // Не загружать повторно, если данные уже есть
        setVacanciesLoading(true);
        try {
            const response = await fetch(
                `https://api.hh.ru/vacancies?employer_id=${id}`
            );
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
        <div className="company-details-container">
            {/* Sidebar */}
            <div className="sidebar">
                {company.logo_urls?.original && (
                    <img
                        src={company.logo_urls.original}
                        alt={`Логотип ${company.name}`}
                        className="sidebar-logo"
                    />
                )}
                <p className="sidebar-info">Локация: {company.areas?.[0]?.name || "Не указано"}</p>
                <p className="sidebar-info">Активных вакансий: {company.open_vacancies || "0"}</p>
                <p className="sidebar-info">
                    Сферы деятельности:{" "}
                    {company.industries?.map((industry) => industry.name).join(", ") || "Не указано"}
                </p>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h1 className="company-title">{company.name}</h1>
                <div className="tabs-row">
                    <button
                        className={`tab-button ${activeTab === "about" ? "active" : ""}`}
                        onClick={() => setActiveTab("about")}
                    >
                        О компании
                    </button>
                    <button
                        className={`tab-button ${activeTab === "vacancies" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("vacancies");
                            fetchVacancies();
                        }}
                    >
                        Вакансии
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === "about" && (
                        <p className="company-description">
                            {company.description
                                ? company.description.replace(/<\/?[^>]+(>|$)/g, "")
                                : "Описание не указано"}
                        </p>
                    )}
                    {activeTab === "vacancies" && (
                        <div>
                            {vacanciesLoading && <p>Загрузка вакансий...</p>}
                            {vacancies.length === 0 && !vacanciesLoading && (
                                <p>Вакансий не найдено.</p>
                            )}
                            <ul className="vacancies-list">
                                {vacancies.map((vacancy) => (
                                    <li
                                        key={vacancy.id}
                                        className="vacancy-item"
                                        onClick={() => navigate(`/job/${vacancy.id}`)} // Переход к JobDetails
                                    >
                                        <span className="vacancy-title">{vacancy.name}</span>
                                        <p>
                                            Зарплата:{" "}
                                            {vacancy.salary
                                                ? `${vacancy.salary.from || 0} - ${
                                                    vacancy.salary.to || "Не указано"
                                                } ${vacancy.salary.currency}`
                                                : "Не указана"}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;