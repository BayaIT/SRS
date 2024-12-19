import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx"; // Импорт Navbar
// import Sidebar from "./components/Sidebar.jsx"; // Импорт Sidebar
import HomePageVacancies from "./components/HomePageVacancies.jsx";
import JobDetails from "./components/JobDetails.jsx";
import SearchResultsPage from "./components/SearchResultPage.jsx";
import CompanyDetails from "./components/CompanyDetails.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import SavedVacancies from "./components/SavedVacancies.jsx"; // Импорт страницы сохранённых вакансий
import EventPage from "./components/EventPage.jsx"; // Импорт страницы создания мероприятия
import EventsPage from "./components/EventsPage.jsx"; // Импорт страницы всех мероприятий
import 'bootstrap/dist/css/bootstrap.min.css';
import EventDetailsPage from "./components/EventsDetailsPage.jsx";
import EditEventPage from "./components/EditEventPage.jsx";

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
                    <Route path="/vacancies" element={<SavedVacancies />} />
                    <Route path="/event" element={<EventPage />} /> {/* Маршрут для страницы создания мероприятия */}
                    <Route path="/events" element={<EventsPage />} /> {/* Маршрут для страницы всех мероприятий */}
                    <Route path="/event-details" element={<EventDetailsPage />} />
                    <Route path="/edit-event/:id" element={<EditEventPage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;