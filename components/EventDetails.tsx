import React from "react";
import BookEvent from "./BookEvent";
import { IEvent } from "@/database/event.model";
import Image from "next/image";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { notFound } from "next/navigation";
import EventCard from "./EventCard";
const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex flex-row gap-2 items-center mt-2">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p className="text-sm">{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda mt-4">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex fles-row gap-1.5">
      {tags.map((tag) => (
        <p key={tag} className="pill">
          {tag}
        </p>
      ))}
    </div>
  );
};

const EventDetails = async ({ slug }: { slug: string }) => {
  const bookings = 10;
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  const request = await fetch(`${Base_Url}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      venue,
      location,
      date,
      time,
      mode,
      overview,
      audience,
      agenda,
      organizer,
      tags,
      id,
    },
  } = await request.json();
  if (
    !description ||
    !image ||
    !venue ||
    !location ||
    !date ||
    !time ||
    !mode ||
    !overview ||
    !audience ||
    !agenda ||
    !organizer ||
    !tags
  )
    return notFound();
  return (
    <section>
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details flex flex-row gap-12 items-start mt-12 max-lg:items-center max-sm:flex-col">
        {/* left side */}
        <div className="content flex-1 w-full p-4">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>
        {/* right side */}
        <aside className="booking w-1/3 p-4 border-l border-gray-700 max-sm:w-full max-sm:border-l-0 max-sm:border-t max-sm:pt-6">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <BookEvent eventId={id} slug={slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
