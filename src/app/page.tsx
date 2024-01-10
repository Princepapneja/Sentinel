// pages/login.tsx
'use client'
import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login with Microsoft Account</h1>
        <button
          onClick={() => signIn()}

          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
