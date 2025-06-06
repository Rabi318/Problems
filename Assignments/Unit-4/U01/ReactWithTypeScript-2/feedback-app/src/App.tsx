import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackSummary from "./components/FeedbackSummary";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/summary" element={<FeedbackSummary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
