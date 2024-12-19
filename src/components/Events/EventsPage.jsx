import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(savedEvents);
    }, []);

    // Переход к детальной странице события
    const handleEventClick = (event) => {
        navigate("/event-details", { state: { event } }); // Передаем данные события
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center my-4 px-4">
                <h2 className="text-black">Список мероприятий</h2>
                <div className="ms-auto">
                    <Link to="/event" className="btn btn-dark">
                        Создать мероприятие
                    </Link>
                </div>
            </div>

            <div className="row mx-0">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div
                            key={event.id} // Используем ID вместо индекса
                            className="mb-4"
                            onClick={() => handleEventClick(event)}
                            style={{
                                cursor: "pointer",
                                width: "1650px", // Вернули предыдущую ширину карточки
                                height: "400px", // Вернули предыдущую высоту карточки
                                padding: "0 10px",
                            }}
                        >
                            <div
                                className="card position-relative"
                                style={{
                                    height: "100%", // Используем 100%, чтобы задать высоту равной контейнеру
                                    border: "none",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                }}
                            >
                                {/* Фон карточки */}
                                <div
                                    style={{
                                        backgroundImage: `url(${event.photo})`,
                                        backgroundSize: "contain",
                                        backgroundPosition: "center",
                                        height: "100%",
                                        width: "100%",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        zIndex: 1,
                                        filter: "brightness(0.4)",
                                    }}
                                ></div>

                                {/* Дата в левом верхнем углу */}
                                <div
                                    className="position-absolute"
                                    style={{
                                        top: "10px",
                                        left: "10px",
                                        zIndex: 2,
                                        color: "#fff",
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    {new Date(event.date).toLocaleString()}
                                </div>

                                {/* Контент внутри карточки */}
                                <div
                                    className="card-body text-white position-absolute d-flex flex-column justify-content-between"
                                    style={{
                                        zIndex: 2,
                                        padding: "20px",
                                        bottom: "10px",
                                        left: "10px",
                                        right: "10px",
                                    }}
                                >
                                    {/* Название мероприятия (перемещаем сюда) */}
                                    <h3 className="card-title mb-2">{event.name}</h3>
                                </div>

                                {/* Организатор и Локация в левом нижнем углу */}
                                <div
                                    className="position-absolute"
                                    style={{
                                        bottom: "10px",
                                        left: "10px",
                                        zIndex: 2,
                                        color: "#fff",
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <div style={{ textAlign: "left" }}>
                                        <p className="mb-0">
                                            <strong>Организатор:</strong> {event.organizer}
                                        </p>
                                        <p className="mb-0">
                                            <strong>Локация:</strong> {event.location || "Онлайн"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black w-100">Нет созданных мероприятий.</p>
                )}
            </div>
        </div>
    );
};

export default EventsPage;