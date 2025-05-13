import { create } from "zustand";
import { Exercise } from "../routines/hooks/useCreateRoutine";
import { persist, createJSONStorage } from 'zustand/middleware'
interface workoutStoreData{
    isWorkingOut:boolean,
    setIsWorkingOut:(state:boolean)=>void,
    currentWorkoutId:number,
    setCurrentWorkoutId:(value:number)=>void,
    routine:Exercise[],
    setRoutine:(routine:Exercise[])=>void,
}
export const useWorkoutStore = create<workoutStoreData>()(
    persist(
    (set)=>({
    routine:[],
    setRoutine:(routine)=>set({routine}),
    isWorkingOut:false,
    setIsWorkingOut:(state)=>set({isWorkingOut:state}),
    currentWorkoutId:0,
    setCurrentWorkoutId:(id)=>set({currentWorkoutId:id})
}),{
    name:"Workout store",
      storage: createJSONStorage(() => sessionStorage), 
}
)
)