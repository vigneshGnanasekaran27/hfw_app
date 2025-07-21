'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function EventsPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Triggers NextAuth sign-in (Email/Google)
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null; // signIn will redirect
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Events</h1>
      <p className="text-gray-700">You are signed in as {session.user?.email || session.user?.name}.</p>
    </div>
  );
} 