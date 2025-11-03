"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { success, error } = await createBooking({ eventId, slug, email });
    if (success) {
      setSubmitted(true);
    } else {
      console.log("Booking failed:", error);
    }
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-2" id="book-event">
      {submitted ? (
        <p className="text-green-500">Event booked successfully</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit">Book Event</button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
