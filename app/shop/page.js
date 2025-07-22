"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ShopPage from "@/app/components/ShopPage.jsx";

function Navbar({ onSignIn }) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="text-xl font-bold text-green-700">Shop</div>
      <div>
        <button
          onClick={onSignIn}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard?module=shop");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Navbar onSignIn={() => signIn(undefined, { callbackUrl: "/dashboard?module=shop" })} />
        <div className="pt-12">
          <ShopPage />
        </div>
      </div>
    );
  }

  // If authenticated, the user will be redirected
  return null;
} 