import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const ResumeForm = ({ onSave, step }) => {
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        city: "",
        birthday: "",
        phoneNumber: "",
        experience: [{ position: "", company: "", years: "" }],
        education: "",
        skills: "",
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
            experience: [...formData.experience, { position: "", company: "", years: "" }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <>
                    <h4 className="text-secondary mb-3">Основная информация</h4>
                    <div className="mb-3">
                        <label className="form-label">Фамилия:</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Введите фамилию"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Имя:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Введите имя"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Город:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Ваш город проживания"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Дата рождения:</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h4 className="text-secondary mb-3">Опыт работы</h4>
                    {formData.experience.map((job, index) => (
                        <div key={index} className="mb-3 p-3 border rounded bg-light">
                            <label className="form-label">Должность:</label>
                            <input
                                type="text"
                                name="position"
                                data-index={index}
                                value={job.position}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Введите должность"
                                required
                            />
                            <label className="form-label">Компания:</label>
                            <input
                                type="text"
                                name="company"
                                data-index={index}
                                value={job.company}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Введите компанию"
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddExperience}>
                        Добавить опыт
                    </button>
                </>
            )}

            {step === 3 && (
                <>
                    <h4 className="text-secondary mb-3">Образование и навыки</h4>
                    <div className="mb-3">
                        <label className="form-label">Образование:</label>
                        <input
                            type="text"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Введите ваше образование"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Навыки:</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Перечислите ваши навыки"
                            required
                        />
                    </div>
                </>
            )}
            <button type="submit" className="btn btn-primary w-100 mt-3">
                {step < 3 ? "Сохранить и продолжить" : "Завершить"}
            </button>
        </form>
    );
};

export default ResumeForm;
