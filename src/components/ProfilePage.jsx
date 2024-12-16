// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ResumeForm from "./ResumeForm"; // Форма для резюме
import "../ProfilePage.css"

const ProfilePage = () => {
    const [resume, setResume] = useState(null);

    // Получаем резюме из localStorage, если оно есть
    useEffect(() => {
        const savedResume = JSON.parse(localStorage.getItem("resume"));
        if (savedResume) {
            setResume(savedResume);
        }
    }, []);

    // Функция для сохранения резюме
    const saveResume = (newResume) => {
        setResume(newResume);
        localStorage.setItem("resume", JSON.stringify(newResume)); // Сохраняем в localStorage
    };

    return (
        <div className="profile-container">
            <h2>Мой профиль</h2>
            {resume ? (
                <div>
                    <h3>Ваше резюме:</h3>
                    <p><strong>Имя:</strong> {resume.name}</p>
                    <p><strong>Должность:</strong> {resume.position}</p>
                    <p><strong>Обо мне:</strong> {resume.about}</p>
                    <button onClick={() => setResume(null)}>Редактировать резюме</button> {/* Кнопка для редактирования */}
                </div>
            ) : (
                <div>
                    <h3>Создайте резюме</h3>
                    <ResumeForm onSave={saveResume} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;