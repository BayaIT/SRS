import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa"; // Импортируем иконки

const EventDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    // Получаем текущую роль пользователя из localStorage
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || "viewer");

    // Функция для изменения роли
    const toggleRole = () => {
        const newRole = userRole === "creator" ? "viewer" : "creator";
        setUserRole(newRole);
        localStorage.setItem("role", newRole); // Сохраняем новую роль в localStorage
    };

    // Функция для удаления мероприятия
    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить это мероприятие?")) {
            const events = JSON.parse(localStorage.getItem("events")) || [];
            const updatedEvents = events.filter((ev) => ev.id !== event.id); // Удаляем событие по ID
            localStorage.setItem("events", JSON.stringify(updatedEvents)); // Сохраняем обновленный список
            alert("Мероприятие удалено.");
            navigate("/events"); // Возвращаемся на главную страницу после удаления
        }
    };

    // Функция для редактирования мероприятия
    const handleEdit = () => {
        if (userRole === "creator") {
            navigate(`/edit-event/${event.id}`, { state: { event } });
        } else {
            alert("У вас нет прав для редактирования этого мероприятия.");
        }
    };

    if (!event) {
        return <p className="text-center my-4">Данные мероприятия отсутствуют.</p>;
    }

    return (
        <div className="container my-5">
            {/* Кнопка для переключения роли */}
            <button
                onClick={toggleRole}
                className="btn btn-warning position-fixed"
                style={{ bottom: "10px", right: "10px", fontWeight: "600" }}
            >
                Переключить роль ({userRole === "creator" ? "Зритель" : "Редактор"})
            </button>

            <h2 className="mb-4" style={{ textAlign: "left" }}>
                {event.name}
            </h2>
            <div className="card shadow" style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}>
                {event.photo && (
                    <img
                        src={event.photo}
                        className="card-img-top"
                        alt="Event"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                )}
                <div className="card-body" style={{ textAlign: "left" }}>
                    <p><strong>Описание:</strong> {event.description}</p>
                    <p><strong>Дата и время:</strong> {new Date(event.date).toLocaleString()}</p>
                    <p><strong>Организатор:</strong> {event.organizer}</p>
                    <p><strong>Локация:</strong> {event.location}</p>
                    <p><strong>Онлайн:</strong> {event.isOnline ? "Да" : "Нет"}</p>
                    <p><strong>Регистрация:</strong> {event.isRegistrationOpen ? "Открыта" : "Закрыта"}</p>
                </div>
            </div>

            {/* Кнопки "Назад" и "Перейти к регистрации" параллельно */}
            <div className="d-flex justify-content-between mt-4" style={{ textAlign: "left" }}>
                <button
                    className="btn btn-dark"
                    onClick={() => navigate("/events")}
                    style={{ fontWeight: "600" }}
                >
                    Назад
                </button>

                {event.registrationLink && (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-success" style={{ fontWeight: "600" }}>
                            Регистрация
                        </button>
                    </a>
                )}
            </div>

            <div className="d-flex justify-content-between mt-4" style={{ textAlign: "left" }}>
                {/* Если роль создателя, показываем кнопку редактирования и удаления с иконками */}
                {userRole === "creator" && (
                    <>
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                            style={{ fontWeight: "600" }}
                        >
                            <FaTrash /> Удалить
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleEdit}
                            style={{ fontWeight: "600" }}
                        >
                            <FaPencilAlt /> Редактировать
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventDetailsPage;