'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Dashboard from '../Dashboard';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (!token) {
        // Redirect to login if no token is found
        router.push('/login');
      }
    }
  }, [router]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}