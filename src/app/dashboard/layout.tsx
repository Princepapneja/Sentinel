'use client'
import useData from "@/components/essentails/customHooks/useData"
import Sidebar from "@/components/layout-items/sidebar"
import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Spinner from "@/components/essentails/snippets/Spinner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { fetchIncidents, token, navHeight, loader } = useData()
  useEffect(() => {
    if(token){

      fetchIncidents()
    }
  }, [token])
  return <>
    <main className="flex h-full w-full min-h-screen lg:min-h-0">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">

          <Sidebar />
        </div>
      </div>
      <main className="grow relative">
        {loader ? 
        <div className="absolute grid place-items-center top-0 right-0 w-full h-full ">
          <Spinner />
        </div>
        :
          <ScrollArea className=" rounded-md border " style={{ height: `calc(100vh - ${navHeight}px)` }}>
            {children}
          </ScrollArea>
        }


      </main>
    </main>

  </>


}