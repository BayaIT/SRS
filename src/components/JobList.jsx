import React from "react";

function JobList() {
    const jobs = [
        { id: 1, title: "Frontend Developer", company: "Tech Co", location: "Bishkek" },
        { id: 2, title: "Backend Developer", company: "Code Studio", location: "Osh" },
        { id: 3, title: "Project Manager", company: "Innovative Solutions", location: "Almaty" },
    ];

    return (
        <div>
            <h2>Available Jobs</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>
                            {job.company} - {job.location}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobList;