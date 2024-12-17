// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ResumeForm from "./ResumeForm";
import "../ProfilePage.css";

const ProfilePage = () => {
    const [resume, setResume] = useState(null);
    const [step, setStep] = useState(0); // 0 — отображается кнопка, 1-3 — шаги формы

    useEffect(() => {
        const savedResume = JSON.parse(localStorage.getItem("resume"));
        if (savedResume) setResume(savedResume);
    }, []);

    const saveResume = (newResume) => {
        setResume({ ...resume, ...newResume });
        localStorage.setItem("resume", JSON.stringify({ ...resume, ...newResume }));
        setStep((prev) => prev + 1);
    };

    const handleCreateResume = () => {
        setStep(1); // Переходим на первый шаг заполнения формы
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-body p-5">
                    <h2 className="text-center mb-4 text-primary">Мой профиль</h2>

                    {step === 0 && ( // Отображение кнопки "Создать резюме"
                        <div className="text-center">
                            {resume ? (
                                <div>
                                    <h4 className="text-secondary mb-4">Ваше резюме</h4>
                                    <ul className="list-group list-group-flush mb-3">
                                        <li className="list-group-item"><strong>Фамилия:</strong> {resume.surname}</li>
                                        <li className="list-group-item"><strong>Имя:</strong> {resume.name}</li>
                                        <li className="list-group-item"><strong>Город:</strong> {resume.city}</li>
                                        <li className="list-group-item"><strong>Дата рождения:</strong> {resume.birthday}</li>
                                        <li className="list-group-item"><strong>Номер телефона:</strong> {resume.phoneNumber}</li>
                                        <li className="list-group-item"><strong>Образование:</strong> {resume.education}</li>
                                        <li className="list-group-item"><strong>Навыки:</strong> {resume.skills}</li>
                                    </ul>
                                    <h4 className="text-secondary">Опыт работы:</h4>
                                    {resume.experience.map((job, index) => (
                                        <div key={index} className="border rounded p-3 mb-2 bg-light">
                                            <p><strong>Должность:</strong> {job.position}</p>
                                            <p><strong>Компания:</strong> {job.company}</p>
                                            <p><strong>Годы работы:</strong> {job.years}</p>
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-outline-primary mt-3"
                                        onClick={() => setStep(1)} // Начать редактирование резюме
                                    >
                                        <i className="bi bi-pencil"></i> Редактировать резюме
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-muted">Заполните своё резюме, чтобы показать информацию.</p>
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleCreateResume}
                                    >
                                        Создать резюме
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {step > 0 && step <= 3 && ( // Отображение формы резюме
                        <>
                            <div className="progress mb-4" style={{ height: "20px" }}>
                                <div
                                    className={`progress-bar bg-success`}
                                    role="progressbar"
                                    style={{ width: `${(step / 3) * 100}%` }}
                                    aria-valuenow={(step / 3) * 100}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    Шаг {step} из 3
                                </div>
                            </div>
                            <ResumeForm onSave={saveResume} step={step} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
