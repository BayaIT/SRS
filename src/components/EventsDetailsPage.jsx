import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const EventDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    // Функция для удаления мероприятия
    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить это мероприятие?")) {
            const events = JSON.parse(localStorage.getItem("events")) || [];
            const updatedEvents = events.filter((ev) => ev.id !== event.id); // Удаляем только мероприятие с соответствующим ID
            localStorage.setItem("events", JSON.stringify(updatedEvents));
            alert("Мероприятие удалено.");
            navigate("/"); // Возвращаемся на главную страницу после удаления
        }
    };

    // Функция для редактирования мероприятия
    const handleEdit = () => {
        navigate(`/edit-event/${event.id}`, { state: { event } });
    };

    if (!event) {
        return <p className="text-center my-4">Данные мероприятия отсутствуют.</p>;
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">{event.name}</h2>
            <div className="card shadow">
                {event.photo && (
                    <img
                        src={event.photo}
                        className="card-img-top"
                        alt="Event"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                )}
                <div className="card-body">
                    <p><strong>Описание:</strong> {event.description}</p>
                    <p><strong>Дата и время:</strong> {new Date(event.date).toLocaleString()}</p>
                    <p><strong>Организатор:</strong> {event.organizer}</p>
                    <p><strong>Локация:</strong> {event.location}</p>
                    <p><strong>Онлайн:</strong> {event.isOnline ? "Да" : "Нет"}</p>
                    <p><strong>Регистрация:</strong> {event.isRegistrationOpen ? "Открыта" : "Закрыта"}</p>
                </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-danger" onClick={handleDelete}>Удалить мероприятие</button>
                <button className="btn btn-primary" onClick={handleEdit}>Редактировать мероприятие</button>
            </div>
            <Link to="/events" className="btn btn-dark mt-4">Назад к списку мероприятий</Link>
        </div>
    );
};

export default EventDetailsPage;