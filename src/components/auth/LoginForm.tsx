"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: 'demo@example.com',
        password: 'demo123',
        redirect: false,
      });

      if (result?.error) {
        setError('Failed to login with demo account');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Button
        type="button"
        variant="primary"
        className="w-full"
        isLoading={isLoading}
        onClick={handleDemoLogin}
      >
        Login with Demo Account
      </Button>

      <div className="text-sm text-center text-gray-600">
        <p>Click above to login with a demo account</p>
        <p>Email: demo@example.com</p>
        <p>Password: demo123</p>
      </div>
    </div>
  );
}