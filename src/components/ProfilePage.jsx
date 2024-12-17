// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ResumeForm from "./ResumeForm"; // Форма для резюме
import "../ProfilePage.css";

const ProfilePage = () => {
    const [resume, setResume] = useState(null);
    const [step, setStep] = useState(1); // Шаг формы

    // Получаем резюме из localStorage, если оно есть
    useEffect(() => {
        const savedResume = JSON.parse(localStorage.getItem("resume"));
        if (savedResume) {
            setResume(savedResume);
        }
    }, []);

    // Функция для сохранения резюме и перехода на следующий шаг
    const saveResume = (newResume) => {
        setResume({ ...resume, ...newResume });
        localStorage.setItem("resume", JSON.stringify({ ...resume, ...newResume })); // Сохраняем в localStorage
        setStep((prevStep) => prevStep + 1); // Переходим на следующий шаг
    };

    return (
        <div className="profile-container">
            <h2>Мой профиль</h2>
            {resume && step > 3 ? ( // Если все этапы завершены, показываем итог
                <div>
                    <h3>Ваше резюме:</h3>
                    <p><strong>Фамилия:</strong> {resume.surname}</p>
                    <p><strong>Имя:</strong> {resume.name}</p>
                    <p><strong>Город:</strong> {resume.city}</p>
                    <p><strong>Дата рождения:</strong> {resume.birthday}</p>
                    <p><strong>Номер телефона:</strong> {resume.phoneNumber}</p>
                    <h4>Опыт работы:</h4>
                    {resume.experience && resume.experience.map((job, index) => (
                        <div key={index}>
                            <p><strong>Должность:</strong> {job.position}</p>
                            <p><strong>Компания:</strong> {job.company}</p>
                            <p><strong>Годы работы:</strong> {job.years}</p>
                        </div>
                    ))}
                    <h4>Образование:</h4>
                    <p>{resume.education}</p>
                    <h4>Навыки:</h4>
                    <p>{resume.skills}</p>
                    <button onClick={() => setStep(1)}>Редактировать резюме</button>
                </div>
            ) : (
                <div>
                    <h3>Заполните информацию</h3>
                    <ResumeForm onSave={saveResume} step={step} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
