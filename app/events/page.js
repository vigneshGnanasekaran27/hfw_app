"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import EventsPage from "@/components/EventsPage";

export default function EventsPageWithRedirect(props) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && pathname.startsWith("/events")) {
      router.replace(`/dashboard${pathname}`);
    }
  }, [status, pathname, router]);

  return <EventsPage {...props} />;
} 