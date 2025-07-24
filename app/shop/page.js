"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ShopPage from "@/components/ShopPage";

export default function ShopPageWithRedirect(props) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && pathname.startsWith("/shop")) {
      router.replace(`/dashboard${pathname}`);
    }
  }, [status, pathname, router]);

  return <ShopPage {...props} />;
} 