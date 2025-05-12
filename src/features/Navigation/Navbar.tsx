"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "../auth/hooks/use-get-current-user";
import Image from "next/image";
import { Home } from "lucide-react";
import { UserProfile } from "./UserProfile";

export const Navbar = () => {
    const { isLoading, isError } = useCurrentUser();
    if(isLoading){
        return <Skeleton className="w-[98vw] rounded-lg h-16 mx-auto mt-2"/>
    }
    if(isError){
        return <div className="w-[98vw] rounded-lg h-16  mx-auto mt-2 bg-neutral-300"></div>
    }
  return (
    <div className="w-[98vw] rounded-lg  mx-auto   flex flex-col py-4 px-6">
        <div className="flex m  gap-2 items-center">
            <Image width={100} height={100} className="w-20 aspect-square" src={"/gym buddy logo.png"} alt="Gym Buddy logo"/>
            <div className="w-max md:flex hidden h-max  items-center px-5 text-white font-semibold gap-2 bg-black py-2.5 rounded-full">
                <Home/>
                Home
            </div>
            <div className="ml-auto">
                <UserProfile/>
            </div>
        </div>
        

    </div>
  )
}
