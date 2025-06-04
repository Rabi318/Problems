import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TrackerForm from "./components/TrackerForm";
import JournalList from "./components/JournaList";
import InsightEngine from "./components/InsightEngine";
import MentorDashboard from "./components/MentorDashboard";
import PDFDownload from "./components/PDFDownload";
import { useRef } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const journalRef = useRef();

  const handleNewEntry = (entry) => {
    const newEntry = { ...entry, date: new Date().toLocaleDateString() };
    setLogs([...logs, newEntry]);
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>MindTrack 🧠📘</h1>
        <TrackerForm onSubmit={handleNewEntry} />

        {/* PDF Download Button */}
        <PDFDownload targetRef={journalRef} logs={logs} />

        {/* Journal section wrapped in a ref */}
        <div ref={journalRef}>
          <JournalList logs={logs} />
          <InsightEngine logs={logs} />
        </div>

        {/* Mentor section is excluded from PDF */}
        <MentorDashboard studentLogs={logs} />
      </div>
    </>
  );
}

export default App;
