// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../ResumeForm.css";

// eslint-disable-next-line react/prop-types
const ResumeForm = ({ onSave, step }) => {
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        city: "",
        birthday: "",
        phoneNumber: "",
        experience: [{ position: "", company: "", years: "" }],
        education: "", // Добавлено поле для образования
        skills: "", // Добавлено поле для навыков
    });

    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        if (dataset.index !== undefined) {
            const newExperience = [...formData.experience];
            newExperience[dataset.index][name] = value;
            setFormData({ ...formData, experience: newExperience });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { position: "", company: "", years: "" }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Сохраняем текущий шаг
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <>
                    <label>Фамилия:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Город или регион, где живёте:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <label>Дата рождения:</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                    <label>Номер телефона:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="+996"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            {step === 2 && (
                <>
                    <h4>Опыт работы:</h4>
                    {formData.experience.map((job, index) => (
                        <div key={index}>
                            <label>Должность:</label>
                            <input
                                type="text"
                                name="position"
                                value={job.position}
                                onChange={handleChange}
                                data-index={index}
                                required
                            />
                            <label>Компания:</label>
                            <input
                                type="text"
                                name="company"
                                value={job.company}
                                onChange={handleChange}
                                data-index={index}
                                required
                            />
                            <label>Годы работы:</label>
                            <input
                                type="text"
                                name="years"
                                value={job.years}
                                onChange={handleChange}
                                data-index={index}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddExperience}>
                        Добавить опыт
                    </button>
                </>
            )}

            {step === 3 && (
                <>
                    <label>Образование:</label>
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        required
                    />
                    <label>Навыки:</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            <button type="submit">
                {step < 3 ? "Сохранить и продолжить" : "Завершить"}
            </button>
        </form>
    );
};

export default ResumeForm;
