'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { AlertTriangle, Home,Menu,Wrench,X } from 'lucide-react';
const Sidebar = () => {
  let navData = [
    {
      name: "Home",
      link: "/dashboard",
      icon: <Home />
    },
    {
      name: "Incidents",
      link: "/dashboard/incidents",
      icon: <AlertTriangle />
    },

    // {
    //   name: "Settings",
    //   link: "/dashboard/settings",
    //   icon: <Wrench />
    // },


  ]
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  
  return (
    <>
      <aside className={`h-screen bg-primary text-primary-foreground  border-primary overflow-y-auto  ${!open ? "w-[42px] " : "w-40"} duration-300`}>
        <nav className="  ">
          <button onClick={() => setOpen(!open)}
            className={`${open && " justify-end"} flex     w-full p-2  duration-300 focus:outline-none`}
          >

            {/* <Icons type={`${open ?"cross" :"dashboard"}`} /> */}
            {open ?<X /> :<Menu />}
            
            </button>
          {navData?.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                onClick={()=>{setActive(index)}}
                className={`${open && "flex gap-1"} ${active===index&& "bg-[#8e92a5]"}   text-base font-bold p-2 block  focus:outline-none`}
              >
              
                {item.icon}

                {open &&
                  <span className={`${!open && "w-0 opacity-0 invisible" } whitespace-nowrap visible opacity-100 duration-300 overflow-hidden`}>
                  {item.name}
                </span>
                }
              </Link>
            )
          })}
        </nav>

        {/* <div className="flex flex-col items-center space-y-6">
          <Link
            href="/settings"
            className="flex gap-1 items-center rounded-lg bg-gray-100 p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none"
          >
            <Icons type={"settings"} />

            <span>
              Settings
            </span>
          </Link>

          <Link href="/profile">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="User avatar"
            />
          </Link>
        </div> */}
      </aside>

    </>
  )
}

export default Sidebar