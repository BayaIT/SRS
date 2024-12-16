// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../ResumeForm.css"

const ResumeForm = ({ onSave }) => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [about, setAbout] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const resumeData = {
            name,
            position,
            about,
        };

        onSave(resumeData); // Отправляем данные наверх для сохранения
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Должность:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Обо мне:</label>
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Сохранить резюме</button>
        </form>
    );
};

export default ResumeForm;