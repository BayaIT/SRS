import React from "react";
import { Link } from "react-router-dom";
import SearchJobs from "./SearchJobs"; // Импортируем компонент поиска
import "../Navbar.css"; // Подключаем стили для Navbar

const Navbar = () => {
    return (
        <div id="navbar">
            <h4 className="logo">MyLogo</h4>
            <div className="dropdown">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/jobs">Jobs</Link>
                    </li>
                </ul>
            </div>
            {/* Добавляем компонент поиска */}
            <div className="navbar-search">
                <SearchJobs />
            </div>
        </div>
    );
};

export default Navbar;