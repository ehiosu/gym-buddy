"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "../auth/hooks/use-get-current-user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { DoorOpen } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserProfile = () => {
  const { user, isLoading, } = useCurrentUser();
    const { signOut } = useAuthActions();

  if (isLoading) {
    return <Skeleton className="w-32 h-12 rounded-lg " />;
  }
  if (user) {
    const { name, email, image } = user;

    const handleSignout = () => {
      signOut();
    };
    return (
      <Popover>
        <PopoverTrigger className="flex md:flex-row flex-row-reverse  gap-2 cursor-pointer hover:bg-neutral-200 p-2 w-max rounded transition-colors duration-150">
          <div
            className={`${!image && "bg-neutral-300 rounded-full"}  flex items-center justify-center w-12 aspect-square overflow-hidden`}
          >
            {
              image && <Image
              src={image}
              alt={name + "profile picture"}
              width={100}
              height={100}
              className="w-full aspect-square rounded-full my-auto "
            />
            }
          </div>{" "}
          <div className="flex flex-col text-start">
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-sm text-neutral-500">{email}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="bg-white border border-gray-200 rounded-xl shadow-md p-2 w-40"
          side="bottom"
        >
          <button
            className="w-full text-sm flex items-center gap-2 group text-gray-700 hover:font-semibold  hover:text-black hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-150"
            onClick={() => {
              handleSignout();
            }}
          >
            <div className="p-1.5 group-hover:bg-neutral-300 rounded transition-colors group-hover:delay-75 ">
              <DoorOpen className="w-4 h-4" />
            </div>
            Logout
          </button>
        </PopoverContent>
      </Popover>
    );
  }
  return null;
};
