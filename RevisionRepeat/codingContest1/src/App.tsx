import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";
import BookmarkedEvents from "./pages/BookmarkedEvents";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <Link to="/" className="font-bold">
            Event Explorer
          </Link>
          <Link to="/bookmarks">Bookmarks</Link>
        </nav>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/bookmarks" element={<BookmarkedEvents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
