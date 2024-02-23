'use client'
import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { AvatarIcon } from '@radix-ui/react-icons'
import { initializeMSAL } from '../essentails/functions/initalizeMSAL';

const Navbar = () => {
  const router = useRouter()
  const handleLogout = async () => {
    const pca = await initializeMSAL();
    pca.clearCache();
    router.push("/")

  }

  return (
    <>
      <nav className='nav flex gap-2 p-4 justify-between bg-primary items-center'>
        <Link href="/" className='text-white font-bold'>Security Operations </Link>
        <div className='flex gap-3' >

          {
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

                  <Button onClick={handleLogout} className='w-full' >Logout </Button>
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