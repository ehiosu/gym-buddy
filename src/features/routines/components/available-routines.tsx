"use client";
import useModalStore from "@/features/store/modalStore";
import { useRoutineStore } from "@/features/store/routineStore";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";


export const AvailableRoutines = () => {
  const { routines } = useRoutineStore();
  const shouldRoutinesBeDisabled = routines.length === 3;
  const { setCurrentRoutine, currentRoutineId } = useRoutineStore();
  const { setModalType } = useModalStore();

  const generateRandomWorkoutUrl = () => {
    const randomInt = Math.floor(Math.random() * 5);
    return `/workout-${randomInt + 1}.svg`;
  };
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Available Routines</h2>
        <button
          disabled={shouldRoutinesBeDisabled}
          onClick={() => setModalType("create-routine")}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          New Routine
        </button>
      </div>

      <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-thin py-2">
        {/* New Routine Card */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={shouldRoutinesBeDisabled}
            onClick={() => setModalType("create-routine")}
          className="flex-shrink-0 w-64 h-72 rounded-xl border-2 border-dashed border-gray-700 hover:border-orange-500 flex flex-col items-center justify-center cursor-pointer transition-colors"
        >
          <Plus className="w-8 h-8 text-gray-500 mb-3" />
          <p className="text-gray-400 font-medium">Create New Routine</p>
        </motion.button>

        {/* Existing Routines */}
        {routines.map((routine) => (
          <motion.div
            key={routine._id}
            whileHover={{ scale: 1.02 }}
            className={`flex-shrink-0 relative h-72 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
              routine._id === currentRoutineId
                ? "w-80 ring-2 ring-orange-500"
                : "w-64"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={generateRandomWorkoutUrl()}
                alt={routine.name}
                className="w-full h-full object-cover opacity-70"
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent flex flex-col justify-end p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {routine.name}
                  </h2>
                  <p className="text-sm text-gray-300 mt-1">
                    {routine.sessionDuration} MIN • {routine.timeline} WEEKS
                  </p>
                </div>
                <button
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    routine._id === currentRoutineId
                      ? "bg-white text-gray-900"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setCurrentRoutine(routine._id)}
                >
                  {routine._id === currentRoutineId ? "Selected" : "Select"}
                </button>
              </div>
            </div>

            {/* Selected Indicator */}
            {routine._id === currentRoutineId && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <Check className="mr-1" /> ACTIVE
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
