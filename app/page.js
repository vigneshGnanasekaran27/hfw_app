'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

const modules = [
  { name: "Events", key: "events", description: "Manage and view events." },
  { name: "Kitchen", key: "kitchen", description: "Access kitchen features." },
  { name: "Shop", key: "shop", description: "Shop for products." },
  { name: "Training", key: "training", description: "Access training resources." },
];

export default function Home() {
  const router = useRouter();

  const handleModuleClick = async (modKey) => {
    const session = await getSession();
    const dashboardUrl = `/dashboard?module=${modKey}`;
    if (session) {
      router.push(dashboardUrl);
    } else {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(dashboardUrl)}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to HFW App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {modules.map(mod => (
          <button
            key={mod.key}
            onClick={() => handleModuleClick(mod.key)}
            className="block w-full text-left p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200 focus:outline-none"
          >
            <h2 className="text-xl font-semibold mb-2">{mod.name}</h2>
            <p className="text-gray-600">{mod.description}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
