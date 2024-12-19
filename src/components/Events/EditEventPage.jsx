import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditEventPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    const [formData, setFormData] = useState({
        name: event?.name || "",
        description: event?.description || "",
        date: event?.date || "",
        organizer: event?.organizer || "",
        location: event?.location || "",
        isOnline: event?.isOnline || false,
        isRegistrationOpen: event?.isRegistrationOpen || false,
        photo: event?.photo || "", // Добавляем фото
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const photoURL = URL.createObjectURL(file); // Создаем URL для предпросмотра
            setFormData({ ...formData, photo: photoURL });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = events.map((ev) =>
            ev.id === event.id ? { ...ev, ...formData } : ev // Обновляем только событие с соответствующим ID
        );
        localStorage.setItem("events", JSON.stringify(updatedEvents)); // Сохраняем изменения
        alert("Изменения сохранены!");
        navigate("/events");
    };

    if (!event) {
        return <p className="text-center my-4">Данные мероприятия отсутствуют.</p>;
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">Редактировать мероприятие</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Название</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Описание</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Дата и время</label>
                    <input
                        type="datetime-local"
                        name="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Организатор</label>
                    <input
                        type="text"
                        name="organizer"
                        className="form-control"
                        value={formData.organizer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Локация</label>
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        name="isOnline"
                        className="form-check-input"
                        checked={formData.isOnline}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Онлайн</label>
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        name="isRegistrationOpen"
                        className="form-check-input"
                        checked={formData.isRegistrationOpen}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Регистрация открыта</label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Фото мероприятия</label>
                    <input
                        type="file"
                        name="photo"
                        className="form-control"
                        onChange={handlePhotoChange}
                        accept="image/*"
                    />
                    {formData.photo && (
                        <img
                            src={formData.photo}
                            alt="Preview"
                            className="mt-3"
                            style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "cover" }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-success">Сохранить изменения</button>
                <button
                    type="button"
                    className="btn btn-secondary ms-3"
                    onClick={() => navigate(-1)}
                >
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default EditEventPage;