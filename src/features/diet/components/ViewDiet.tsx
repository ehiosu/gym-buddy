import {  Coffee, CookingPotIcon, Hamburger, Utensils, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useConvexAuth } from "convex/react";

import useModalStore from "@/features/store/modalStore";
import { useUserDiet } from "../hooks/use-get-user-diet";
import { meal_suggestions } from "../types/types";
;
  const panelVariants = {
    hidden: { x: 320, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
export const ViewDiet = ({isMobile=false}) => {
     const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
     const {isAuthenticated} = useConvexAuth();
     const {setModalType}=useModalStore();
     const {userDiets:diet,isLoading,isError}=useUserDiet();
      const panelRef = useRef<HTMLDivElement|null>(null);
      const [isClient,setClient]=useState<boolean>(false);
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
      useEffect(()=>{
        setClient(true)
      },[])
      if(isLoading && !isError) {
        return (
          <motion.div
      ref={panelRef}
      initial={false}
      animate={isClient ?window.innerWidth >= 1024 ? 'visible' : isMobileOpen ? 'visible' : 'hidden':"hidden"}
      variants={panelVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        fixed lg:relative z-20 w-[300px] lg:w-[40dvw] h-[80dvh] lg:h-[80vh] lg:overflow-y-visible  shrink-0 
        max-w-sm  rounded-lg  p-4 lg:shadow-lg flex flex-col
        right-0 top-4 lg:right-auto lg:top-auto lg:mr-4
      `}
    >
          <Skeleton className={`w-full h-full bg-gray-900 rounded-xl border border-gray-800`}/>
        </motion.div>
        );
      }



      
     
      
      if (!isAuthenticated && isClient ) {
        if(window.innerWidth >= 1024){
          return (
          
            <Skeleton className="w-[300px] h-[80vh] mt-4 bg-gray-900 rounded-xl border border-gray-800"/>
        );
        }
        
      }
      const hasDiet = Boolean(diet);
      
 const getMealIcon = (mealType:string) => {
    switch(mealType) {
      case 'Breakfast': return <Coffee className="w-4 h-4" />
      case 'Lunch': return <CookingPotIcon className="w-4 h-4" />
      case 'Dinner': return <Utensils className="w-4 h-4" />
      default: return <Hamburger className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed bottom-6 right-6 z-30 bg-orange-500 text-white p-3 rounded-full shadow-lg lg:hidden"
        >
          <Utensils className="w-5 h-5" />
        </button>
      )}

      {/* Main panel */}
      <motion.div
        initial={false}
        animate={isMobile ? (isMobileOpen ? 'visible' : 'hidden') : 'visible'}
        variants={panelVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          ${isMobile ? 'fixed z-20 top-[15%] right-0 h-[80vh] w-80' : 'relative h-[80vh]'} 
          bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Your Nutrition Plan</h2>
          </div>
          
          {isMobile && (
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {!hasDiet ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-40 h-40 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Utensils className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">No Diet Plan Found</h3>
              <p className="text-gray-400 mb-6 max-w-[240px]">
                Get personalized meal recommendations based on your goals
              </p>
              <button 
                         onClick={() => setModalType("create-diet")}
                className="w-full max-w-[200px] bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 transition"
              >
                Create Diet Plan
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Diet Summary */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="font-medium text-white mb-3">{diet?.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{diet?.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Daily Calories</p>
                    <p className="font-medium text-white">{diet?.calories}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Goal</p>
                    <p className="font-medium text-white">{diet?.goal}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Macronutrients</p>
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-orange-500" 
                      style={{ width: diet?.macros.proteins }}
                    />
                    <div 
                      className="bg-gray-500" 
                      style={{ width: diet?.macros.carbohydrates }}
                    />
                    <div 
                      className="bg-gray-300" 
                      style={{ width: diet?.macros.fats }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Protein {diet?.macros.proteins}</span>
                    <span>Carbs {diet?.macros.carbohydrates}</span>
                    <span>Fat {diet?.macros.fats}</span>
                  </div>
                </div>
              </div>

              {/* Meal Plan */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Today&apos;s Meals</h3>
                {diet&&Array.isArray(diet?.mealPlan)&& (diet?.mealPlan as meal_suggestions[]).map((meal, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -2 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-orange-500/30 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 text-orange-400">
                        {getMealIcon(meal.meal)}
                        <h4 className="font-medium">{meal.meal}</h4>
                      </div>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                        ~{meal.suggestions.reduce((sum:number, item) => sum + item.calories, 0)} cal
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {meal.suggestions.map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.ingredients.join(', ')}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 self-center">
                            {item.calories}cal
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

// const MealOption=({meal}:{meal:{
//   meal:string,
//   suggestions:{
//     name:string,
//     ingredients:string[],
//     calories:number
//   }[]
// }})=>{
//   {
//     const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    
//     return (
//       <div  className="border border-gray-100 rounded-lg p-3">
//         <div className="flex justify-between items-center mb-2">
//           <h4 className="font-medium">{meal.meal}</h4>
//           <div className="flex items-center gap-2">
//             <span className="text-xs bg-gray-100 px-2 py-1 rounded">
//               ~{meal.suggestions[selectedSuggestion].calories} cal
//             </span>
//             {meal.suggestions.length > 1 && (
//               <button 
//                 onClick={() => setSelectedSuggestion(prev => prev === 0 ? 1 : 0)}
//                 className="text-xs text-gray-500 hover:text-gray-700"
//               >
//                 <ArrowRightLeftIcon className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>
        
//         <div>
//           <p className="font-medium text-sm">
//             {meal.suggestions[selectedSuggestion].name}
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             {meal.suggestions[selectedSuggestion].ingredients.join(', ')}
//           </p>
//         </div>
//       </div>
//     );
//   }
// }