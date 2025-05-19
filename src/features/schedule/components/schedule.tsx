import { useCurrentRoutine } from "@/features/routines/hooks/use-current-routine";

import { Activity,  Calendar, Check, Clock,    XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  format,
} from "date-fns";
import { useTodaysSchedule } from "@/features/routines/hooks/use-todays-schedule";
import { Skeleton } from "@/components/ui/skeleton";
import { useConvexAuth } from "convex/react";
import { WorkoutModal } from "@/features/workout/components/workout-modal";
import { useWorkoutStore } from "@/features/store/workoutStore";

const panelVariants = {
    hidden: { x: -320, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },show: { opacity: 1, y: 0 }
  }
export const Schedule = ({ isMobile = false }) => {
  const routine = useCurrentRoutine();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const { isAuthenticated } = useConvexAuth();
  const panelRef = useRef<HTMLDivElement|null>(null);
  const [workoutProgress, setWorkoutProgress] = useState<Record<string, number>>({})
  const {setCurrentWorkoutId,currentWorkoutId,routine:exercises,setRoutine,setIsWorkingOut,isWorkingOut}=useWorkoutStore();
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
  }, []);
   const todaysSchedule = useTodaysSchedule({
    selectedDate: selectedDate,
    routine,
  });

 
  if (!isAuthenticated || (!routine && typeof window !== undefined && window.innerWidth >= 1024)) {
    return (
      

        <Skeleton className="w-[300px] h-[80vh] mt-4 bg-gray-900 rounded-xl border border-gray-800"/>
      
    );
  }

  // const generateRemainingWeeks = () => {
  //   // Today
  //   const now = new Date();

  //   // Start on Monday of this week
  //   const startDate = startOfWeek(now, { weekStartsOn: 1 });

  //   // End on the **Sunday** of the week that contains the last day of the month
  //   const endDate = endOfWeek(endOfMonth(now), { weekStartsOn: 1 });

  //   // Generate array of each day
  //   const days = [];
  //   let current = startDate;

  //   while (!isAfter(current, endDate)) {
  //     // if(isBefore(current, new Date())) {
  //     //   continue; // Skip past dates
  //     // }
  //     days.push(current);
  //     current = addDays(current, 1);
  //   }
  //   return days;
  // };
 


 const startWorkout = () => {
    setCurrentWorkoutId(0);
    setRoutine(todaysSchedule.exercises);
    setIsWorkingOut(true);
  }

  const handleWorkoutComplete = () => {
    // Save completion status
    const newProgress = {...workoutProgress}
    newProgress[exercises[currentWorkoutId].name] = Date.now()
    setWorkoutProgress(newProgress)
  }

  const handleNextExercise = () => {
    if (currentWorkoutId < exercises.length - 1) {
      setCurrentWorkoutId(currentWorkoutId+1)
    } else {
      // Workout complete
      setIsWorkingOut(false)
    }
  }
  return (
    <>
       
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed bottom-6 left-6 z-30 bg-orange-500 text-white p-3 rounded-full shadow-lg lg:hidden"
        >
          <Calendar className="w-5 h-5" />
        </button>
      )}

      {/* Main panel */}
      <motion.div
        initial={false}
        animate={isMobile ? (isMobileOpen ? 'visible' : 'hidden') : 'visible'}
        variants={panelVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          ${isMobile ? 'fixed z-20 top-[15%] left-0 h-[80vh] w-80' : 'relative h-[80vh]'} 
          bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden
        `}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Today&apos;s Schedule</h2>
          </div>
          
          {isMobile && (
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Weekday selector */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {Array.from({ length: 7 }).map((_, i) => {
              const date = new Date()
              date.setDate(date.getDate() + i)
              const isSelected = format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
              
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-1 min-w-[60px] py-2 rounded-lg text-sm font-medium transition-colors ${
                    isSelected 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div>{format(date, 'EEE')}</div>
                  <div>{format(date, 'd')}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
          <div className="relative pl-8">
            <div className={`absolute top-2 h-full w-0.5 ${
              todaysSchedule.exercises.length > 0 ? 'bg-orange-500/30 left-6' : 'bg-gray-700 left-4'
            }`}></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDate.toDateString()}
                variants={containerVariants}
                className="pb-28"
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {todaysSchedule.exercises.map((exercise, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="mb-6 relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-5 top-1">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        index === 0 ? 'bg-orange-500 border-orange-500' : 'bg-gray-800 border-gray-600'
                      }`}>
                        {index === 0 && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    {/* Exercise content */}
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-colors">
                      <h3 className="text-lg font-medium text-white">
                        {exercise.name}
                      </h3>

                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="mr-1" />
                          {exercise.duration}
                        </div>
                        <div className="flex items-center">
                          <Activity className="mr-1" />
                          {exercise.equipment}
                        </div>
                      </div>

                      {/* Sets and reps */}
                      <div className="mt-3 space-y-2">
                        {Array.from({ length: parseInt(exercise.sets) }).map((_, setIndex) => (
                          <div key={setIndex} className="flex items-center">
                            <div className="w-10 text-sm font-medium text-gray-400">
                              Set {setIndex + 1}
                            </div>
                            <div className="ml-2 flex-1 py-1.5 min-h-8 bg-gray-700 rounded-md flex items-center px-3">
                              <span className="text-sm text-gray-300">
                                {exercise.repetitions !== "N/A" 
                                  ? `${exercise.repetitions} reps` 
                                  : "---"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {todaysSchedule.exercises.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-gray-600" />
                </div>
                <p>No exercises scheduled for today.</p>
                <p className="text-sm mt-1">Enjoy your rest day!</p>
              </div>
            )}
          </div>
        </div>

        {todaysSchedule.exercises.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
            <button onClick={()=>{
     startWorkout();
            }} className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg">
              Start Workout Session
            </button>
          </div>
        )}
      </motion.div>
   {isWorkingOut && (
        <WorkoutModal
          exercise={exercises[currentWorkoutId]}
          routine={exercises}
          currentExerciseIndex={currentWorkoutId}
          isOpen={isWorkingOut}
          onComplete={handleWorkoutComplete}
          onNext={handleNextExercise}
          onClose={() => setIsWorkingOut(false)}
          initialTime={0} // You could load this from saved progress
        />
      )}
   
    </>
  )
};

// const Day = ({
//   day,
//   setSelectedDate,
//   selectedDate,
// }: {
//   day: Date;
//   setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
//   selectedDate: Date;
// }) => {
//   const routine = useCurrentRoutine();
//   const currentSchedule = useTodaysSchedule({ selectedDate: day, routine });

//   const isWorkoutToday =
//     currentSchedule.day === format(day, "EEEE") &&
//     currentSchedule.exercises.length > 0 &&
//     (!isBefore(day, new Date()) || isToday(day));
//   return (
//     <div
//       role="button"
//       onClick={() => {
//         setSelectedDate(day);
//       }}
//       className={`${isWorkoutToday && "cursor-pointer"}  ${isToday(day) ? "bg-black text-white font-bold" : isEqual(selectedDate, day) ? "bg-black/70 text-white font-bold" : "bg-neutral-200 text-black font-semibold"} flex flex-col items-center transition-colors justify-ceter gap-3 px-8 py-6 rounded-full `}
//     >
//       <p className="text-lg">{format(day, "dd")}</p>
//       <p className="text-sm">{format(day, "EEE")}</p>
//       {isWorkoutToday && <Dumbbell className="size-5 font-semibold mt-2" />}
//     </div>
//   );
// };
