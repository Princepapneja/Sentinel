// pages/login.tsx
'use client'
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const session = useSession();
  const router=useRouter()
  useEffect(() => {
    debugger
    session?.status === 'authenticated' && router.push("/dashboard")
  },[session])
  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login with Microsoft Account</h1>
        <button
          onClick={() => {signIn("azure-ad",{redirect:true,callbackUrl:"/dashboard"})}}

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
