"use client";


import Image from "next/image";



import { motion } from 'framer-motion'
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import {  Home, Menu, User, X } from "lucide-react";
import { ReactNode, useState } from "react";
import { useCurrentUser } from "../auth/hooks/use-get-current-user";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRoutineStore } from "../store/routineStore";



export const Navbar = () => {
  const { isAuthenticated,isLoading} = useConvexAuth()


  if (isLoading) {
    return (
      <div className="w-full bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h-10 w-40 bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h-10 w-40 bg-gray-800 rounded-lg"></div>
            <Link href={"/auth/signin"} className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <header className="w-full bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-16 p-1 rounded-full grid place-items-center overflow-hidden bg-white">
                <Image 
                src="/gym buddy logo.png" 
                width={80} 
                height={80} 
                alt="Gym Buddy logo"
                className="w-16 rounded-lg"
              />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">GYM BUDDY</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <NavLink href="/dashboard" icon={<Home />} text="Home" />
              {/* <NavLink href="/workouts" icon={<Activity />} text="Workouts" />
              <NavLink href="/schedule" icon={<Calendar />} text="Schedule" />
              <NavLink href="/progress" icon={<Bookmark />} text="Progress" /> */}
            </nav>
          </div>

          {/* User Profile and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* <button className="hidden md:block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
              Start Workout
            </button> */}
            
            <UserProfile />
            
            <MobileMenuButton />
          </div>
        </div>
      </div>

      {/* Mobile Menu (appears when button clicked) */}
      <MobileMenu />
    </header>
  )
}

const NavLink = ({ href, icon, text }:{href:string,icon:ReactNode,text:string}) => {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ y: -2 }}
        className="flex items-center gap-2 text-gray-400 bg-slate-100/10 px-4 py-2 rounded-full hover:text-orange-500 transition-colors"
      >
        <span className="text-lg">{icon}</span>
        <span>{text}</span>
      </motion.div>
    </Link>
  )
}

const UserProfile = () => {
  const { user } = useCurrentUser()
    const {signOut}=useAuthActions();
    const{setRoutines}=useRoutineStore();
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 focus:outline-none">
        <div className="w-10 h-10 rounded-full bg-gray-800 border-2 grid place-items-center border-orange-500 overflow-hidden">
          {user?.image ? (
            <Image 
              src={user.image} 
              width={40} 
              height={40} 
              alt="User profile"
              className="object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-gray-400 " />
          )}
        </div>
        <span className="hidden md:inline text-gray-300">{user?.name}</span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="py-1">
          {/* <Link href="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Profile</Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Settings</Link> */}
          <button onClick={()=>{
            signOut().then(()=>{
              setRoutines([])
            });
          }} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700">Sign Out</button>
        </div>
      </div>
    </div>
  )
}

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-400 hover:text-white focus:outline-none"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </>
  )
}

const MobileMenu = () => {
  const [isOpen] = useState(false)
  
  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { height: 'auto', opacity: 1 },
        closed: { height: 0, opacity: 0 }
      }}
      className="md:hidden overflow-hidden bg-gray-800 border-t border-gray-700"
    >
      <div className="px-6 py-4 space-y-4">
        <MobileNavLink href="/dashboard" icon={<Home />} text="Home" />
        {/* <MobileNavLink href="/workouts" icon={<Activity />} text="Workouts" />
        <MobileNavLink href="/schedule" icon={<Calendar />} text="Schedule" />
        <MobileNavLink href="/progress" icon={<Bookmark />} text="Progress" /> */}
        
        {/* <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
          Start Workout
        </button> */}
      </div>
    </motion.div>
  )
}

const MobileNavLink = ({ href, icon, text }:{href:string,icon:ReactNode,text:string}) => {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 py-2 text-gray-400 bg-slate-100/20 hover:text-orange-500 transition-colors">
        <span className="text-lg">{icon}</span>
        <span>{text}</span>
      </div>
    </Link>
  )
}