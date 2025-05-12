import { useCurrentRoutine } from "@/features/routines/hooks/use-current-routine";
import {
  Exercise,
  WorkoutDay,
} from "@/features/routines/hooks/useCreateRoutine";
import { ArrowLeft, ArrowRight, CheckIcon, ClockIcon, Dumbbell, HistoryIcon, ShapesIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  startOfWeek,
  endOfWeek,
  endOfMonth,
  isAfter,
  addDays,
  format,
  isToday,
  isBefore,
  isEqual,
} from "date-fns";
import { useTodaysSchedule } from "@/features/routines/hooks/use-todays-schedule";
import { Skeleton } from "@/components/ui/skeleton";
import { useConvexAuth } from "convex/react";
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
export const Schedule = () => {
  const routine = useCurrentRoutine();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const { isAuthenticated } = useConvexAuth();
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
  }, []);

  const panelVariants = {
    hidden: { x: -320, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
  if (!isAuthenticated || (!routine && typeof window !== undefined && window.innerWidth >= 1024)) {
    return (
      

        <Skeleton className="w-[300px] h-[80vh] mt-4 "/>
      
    );
  }

  const generateRemainingWeeks = () => {
    // Today
    const now = new Date();

    // Start on Monday of this week
    const startDate = startOfWeek(now, { weekStartsOn: 1 });

    // End on the **Sunday** of the week that contains the last day of the month
    const endDate = endOfWeek(endOfMonth(now), { weekStartsOn: 1 });

    // Generate array of each day
    const days = [];
    let current = startDate;

    while (!isAfter(current, endDate)) {
      // if(isBefore(current, new Date())) {
      //   continue; // Skip past dates
      // }
      days.push(current);
      current = addDays(current, 1);
    }
    return days;
  };
  const todaysSchedule = useTodaysSchedule({
    selectedDate: selectedDate,
    routine,
  });

  // const todaysSchedule= routine.routine[0] as unknown as WorkoutDay;
  return (
    <>
    {/* Mobile toggle button (hidden on desktop) */}
    <button 
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="fixed lg:hidden bottom-6 left-6 z-30 bg-black text-white p-3 rounded-full shadow-lg"
    >
      <HistoryIcon className="size-6" />
    </button>

    {/* Main panel */}
    <motion.div
      ref={panelRef}
      initial={false}
      animate={typeof window!== undefined? window.innerWidth >= 1024 ? 'visible' : isMobileOpen ? 'visible' : 'hidden':"hidden"}
      variants={panelVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        fixed lg:relative z-20 w-[300px] h-[80dvh] lg:h-[80vh] overflow-y-auto shrink-0 
        max-w-sm bg-white rounded-lg shadow-md p-4 lg:shadow-lg
        left-0 top-4 lg:left-auto lg:top-auto lg:ml-4
      `}
    >
      <div className="flex gap-2 items-center mb-4 p-4 border-b border-gray-100">
       <div className="p-1.5 rounded bg-gray-900 text-white">
       <HistoryIcon className="size-6 " />
       </div>
        <p className="text-lg font-semibold">Today's Schedule</p>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden ml-auto text-gray-500 hover:text-gray-700"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      {/* Weekday selector */}
      <div className="flex overflow-x-auto relative gap-3 my-4 scrollbar-thin-minimal">
        {generateRemainingWeeks().map((day, index) => {
          if(isBefore(day, new Date()) && !isToday(day)) {
            return null; // Skip past dates
          }
          return( <Day
          selectedDate={selectedDate}
          key={index}
          day={day}
          setSelectedDate={setSelectedDate}
        />);
})}
      </div>

      {/* Timeline content */}
      <div className="relative pl-8">
        <div className={`absolute top-2 h-full w-0.5 ${
          todaysSchedule.exercises.length > 0 ? 'bg-green-100 left-6' : 'bg-neutral-300/50 left-4'
        }`}></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate.toDateString()}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {(todaysSchedule.exercises as Exercise[]).map((exercise, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-6 mt-8 relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-5 mt-1.5">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    index === 0 ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                  }`}>
                    {index === 0 && (
                      <CheckIcon className="size-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Exercise content */}
                <div className="pl-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    {exercise.name}
                  </h3>

                  <div className="flex flex-wrap mt-1 text-sm text-gray-500">
                    <div className="mr-4 mb-2 flex items-center">
                      <ClockIcon className="size-4 mr-1 text-gray-400" />
                      {exercise.duration}
                    </div>
                    <div className="mr-4 mb-2 flex items-center">
                      <ShapesIcon className="size-4 mr-1 text-gray-400" />
                      {exercise.equipment}
                    </div>
                  </div>

                  {/* Sets and reps */}
                  <div className="mt-3 space-y-2">
                    {Array.from({ length: parseInt(exercise.sets) }).map((_, setIndex) => (
                      <div key={setIndex} className="flex items-center">
                        <div className="w-10 text-sm font-medium text-gray-500">
                          Set {setIndex + 1}
                        </div>
                        <div className="ml-2 flex-1 h-8 bg-gray-100 rounded-md flex items-center px-3">
                          <span className="text-sm text-gray-600">
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
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
            <p>No exercises scheduled for today.</p>
            <Image
              src="/rest.svg"
              alt="Rest day"
              width={120}
              height={120}
              className="mt-4 opacity-80"
            />
          </div>
        )}
      </div>

      {todaysSchedule.exercises.length > 0 && (
        <button className="whitespace-nowrap font-semibold w-full text-base py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors mt-4">
          Start Session
        </button>
      )}
    </motion.div>
  </>
  );
};

const Day = ({
  day,
  setSelectedDate,
  selectedDate,
}: {
  day: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: Date;
}) => {
  const routine = useCurrentRoutine();
  const currentSchedule = useTodaysSchedule({ selectedDate: day, routine });

  const isWorkoutToday =
    currentSchedule.day === format(day, "EEEE") &&
    currentSchedule.exercises.length > 0 &&
    (!isBefore(day, new Date()) || isToday(day));
  return (
    <div
      role="button"
      onClick={() => {
        setSelectedDate(day);
      }}
      className={`${isWorkoutToday && "cursor-pointer"}  ${isToday(day) ? "bg-black text-white font-bold" : isEqual(selectedDate, day) ? "bg-black/70 text-white font-bold" : "bg-neutral-200 text-black font-semibold"} flex flex-col items-center transition-colors justify-ceter gap-3 px-8 py-6 rounded-full `}
    >
      <p className="text-lg">{format(day, "dd")}</p>
      <p className="text-sm">{format(day, "EEE")}</p>
      {isWorkoutToday && <Dumbbell className="size-5 font-semibold mt-2" />}
    </div>
  );
};
