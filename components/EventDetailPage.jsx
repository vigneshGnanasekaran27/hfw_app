"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

// Dummy data (should be replaced with real data fetching in production)
const dummyEvents = [
  {
    id: 1,
    title: "City Marathon 2024",
    description: "Join the annual city marathon and run for a cause!",
    event_type: "Run",
    level: "Beginner",
    paid: true,
    amount: 500,
    location: "City",
    image: "https://source.unsplash.com/400x300/?marathon,run",
    date: "2024-08-01",
  },
  {
    id: 2,
    title: "Mountain Trekking Adventure",
    description: "Experience the thrill of mountain trekking with experts.",
    event_type: "Trekking",
    level: "Intermediate",
    paid: false,
    amount: 0,
    location: "Mountain",
    image: "https://source.unsplash.com/400x300/?mountain,trekking",
    date: "2024-08-10",
  },
  {
    id: 3,
    title: "Beach Cycling Fest",
    description: "Cycle along the beautiful coastline and enjoy the breeze.",
    event_type: "Cycling",
    level: "Advanced",
    paid: true,
    amount: 300,
    location: "Beach",
    image: "https://source.unsplash.com/400x300/?beach,cycling",
    date: "2024-08-15",
  },
  {
    id: 4,
    title: "Forest Run",
    description: "A refreshing run through the lush green forest.",
    event_type: "Run",
    level: "Beginner",
    paid: false,
    amount: 0,
    location: "Forest",
    image: "https://source.unsplash.com/400x300/?forest,run",
    date: "2024-08-20",
  },
  {
    id: 5,
    title: "Surfing Challenge",
    description: "Show your surfing skills and win exciting prizes!",
    event_type: "Surfing",
    level: "Advanced",
    paid: true,
    amount: 700,
    location: "Beach",
    image: "https://source.unsplash.com/400x300/?surfing,beach",
    date: "2024-08-25",
  },
];


 

export default function EventDetailPage({ eventId }) {
  const { data: session, status } = useSession();
  const event = dummyEvents.find((e) => e.id === eventId);
  const router = useRouter();
  const pathname = usePathname();
  const [showPayPopup, setShowPayPopup] = useState(false);


  console.log(pathname, " usePathname..")
   // Redirect logged-in users to dashboard version if not already there
   useEffect(() => {
    if (status === "authenticated" && pathname.startsWith("/events/")) {
      router.replace(`/dashboard${pathname}`);
    }
  }, [status, pathname, router]);


  if (!event) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-gray-600">The event you are looking for does not exist.</p>
      </div>
    );
  }

  // Helper: is this the dashboard context?
  const isDashboard = pathname.startsWith("/dashboard");

  // Pay button logic
  const handlePayClick = () => {
    if (!session) {
      signIn(undefined, { callbackUrl: pathname });
      return;
    }
    if (isDashboard) {
      setShowPayPopup(true);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {event.event_type}
        </span>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {event.level}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
          {event.location}
        </span>
        <span
          className={`px-2 py-1 rounded ${
            event.paid ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {event.paid ? "Paid" : "Free"}
        </span>
        {event.paid && event.amount && (
          <span className="px-2 py-1 rounded font-bold border border-orange-500 text-black text-base ">
            ₹{event.amount}
          </span>
        )}
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {event.date}
        </span>
      </div>
      <p className="text-lg text-gray-700 mb-6">{event.description}</p>

      {/* Pay button or sign-in prompt for paid events */}
      {event.paid && (
        <div className="mt-6">
          {status === "authenticated" && session ? (
            <button
              onClick={handlePayClick}
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-300"
            >
              Pay Now
            </button>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: pathname })}
              className="bg-purple-100 text-purple-700 font-bold py-3 px-8 rounded-xl border border-purple-300 hover:bg-purple-200 transition-all duration-300"
            >
              Sign in to Pay
            </button>
          )}
        </div>
      )}

      {/* Dummy pay popup for dashboard context */}
      {showPayPopup && isDashboard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Dummy Payment</h2>
            <p className="mb-6">This is a dummy payment popup for event: <span className="font-semibold">{event.title}</span></p>
            <button
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-2 px-6 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-300 mr-2"
              onClick={() => setShowPayPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    
    </div>
  );
} 