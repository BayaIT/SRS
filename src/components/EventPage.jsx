import React, { useState } from "react";

const EventPage = () => {
    // Состояние для формы
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
        organizer: "",
        location: "",
        isOnline: false,
        isRegistrationOpen: false,
        photo: "", // для хранения фото
    });

    // Функция для обработки изменений в форме
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Функция для обработки загрузки фото
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData((prevData) => ({
                    ...prevData,
                    photo: reader.result, // Сохраняем фото как URL
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Функция для сохранения мероприятия
    const handleSubmit = (e) => {
        e.preventDefault();
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const newEvent = { ...eventData, id: crypto.randomUUID() || Date.now() }; // Генерация уникального ID
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));
        alert("Мероприятие сохранено!");
        setEventData({
            name: "",
            description: "",
            date: "",
            organizer: "",
            location: "",
            isOnline: false,
            isRegistrationOpen: false,
            photo: "",
        });
    };

    return (
        <div className="container">
            <h2 className="text-center my-4 text-black">Создание мероприятия</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-50">
                    <label htmlFor="name" className="form-label">Название мероприятия</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={eventData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="description" className="form-label">Описание</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="date" className="form-label">Дата и время</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="organizer" className="form-label">Организатор</label>
                    <input
                        type="text"
                        className="form-control"
                        id="organizer"
                        name="organizer"
                        value={eventData.organizer}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="location" className="form-label">Локация/Онлайн</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3 w-50 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isOnline"
                        name="isOnline"
                        checked={eventData.isOnline}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isOnline">
                        Онлайн мероприятие
                    </label>
                </div>

                <div className="mb-3 w-50 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isRegistrationOpen"
                        name="isRegistrationOpen"
                        checked={eventData.isRegistrationOpen}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isRegistrationOpen">
                        Открыта регистрация
                    </label>
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="photo" className="form-label">Фото мероприятия</label>
                    <input
                        type="file"
                        className="form-control"
                        id="photo"
                        name="photo"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-dark w-50">
                    Создать мероприятие
                </button>
            </form>
        </div>
    );
};

export default EventPage;