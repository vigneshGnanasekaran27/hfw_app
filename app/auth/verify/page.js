'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resentMsg, setResentMsg] = useState('');
  const [resending, setResending] = useState(false);

  if (!email) {
    return <div className="min-h-screen flex items-center justify-center">Invalid verification link.</div>;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    // Call NextAuth callback endpoint with OTP and email
    const res = await fetch(`/api/auth/callback/email?token=${otp}&email=${encodeURIComponent(email)}`);
    if (res.ok) {
      // Redirect to callbackUrl after successful verification
      router.push(callbackUrl);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResentMsg('');
    setError('');
    // Call signIn to resend OTP
    const res = await fetch('/api/auth/signin/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl)}`,
    });
    if (res.ok) {
      setResentMsg('OTP resent! Check your email.');
    } else {
      setError('Failed to resend OTP. Please try again.');
    }
    setResending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Enter the OTP sent to your email</h2>
      <form onSubmit={handleVerify} className="mt-4 space-y-4">
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
          className="w-full px-3 py-2 border rounded-md text-black"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Verify
        </button>
        {error && <p className="text-red-600">{error}</p>}
        {resentMsg && <p className="text-green-600">{resentMsg}</p>}
      </form>
      <button
        onClick={handleResend}
        disabled={resending}
        className="mt-4 text-blue-600 hover:underline disabled:opacity-50"
      >
        {resending ? 'Resending...' : 'Resend OTP'}
      </button>
    </div>
  );
} 