'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Icons from '../essentails/icons'
const Sidebar = () => {
  let navData = [
    {
      name: "Home",
      link: "/dashboard",
      icon: "home"
    },
    {
      name: "Incidents",
      link: "/dashboard/incidents",
      icon: "warning"
    },
    {
      name: "Sign-In Logs",
      link: "/dashboard/sign-in-logs ",
      icon: "warning"
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icon: "settings"
    },


  ]
  const [open, setOpen] = useState(false)
  return (
    <>
      <aside className={`h-screen border-t-8  border-gray-300 overflow-y-auto  bg-primary ${!open ? "w-12 " : "w-40"} duration-300`}>
        <nav className="  ">
          <button onClick={() => setOpen(!open)}
            className={`${open && " justify-end"} flex   text-white border-b-8 border-gray-300  w-full p-2  duration-300 focus:outline-none`}
          >

            <Icons type={`${open ?"cross" :"dashboard"}`} /></button>
          {navData?.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`${!open && "p-2"} flex gap-1  text-white border-b-8 border-gray-300  p-2  focus:outline-none`}
              >
                <Icons type={item.icon} />

                {open &&
                  <span className={`${!open && "w-0 opacity-0 invisible" } visible opacity-100 duration-300 overflow-hidden`}>
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