
import { format } from "date-fns";

import { WorkoutDay } from "./useCreateRoutine";
import { routine } from "@/features/store/routineStore";

export const useTodaysSchedule = ({selectedDate,routine}:{selectedDate:Date,routine:routine|null|undefined}) => {
   if(routine){
    
        const foundRoutine = (routine.routine as unknown as WorkoutDay[]).find(
        (day) => {
            
          return (
            day.day === format(selectedDate, "EEEE") 
          );
        }
      ) || {
        day: selectedDate.toLocaleString("en-US", { weekday: "long" }),
        exercises: [],
        sets: "0",
      };
      return foundRoutine;
   }
   return {
    day: selectedDate.toLocaleString("en-US", { weekday: "long" }),
    exercises: [],
    sets: "0",
  };
}