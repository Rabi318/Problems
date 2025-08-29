import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import type { Event } from "../../types";

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => setEvents(res.data));
  }, []);

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? e.category === category : true)
  );
  const toggleBookmark = async (id: number, bookmarked: boolean) => {
    await axios.patch(`http://localhost:5000/events/${id}`, { bookmarked });
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, bookmarked } : e))
    );
  };

  const categories = [...new Set(events.map((e) => e.category))];

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {filtered.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

export default EventsList;
