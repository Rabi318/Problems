import { Link } from "react-router-dom";
import type { Event } from "../../types";

interface Props {
  event: Event;
  toggleBookmark?: (id: number, bookmarked: boolean) => void;
  showBookmark?: boolean;
}

const EventCard = ({ event, toggleBookmark, showBookmark = true }: Props) => {
  return (
    <div className="border p-4 rounded shadow mb-4 flex flex-col">
      <Link to={`/events/${event.id}`}>
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p>
          {event.date}-{event.location}
        </p>
        <p className="italic text-sm text-gray-500">{event.category}</p>
        <p>{event.description}</p>
      </Link>
      {showBookmark && toggleBookmark && (
        <button
          onClick={() => toggleBookmark(event.id, !event.bookmarked)}
          className="mt-2 text-sm text-blue-500 underline self-start"
        >
          {event.bookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>
      )}
    </div>
  );
};

export default EventCard;
