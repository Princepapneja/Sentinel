'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Icons from '../essentails/icons'
const Sidebar = () => {
  let navData = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: "dashboard"
    },
    {
      name: "Incidents",
      link: "/dashboard/incidents",
      icon: "settings"
    },
    {
      name: "Dashboard",
      link: "/",
      icon: "dashboard"
    },


  ]
  const [open, setOpen] = useState(false)
  return (
    <>
      <aside className={`h-screen  overflow-y-auto border-r bg-primary ${!open ? "w-12 " : "w-40"} duration-300`}>
        <nav className="flex flex-1 flex-col items-center  ">
          <button onClick={() => setOpen(!open)}
            className={`${!open && " place-items-center" }  grid gap-1  text-white border-b-8 border-gray-300  w-full p-1.5 transition-colors duration-200 focus:outline-none`}
          >

            <Icons type="dashboard" /></button>
          {navData.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`${!open && "justify-center"} flex gap-1  text-white border-b-8 border-gray-300  w-full p-1.5 transition-colors duration-300 focus:outline-none`}
              >
                <Icons type={item.icon} />

                <span className={`${!open && "w-0 opacity-0 invisible" } visible opacity-100 w-full duration-300 overflow-hidden`}>
                  {item.name}
                </span>
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