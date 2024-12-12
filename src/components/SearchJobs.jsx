// SearchJobs.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchJobs = () => {
    const [query, setQuery] = useState(""); // Для хранения поискового запроса
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!query.trim()) return; // Если запрос пустой, не отправляем запрос

        // Перенаправляем на страницу с результатами поиска, передавая запрос в состояние
        navigate("/search-results", { state: { query } });
    };

    return (
        <div style={{ padding: "16px", color: "black" }}>
            <h1>Поиск вакансий</h1>

            {/* Форма поиска */}
            <div>
                <input
                    type="text"
                    placeholder="Введите ключевые слова"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ padding: "8px", fontSize: "16px", marginRight: "8px" }}
                />
                <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
                    Найти
                </button>
            </div>
        </div>
    );
};

export default SearchJobs;