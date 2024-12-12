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
                {job.name}
            </h1>
            <p style={{ color: "black", marginBottom: "8px" }}>
                <strong>Компания:</strong> {job.employer.name}
            </p>
            <p style={{ color: "black", marginBottom: "8px" }}>
                <strong>Город:</strong> {job.area.name}
            </p>
            <p style={{ color: "black", marginBottom: "8px" }}>
                <strong>Описание:</strong>
            </p>
            <div
                style={{ color: "black", marginBottom: "16px" }}
                dangerouslySetInnerHTML={{
                    __html: job.snippet.requirement || "Не указано",
                }}
            />
            <p style={{ color: "black", marginBottom: "16px" }}>
                <strong>Зарплата:</strong>{" "}
                {job.salary
                    ? `${job.salary.from || "-"} - ${job.salary.to || "-"}`
                    : "Не указана"}
            </p>
        </div>
    );
};

export default JobDetails;