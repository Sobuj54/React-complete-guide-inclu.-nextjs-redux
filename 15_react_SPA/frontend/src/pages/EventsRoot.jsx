import { Outlet } from "react-router";
import EventsNavigation from "../components/EventsNavigation";

function EventsRoot() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default EventsRoot;
