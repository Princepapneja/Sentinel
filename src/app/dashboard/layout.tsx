import Sidebar from "@/components/layout-items/sidebar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>
          <div className='flex gap-2'>

         <Sidebar/>
    <section className="grow">{children}</section>
    </div>
    </>
    
    
  }