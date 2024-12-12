import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx"; // Импорт Navbar
import HomePage from "./components/HomePage";
import JobList from "./components/JobList";
import ProjectJobs from "./components/ProjectJobs.jsx";
import JobDetails from "./components/JobDetails.jsx";
import SearchJobs from "./components/SearchJobs.jsx";
import SearchResultsPage from "./components/SearchResultPage.jsx";
import CompanyDetails from "./components/CompanyDetails.jsx";


function App() {
    return (


        <Router>
            <Navbar /> {/* Используем Navbar */}
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/jobs" element={<JobList />} />
                </Routes>

                <SearchJobs>
                    <SearchJobs />
                </SearchJobs>

                <Routes>
                        <Route path="/search-results" element={<SearchResultsPage />} />
                        <Route path="/" element={<ProjectJobs />} />
                        <Route path="/job/:id" element={<JobDetails />} />
                        <Route path="/company/:id" element={<CompanyDetails />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;