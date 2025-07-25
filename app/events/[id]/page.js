"use client";
import React from "react";
import { useParams } from "next/navigation";
import EventDetailPage from "@/components/EventDetailPage";

export default function EventDetailWrapper() {
  const params = useParams();
  const eventId = parseInt(params.id, 10);
  return <EventDetailPage eventId={eventId} />;
} 