import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ContextLayout from '@/components/context/contextLayout'
import Navbar from '@/components/layout-items/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>


        <ContextLayout>
          <Navbar/>
     
            <main className='grow'>
              {children}
            </main>
  
        </ContextLayout>

      </body>
    </html>
  )
}
