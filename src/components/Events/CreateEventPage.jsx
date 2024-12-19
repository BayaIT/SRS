import React, { useState, useEffect } from "react";

const CreateEventPage = () => {
    // Состояние для формы
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",  // Время в 24-часовом формате
        organizer: "",
        location: "",
        isOnline: false,
        isRegistrationOpen: false,
        photo: "", // для хранения фото
        registrationLink: "", // для ссылки на форму регистрации
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

        // Преобразуем время в 24-часовой формат, если нужно
        const formattedTime = formatTimeTo24Hour(eventData.time);

        const events = JSON.parse(localStorage.getItem("events")) || [];
        const newEvent = { ...eventData, time: formattedTime, id: crypto.randomUUID() }; // Генерация уникального ID
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events)); // Сохраняем события с уникальным ID
        alert("Мероприятие сохранено!");
        setEventData({
            name: "",
            description: "",
            date: "",
            time: "",
            organizer: "",
            location: "",
            isOnline: false,
            isRegistrationOpen: false,
            photo: "",
            registrationLink: "", // Очищаем поле ссылки на регистрацию
        });
    };

    // Функция для форматирования времени в 24-часовой формат
    const formatTimeTo24Hour = (time) => {
        const [hours, minutes] = time.split(":");
        let hours24 = parseInt(hours, 10);
        if (hours24 < 10) {
            hours24 = `0${hours24}`;
        }
        return `${hours24}:${minutes}`;
    };

    // Получаем завтрашнюю дату для минимальной
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    useEffect(() => {
        // Если локация указана, автоматически выключаем "онлайн"
        if (eventData.location) {
            setEventData((prevData) => ({
                ...prevData,
                isOnline: false,
            }));
        }
    }, [eventData.location]); // Запускать при изменении location

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
                    <label htmlFor="date" className="form-label">Дата</label>
                    <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        min={minDate}  // Минимальная дата - завтрашняя
                        required
                    />
                </div>

                <div className="mb-3 w-50">
                    <label htmlFor="time" className="form-label">Время</label>
                    <input
                        type="time"
                        name="time"
                        value={eventData.time}
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

                {!eventData.isOnline && (
                    <div className="mb-3 w-50">
                        <label htmlFor="location" className="form-label">Локация</label>
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
                )}

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

                <div className="mb-3 w-50">
                    <label htmlFor="registrationLink" className="form-label">Ссылка на форму регистрации</label>
                    <input
                        type="url"
                        className="form-control"
                        id="registrationLink"
                        name="registrationLink"
                        value={eventData.registrationLink}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-dark w-50">
                    Создать мероприятие
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;