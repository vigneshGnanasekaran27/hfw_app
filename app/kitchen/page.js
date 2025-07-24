"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import KitchenPage from "@/components/KitchenPage";

export default function KitchenPageWithRedirect(props) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && pathname.startsWith("/kitchen")) {
      router.replace(`/dashboard${pathname}`);
    }
  }, [status, pathname, router]);

  return <KitchenPage {...props} />;
} 