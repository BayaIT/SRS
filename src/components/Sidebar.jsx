import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const categories = [
        { name: "Веб-разработка", path: "/web-development" },
        { name: "UI/UX Дизайн", path: "/ui-ux-design" },
        { name: "Маркетинг", path: "/marketing" },
        { name: "SEO Оптимизация", path: "/seo" },
        { name: "Контент-менеджмент", path: "/content-management" },
        { name: "Аналитика", path: "/analytics" },
        { name: "Видеопродакшн", path: "/video-production" },
    ];

    return (
        <div className="sidebar">
            <h2>Категории</h2>
            <nav>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link to={category.path}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
