import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackDashboard from "./components/FeedbackDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/" className="text-blue-600 font-medium">
          Form
        </Link>
        <Link to="/dashboard" className="text-blue-600 font-medium">
          Dashboard
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<FeedbackDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
