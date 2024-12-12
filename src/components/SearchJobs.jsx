import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchJobs = () => {
    const [query, setQuery] = useState(""); // Для хранения поискового запроса
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!query.trim()) return; // Если запрос пустой, не отправляем запрос

        // Перенаправляем на страницу с результатами поиска
        navigate("/search-results", { state: { query } });
    };

    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Поиск вакансий..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
        </form>
    );
};

export default SearchJobs;