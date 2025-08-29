import { useEffect, useState } from "react";
import axios from "axios";
import type { Event } from "../../types";
import EventCard from "../components/EventCard";

const BookmarkedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/events?bookmarked=true")
      .then((res) => setEvents(res.data));
  }, []);
  const toggleBookmark = async (id: number, bookmarked: boolean) => {
    await axios.patch(`http://localhost:5000/events/${id}`, { bookmarked });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bookmarked Events</h1>
      {events.length === 0 && <p>No bookmarks yet.</p>}
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

export default BookmarkedEvents;
