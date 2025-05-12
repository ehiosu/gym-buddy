"use client";
import { ViewDiet } from "@/features/diet/components/ViewDiet";
import { GoalsGrid } from "@/features/goals/components/goal-grid";
import { useUserRoutines } from "@/features/hooks/use-user-routines";
import { Navbar } from "@/features/Navigation/Navbar";
import { AvailableRoutines } from "@/features/routines/components/available-routines";
import { Schedule } from "@/features/schedule/components/schedule";
import useModalStore from "@/features/store/modalStore";
import { routine, useRoutineStore } from "@/features/store/routineStore";
import { useConvexAuth, useQuery } from "convex/react";
import { useEffect } from "react";



export default function Home() {
  const {isAuthenticated} = useConvexAuth();
  const {data:userRoutines, isLoading, isError} = useUserRoutines();
  const {setModalType,setIsOpen} = useModalStore();
  const {setCurrentRoutine,setRoutines} = useRoutineStore()
  useEffect(()=>{
    if(!isError&&!isLoading){
      if(userRoutines?.length === 0){
        setModalType("create-routine");
        setIsOpen(true);
      }else{
       
        setRoutines(userRoutines as unknown as routine[]);
        setCurrentRoutine(userRoutines![0]._id)
      }
      
    }
  },[userRoutines])
  return (
   <div className={`${isAuthenticated?"bg-neutral-100":"bg-white"} flex flex-col  transition-colors duration-300 min-h-screen`}>
    <Navbar/>
    <div className="flex flex-1 gap-4">
    <div className=" lg:w-[30%] max-w-[320px]">
      <Schedule />
    </div>
    
    {/* Main Content Area */}
    <div className="flex-1 flex lg:gap-4 ">
      {/* Available Routines - takes remaining space after Schedule and RightPanel */}
      <div className="flex-1 min-w-0  flex-col gap-4    w-full lg:w-[40vw] xl:w-[40vw]"> {/* min-w-0 prevents flex overflow */}
        <AvailableRoutines />
        <GoalsGrid/>
      </div>
      
      {/* Right Panel - 20% on desktop, hidden on mobile (or implement mobile solution) */}
      <div className="  border-l border-gray-200 pl-4">
        <ViewDiet />
      </div>
    </div>
    </div>

   </div>
  );
}
