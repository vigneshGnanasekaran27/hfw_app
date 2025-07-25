"use client";

import CreateEvent from "@/components/CreateEvent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (status === "loading") return;
    if (!isAdmin) {
      router.replace("/dashboard/events");
    }
  }, [isAdmin, status, router]);

  if (!isAdmin) return null;
  return <CreateEvent />;
} 