// pages/login.tsx
'use client'
import useData from '@/components/essentails/customHooks/useData';
import { getToken } from '@/components/essentails/functions/getToken';
// import { getToken } from '@/components/essentails/functions/getToken';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const { push } = useRouter()
  const { setToken } = useData()
  const handleLogin = async () => {
    try {
      const data = await getToken();
      setToken(data.accessToken);
      localStorage.setItem("token", data.accessToken)
      push("/dashboard")

    } catch (error) {
      console.error('Error fetching access token:', error);
    }

  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Login with Microsoft Account</h1>
          <button
            onClick={handleLogin}

            className="bg-primary flex gap-1 items-center justify-center text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            <Image src="/assets/images/ms.png" alt="alt" width={25} height={50} />
            <span>Sign in with Microsoft</span>
          </button>
        </div>
      </div>
    </>

  );
};

export default LoginPage;
