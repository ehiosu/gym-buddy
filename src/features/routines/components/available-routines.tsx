"use client";
import useModalStore from "@/features/store/modalStore";
import { useRoutineStore } from "@/features/store/routineStore";
import {  PlusIcon } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

export const AvailableRoutines = memo(() => {
    const {routines} = useRoutineStore();
    const shouldRoutinesBeDisabled = routines.length === 3;
    const {setCurrentRoutine,currentRoutineId} = useRoutineStore();
    const {setModalType}=useModalStore();

    const generateRandomWorkoutUrl=()=>{
        const randomInt = Math.floor(Math.random()*5);
        return `/workout-${randomInt+1}.svg`
    }
  return (
    <div className="flex">
        <div>

<div className="   w-full lg:w-[40vw] xl:w-[40vw]   lg:p-0 ">
  <div className="flex justify-between items-center lg:px-0 px-2 mb-8 sticky left-0">
    <h1 className="text-3xl font-black tracking-tighter text-gray-900">AVAILABLE ROUTINES</h1>
    {/* <button 
      onClick={() => {}}
      className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg"
    >
      <PlusIcon className="w-5 h-5" />
      New Routine
    </button> */}
  </div>
  
  <div  className="flex md:flex-row flex-col space-x-4 pb-4 lg:space-y-0 space-y-4 overflow-x-auto no-scrollbar  ">
    {/* New Routine Card (static) */}
    <button 
    disabled={shouldRoutinesBeDisabled}
     onClick={()=>{
        setModalType("create-routine");
      }}
      className="flex-shrink-0 md:w-48 w-42 lg:ml-0 ml-4 lg:w-64 h-56 lg:h-72 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center cursor-pointer transition-colors"
      
    >
      <PlusIcon className="w-12 h-12 text-gray-400 mb-3 " />
      <p className="text-gray-600 font-medium">Create New Routine</p>
    </button>
    
    {/* Existing Routines */}
    <div className="flex  overflow-x-auto flex-1 lg:px-0 px-4 scrollbar-thin-minimal gap-4 lg:gap-2 max-w-full ">
    {routines.map((routine) => (
      <div
        key={routine._id}
        className={`flex-shrink-0 relative h-72 rounded-xl lg:aspect-auto aspect-square shadow-md transition-all duration-300 ease-out ${
          routine._id === currentRoutineId ? 'w-64 lg:w-80' : 'lg:w-64 w-56  hover:w-64 lg:hover:w-80'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden rounded-xl">
          <Image
            src={generateRandomWorkoutUrl()}
            alt={routine.name}
            fill
            className={`object-cover transition-transform duration-500 ${
               routine._id === currentRoutineId ? 'scale-105' : 'group-hover:scale-103'
            }`}
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent rounded-b-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-white">{routine.name}</h2>
              <p className="text-sm text-gray-300 mt-1">
                {routine.sessionDuration} MIN • {routine.timeline} WEEKS
              </p>
            </div>
            <button 
              className="bg-white  whitespace-nowrap text-gray-900 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentRoutine(routine._id);
              }}
            >
              { routine._id === currentRoutineId ? 'Selected ✓' : 'Select'}
            </button>
          </div>
        </div>

        {/* Selected Indicator */}
        { routine._id === currentRoutineId && (
          <div className="absolute top-4 left-4 bg-white text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
            ACTIVE
          </div>
        )}
      </div>
    ))}
    </div>
  </div>

  
</div>


        </div>
    </div>
  )
})
