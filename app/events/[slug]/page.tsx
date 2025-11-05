const Base_Url = process.env.NEXT_PUBLIC_BASE_URL;
import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";
import EventDetails from "@/components/EventDetails";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  "use cache";
  cacheLife("seconds");
  const { slug } = await params;
  return (
    <div>
      <EventDetails slug={slug} />
    </div>
  );
};

export default EventDetailsPage;
