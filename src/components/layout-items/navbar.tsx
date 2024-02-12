'use client'
import React, { useEffect } from 'react'
import { getToken } from '../essentails/functions/getToken';
import useData from '../essentails/customHooks/useData';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { AvatarIcon } from '@radix-ui/react-icons'

const Navbar = () => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    session.status === "unauthenticated" && router.push("/")
  }, [session])

  return (
    <>
      <nav className='nav flex gap-2 p-4 justify-between bg-primary items-center'>
        <Link href="/" className='text-white font-bold'>MS-Sentinel </Link>
        <div className='flex gap-3' >

          {
            session?.status === "authenticated" &&
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="outline"
                ><AvatarIcon />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>

                  <Link href="/dashboard" >Dashboard </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem >

                  <Button onClick={() => { signOut({ callbackUrl: "/" }); router.push("/") }} className='w-full' >Logout </Button>
                  {/* // :
          // <Button asChild className='w-full'>
          //   <Link href="/">Login</Link>
          // </Button> */}

                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }


        </div>
      </nav>

    </>
  )
}

export default Navbar