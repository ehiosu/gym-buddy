import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { diet } from "../types/types";

export const useCreateDiet =  () => {
    const createLocalDiet = useMutation(api.diet.create)
  const createDiet = async ({
  diet,
}: {
  diet: {
    goal: string;
    dietary_restrictions: string[];
    current_weight: number;
    target_weight: number;
    daily_activity_level: string;
    lang: string;
  };
}) => {
    const createDietPromise = new Promise(async(resolve,reject)=>{
      try {
      const url =
        "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/nutritionAdvice?noqueue=1";
      const options = {
        method: "POST",
        headers: {
          "x-rapidapi-key":process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host":
            "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diet)
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json() as diet;
      if(data){
       await createLocalDiet({
            name:data.result.exercise_name,
            description:data.result.description,
            goal:data.result.goal,
            calories:data.result.calories_per_day,
            macros:data.result.macronutrients,
            mealPlan:data.result.meal_suggestions,
        })
        resolve(undefined);
      }
    } catch (error) {
      console.error("Error creating diet:", error);
      reject(error);
    }
    })
    await Promise.all([createDietPromise])
  };
  

  return  createDiet 
};
