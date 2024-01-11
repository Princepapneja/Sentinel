'use client'
import useData from "@/components/essentails/customHooks/useData"
import Sidebar from "@/components/layout-items/sidebar"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
     const {fetchIncidents,setToken}=useData()
  const session: any = useSession()
  useEffect(() => {
    setToken(session?.data?.token)
    console.log(session?.token,"auth") 
    fetchIncidents()
  }, [session])
    return <>
          <div className='flex gap-2'>

         <Sidebar/>
    <section className="grow">{children}</section>
    </div>
    </>
    
    
  }