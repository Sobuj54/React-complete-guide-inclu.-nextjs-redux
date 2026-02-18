import { Await, useLoaderData } from "react-router";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw { message: "Could not fetch data." };
    // const data = JSON.stringify({ message: "Could not fetch events." });
    // throw new Response(data, {
    //   status: 500,
    // });

    throw Response.json(
      { message: "Could not fetch events." },
      { status: 500 },
    );
  } else {
    const data = await response.json();
    console.log(data.events);
    return data.events;
  }
}

export async function eventsLoader() {
  return {
    events: loadEvents(),
  };
}
