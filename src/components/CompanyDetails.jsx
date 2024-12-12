import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CompanyDetails.css"; // Подключаем стили

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("about"); // Управление вкладками

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
                        className={`tab-button ${activeTab === "info" ? "active" : ""}`}
                        onClick={() => setActiveTab("info")}
                    >
                        Информация
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
                    {activeTab === "info" && (
                        <p className="company-description">
                            Компания находится в {company.areas?.[0]?.name || "неизвестной локации"}.
                            {company.open_vacancies
                                ? ` На данный момент открыто ${company.open_vacancies} вакансий.`
                                : " Текущие вакансии не указаны."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;