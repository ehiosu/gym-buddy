import {create} from 'zustand'
import { Id } from '../../../convex/_generated/dataModel'
type routneStore = {
    currentRoutineId:Id<"routine">|null,
    routines:routine[],
    setCurrentRoutine:(newRoutineId:Id<"routine">)=>void,
    setRoutines:(routines:routine[])=>void
}
export type routine = {
    _id:Id<"routine">,
    name:string,
    timeline:number,
    sessionDuration:number,
    routine:exercise[],
    
}
type exercise={
    name:string,
    duration:string,
    repititions:string,
    sets:string,
    equipment:string
}
export const useRoutineStore = create<routneStore>((set)=>({
    currentRoutineId:null,
    routines:[],
    setCurrentRoutine:(newRoutineId)=>set({currentRoutineId:newRoutineId}),
    setRoutines:(routines)=>set({routines})
}))