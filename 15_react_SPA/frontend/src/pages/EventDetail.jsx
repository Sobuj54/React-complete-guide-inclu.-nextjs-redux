import { redirect, useRouteLoaderData } from "react-router";
import EventItem from "../components/EventItem";

function EventDetail() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export default EventDetail;

export async function eventDetailsLoader({ params }) {
  const res = await fetch(`http://localhost:8080/events/${params.eventId}`);

  if (!res.ok) {
    throw Response.json(
      { message: "Could not fetch details for selected event." },
      { status: 500 },
    );
  } else {
    return res;
  }
}

export async function deleteEventAction({ params, request }) {
  const res = await fetch(`http://localhost:8080/events/${params.eventId}`, {
    method: request.method,
  });
  if (!res.ok) {
    throw Response.json(
      { message: "Could not delete event." },
      { status: 500 },
    );
  }

  return redirect("/events");
}
