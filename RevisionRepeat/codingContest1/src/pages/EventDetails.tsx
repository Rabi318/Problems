import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Event } from "../../types";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${id}`)
      .then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p className="p-4">Loading...</p>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>
        {event.date} - {event.location}
      </p>
      <p>{event.category}</p>
      <p className="mt-2">{event.description}</p>
    </div>
  );
};

export default EventDetails;
