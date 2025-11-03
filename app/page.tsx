import Explorebtn from "@/components/Explorebtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";

const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
const  page =  async () => {
  "use cache";
  cacheLife("seconds")
  const response = await fetch(`${Base_Url}/api/events`)
  const {events} = await response.json()
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackthons, Meetups, And Conferences In One Place
      </p>

      <Explorebtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event : IEvent) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
