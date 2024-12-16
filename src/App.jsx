import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx"; // Импорт Navbar
// import Sidebar from "./components/Sidebar.jsx"; // Импорт Sidebar
import HomePageVacancies from "./components/HomePageVacancies.jsx";
import JobDetails from "./components/JobDetails.jsx";
import SearchResultsPage from "./components/SearchResultPage.jsx";
import CompanyDetails from "./components/CompanyDetails.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

function App() {
    return (
        <Router>
            <Navbar /> {/* Используем Navbar */}
            <main>
                <Routes>
                    <Route path="/search-results" element={<SearchResultsPage />} />
                    <Route path="/" element={<HomePageVacancies />} />
                    <Route path="/job/:id" element={<JobDetails />} />
                    <Route path="/company/:id" element={<CompanyDetails />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
