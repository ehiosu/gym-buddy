import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface newRoutineData {
name:string,
goal:string,
fitnessLevel:string,
preferences:string,
healthConditions:string[],
daysPerWeek:number,
sessionDuration:number,
planDuration:number
}
export interface WorkoutPlanResponse {
    status: string;
    message: string;
    result: WorkoutPlan;
    cacheTime: number;
  }
  
  export interface WorkoutPlan {
    goal: string;
    fitness_level: string;
    total_weeks: number;
    schedule: {
      days_per_week: number;
      session_duration: number;
    };
    exercises: WorkoutDay[];
    seo_title: string;
    seo_content: string;
    seo_keywords: string;
  }
  
  export interface WorkoutDay {
    day: string;
    exercises: Exercise[];
  }
  
  export interface Exercise {
    name: string;
    duration: string;
    repetitions: string;
    sets: string;
    equipment: string;
  }
  
export const useCreateRoutine = () => {
    const createRoutine = useMutation(api.routines.create);
    const createNewRoutine = async (data:newRoutineData) => {
        const newRoutinePromise = new Promise(async(resolve, reject) => {
            const newGeneratedRoutine = await fetch("https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan?noqueue=1",{
                method:"POST",
                headers: {
                    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
                    'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    goal: data.goal,
                    fitness_level: data.fitnessLevel,
                    preferences:data.preferences,
                    health_conditions: data.healthConditions,
                    schedule: {
                        days_per_week: data.daysPerWeek,
                        session_duration: data.sessionDuration
                    },
                    plan_duration_weeks: data.planDuration,
                    lang: 'en'
                })
            });
            if(newGeneratedRoutine.ok){
                const routineData = await newGeneratedRoutine.json() as WorkoutPlanResponse
              
                if(routineData.status==="success" && !("error" in routineData.result )){
        
                   const workoutId = await createRoutine({
                        name:data.name,
                        routine: routineData.result.exercises,
                        timeline:data.planDuration,
                        sessionDuration:data.sessionDuration
                    })
                    if(workoutId){
                        resolve(workoutId)
                    }
                    else{
                        reject("Failed to create routine")
                    }
                }
        
            }
            else{
                reject(newGeneratedRoutine.statusText);
            }
         })
         await Promise.all([newRoutinePromise])
    };
    return {createNewRoutine};
}
