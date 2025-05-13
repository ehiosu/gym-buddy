"use client";
import { ViewDiet } from "@/features/diet/components/ViewDiet";
import { GoalsGrid } from "@/features/goals/components/goal-grid";
import { useUserRoutines } from "@/features/hooks/use-user-routines";
import { Navbar } from "@/features/Navigation/Navbar";
import { AvailableRoutines } from "@/features/routines/components/available-routines";
import { Schedule } from "@/features/schedule/components/schedule";
import useModalStore from "@/features/store/modalStore";
import { routine, useRoutineStore } from "@/features/store/routineStore";
import { useEffect } from "react";



export default function Home() {
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
  },[isLoading,isError,userRoutines])
  return (
    <div className={`bg-gray-950 min-h-screen transition-colors duration-300`}>
  <Navbar />
  
  <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
    {/* Left Panel - Schedule (hidden on mobile, shown as overlay) */}
    <div className="hidden lg:block lg:w-[25%] max-w-[320px]">
      <Schedule />
    </div>
    
    {/* Main Content Area */}
    <div className="flex-1 flex flex-col gap-6 lg:w-[40vw] w-full xl:w-[50vw]">
      {/* Available Routines - Horizontal Scroll on mobile */}
  
      <AvailableRoutines/>

      {/* Goals Grid */}
      <GoalsGrid />
    </div>
    
    {/* Right Panel - Diet (hidden on mobile, shown as overlay) */}
    <div className="hidden lg:block lg:w-[25%] max-w-[320px]">
      <ViewDiet />
    </div>
  </div>

  {/* Mobile panels (appear as overlays when triggered) */}
   <div className="lg:hidden">
        <Schedule isMobile />
        <ViewDiet isMobile />
      </div>
</div>
  )
}
