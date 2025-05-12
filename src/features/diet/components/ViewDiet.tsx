import { ArrowRightLeftIcon, CookingPotIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import useModalStore from "@/features/store/modalStore";
import { useUserDiet } from "../hooks/use-get-user-diet";
import { meal_suggestions } from "../types/types";
;
  const panelVariants = {
    hidden: { x: 320, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
export const ViewDiet = () => {
     const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
     const {isAuthenticated} = useConvexAuth();
     const {setModalType}=useModalStore();
     const {userDiets:diet,isLoading,isError}=useUserDiet();
      const panelRef = useRef<HTMLDivElement|null>(null);
       useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
          if (panelRef.current && !panelRef.current.contains(event.target as unknown as Node)) {
            setIsMobileOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      },[]);
      if(isLoading) {
        return (
          <motion.div
      ref={panelRef}
      initial={false}
      animate={typeof window!==undefined?window.innerWidth >= 1024 ? 'visible' : isMobileOpen ? 'visible' : 'hidden':"hidden"}
      variants={panelVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        fixed lg:relative z-20 w-[300px] lg:w-[40dvw] h-[80dvh] lg:h-[80vh] lg:overflow-y-visible  shrink-0 
        max-w-sm  rounded-lg  p-4 lg:shadow-lg flex flex-col
        right-0 top-4 lg:right-auto lg:top-auto lg:mr-4
      `}
    >
          <Skeleton className={`w-full h-full`}/>
        </motion.div>
        );
      }
      if(isError) {
        return (
          <motion.div
      ref={panelRef}
      initial={false}
      animate={typeof window!==undefined?window.innerWidth >= 1024 ? 'visible' : isMobileOpen ? 'visible' : 'hidden':"hidden"}
      variants={panelVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        fixed lg:relative z-20 w-[300px] lg:w-[40dvw] h-[80dvh] lg:h-[80vh] lg:overflow-y-visible  shrink-0 
        max-w-sm  rounded-lg  p-4 lg:shadow-lg flex flex-col
        right-0 top-4 lg:right-auto lg:top-auto lg:mr-4
      `}
    >
          <Skeleton className={`w-full h-full`}/>
        </motion.div>
        );
      }


      
     
      
      if (!isAuthenticated && typeof window !== undefined ) {
        if(window.innerWidth >= 1024){
          return (
          
            <Skeleton className="w-[300px] h-[80vh] mt-4 "/>
        );
        }
        
      }
      const hasDiet = false;
      
  return (
    <>
    {/* Mobile toggle button (hidden on desktop) */}
    <button 
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="fixed lg:hidden bottom-6 right-6 z-30 bg-black text-white p-3 rounded-full shadow-lg"
    >
      <CookingPotIcon className="size-6" />
    </button>

    {/* Main panel */}
    <motion.div
      ref={panelRef}
      initial={false}
      animate={typeof window!==undefined?window.innerWidth >= 1024 ? 'visible' : isMobileOpen ? 'visible' : 'hidden':"hidden"}
      variants={panelVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        fixed lg:relative z-20  w-[300px] lg:w-[40dvw] h-[80dvh] lg:h-[80vh] lg:overflow-y-visible  shrink-0 
        max-w-sm bg-white rounded-lg shadow-md p-4 lg:shadow-lg flex flex-col
        right-0 top-4 lg:right-auto lg:top-auto lg:mr-4
      `}
    >
      {/* Header */}
    <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gray-900 p-2 rounded-lg">
          <CookingPotIcon className="size-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold">Your Nutrition Plan</h2>
      </div>
      <button 
        onClick={() => setIsMobileOpen(false)}
        className="lg:hidden text-gray-400 hover:text-gray-600"
      >
        <XIcon className="size-5" />
      </button>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto pb-4">
      {!hasDiet ? (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <Image 
            src="/diet-img.svg" 
            width={200} 
            height={200} 
            className="w-3/4 max-w-[300px] opacity-90 mb-6"
            alt="Healthy diet illustration"
          />
          <h3 className="text-lg font-medium mb-2">No Diet Plan Found</h3>
          <p className="text-gray-500 mb-6 max-w-[300px]">
            Get personalized meal recommendations based on your goals and preferences
          </p>
          <button 
            onClick={() => setModalType("create-diet")}
            className="w-full max-w-[240px] bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
          >
            Create Diet Plan
          </button>
        </div>
      ) : (
        <div className="space-y-6 p-4 max-w-full">
          {/* Diet Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3">{diet?.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{diet?.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500">Daily Calories</p>
                <p className="font-medium">{diet?.calories}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Goal</p>
                <p className="font-medium">{diet?.goal}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500">Macronutrients</p>
              <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gray-700" 
                  style={{ width: diet?.macros.carbohydrates }}
                />
                <div 
                  className="bg-gray-500" 
                  style={{ width: diet?.macros.proteins }}
                />
                <div 
                  className="bg-gray-300" 
                  style={{ width: diet?.macros.fats }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Carbs {diet?.macros.carbohydrates}</span>
                <span>Protein {diet?.macros.proteins}</span>
                <span>Fat {diet?.macros.fats}</span>
              </div>
            </div>
          </div>
          {/* <div className="space-y-4">
            <h3 className="font-medium">Daily Meal Plan</h3>
            {diet.result.meal_suggestions.map((meal, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{meal.meal}</h4>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    ~{meal.suggestions.reduce((sum, item) => sum + item.calories, 0)} cal
                  </span>
                </div>
                
                <div className="space-y-3">
                  {meal.suggestions.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.ingredients.join(', ')}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 self-center">
                        {item.calories}cal
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
          {/* Meal Plan */}
          <div className="space-y-4">
  <h3 className="font-medium">Daily Meal Plan</h3>
  {(diet?.mealPlan as meal_suggestions).map((meal, index) =><MealOption key={index} meal={meal} />)}
</div>
        </div>
      )}
    </div>
      
    </motion.div>
  </>
  )
}

const MealOption=({meal}:{meal:{
  meal:string,
  suggestions:{
    name:string,
    ingredients:string[],
    calories:number
  }[]
}})=>{
  {
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    
    return (
      <div  className="border border-gray-100 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">{meal.meal}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              ~{meal.suggestions[selectedSuggestion].calories} cal
            </span>
            {meal.suggestions.length > 1 && (
              <button 
                onClick={() => setSelectedSuggestion(prev => prev === 0 ? 1 : 0)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                <ArrowRightLeftIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        <div>
          <p className="font-medium text-sm">
            {meal.suggestions[selectedSuggestion].name}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {meal.suggestions[selectedSuggestion].ingredients.join(', ')}
          </p>
        </div>
      </div>
    );
  }
}