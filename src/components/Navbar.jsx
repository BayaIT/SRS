// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import SearchJobs from "./SearchJobs"; // Импортируем компонент поиска
import "../Navbar.css"; // Подключаем стили для Navbar

const Navbar = () => {
    return (
        <div id="navbar">
            <div className="navbar-search">
                <SearchJobs />
            </div>
            <div className="dropdown">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/vacancies">Vacancies</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;