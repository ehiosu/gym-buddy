import { useRoutineStore } from "@/features/store/routineStore"

export const useCurrentRoutine = ()=>{
    const {routines,currentRoutineId}=useRoutineStore();
  
    return  routines.find((routine)=>routine._id===currentRoutineId);
}