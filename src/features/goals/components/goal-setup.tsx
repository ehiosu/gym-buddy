import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {  useEffect, useState } from "react";
import { DropletIcon, DumbbellIcon, FootprintsIcon, MoonIcon, ScaleIcon } from "lucide-react";
import { DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import useModalStore from "@/features/store/modalStore";
import { useUserGoals } from "../hooks/use-user-goals";

import { motion } from 'framer-motion';

interface GoalOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}
// components/GoalSetupWizard.tsx
export function GoalSetupModal() {
  const setupGoals = useMutation(api.goals.setup);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [goalValues, setGoalValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState<number>(1); // 1: select, 2: configure
  const { setModalType } = useModalStore();
  const addGoals = useMutation(api.goals.add);
  const { data: userGoals } = useUserGoals();
  const isFreshGoals = !Boolean(userGoals);

  const goalOptions: GoalOption[] = [
    { id: 'weight', name: 'Weight Target', icon: <ScaleIcon className="w-5 h-5" /> },
    { id: 'sessions', name: 'Weekly Workouts', icon: <DumbbellIcon className="w-5 h-5" /> },
    { id: 'water', name: 'Daily Water', icon: <DropletIcon className="w-5 h-5" /> },
    { id: 'sleep', name: 'Sleep Hours', icon: <MoonIcon className="w-5 h-5" /> },
    { id: 'steps', name: 'Daily Steps', icon: <FootprintsIcon className="w-5 h-5" /> }
  ];
  
  useEffect(() => {
    if (userGoals && userGoals !== undefined) {
      const initialValues: Record<string, string> = {};
      userGoals.activeGoals.forEach((goalId: string) => {
        const goalState = userGoals[goalId as keyof typeof userGoals] as unknown as { current: number; target: number; initial: number };
        initialValues[`${goalId}_current`] = goalState.current.toString();
        initialValues[`${goalId}_target`] = goalState.target.toString();
        initialValues[`${goalId}_initial`] = goalState.initial.toString();
      });
      setGoalValues(initialValues);
      setSelectedGoals(userGoals.activeGoals);
    }
  }, [userGoals]);

  const handleSubmit = async () => {
    if (selectedGoals.length < 1) return;
    
    const action = isFreshGoals 
      ? setupGoals({ activeGoals: selectedGoals, values: goalValues })
      : addGoals({ goalId: userGoals!._id, activeGoals: selectedGoals, values: goalValues });

    toast.promise(action.then(() => setModalType(null)), {
      loading: "Saving Goals...",
      success: "Goals Saved!",
      error: (error) => error.message
    });
  };

  if (step === 1) {
    return (
      <DialogContent className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-6">Set Up Your Fitness Goals</h2>
        <div className="grid grid-cols-2 gap-3">
          {goalOptions.map(goal => (
            <motion.div
              key={goal.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedGoals(prev => 
                prev.includes(goal.id) 
                  ? prev.filter(id => id !== goal.id) 
                  : [...prev, goal.id]
              )}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                (selectedGoals.includes(goal.id) || userGoals?.activeGoals?.includes(goal.id))
                  ? 'border-orange-500 bg-gray-800' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  (selectedGoals.includes(goal.id) || userGoals?.activeGoals?.includes(goal.id))
                    ? 'bg-orange-500/20 text-orange-500'
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {goal.icon}
                </div>
                <span className="text-gray-300">{goal.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          onClick={() => setStep(2)}
          disabled={selectedGoals.length === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`mt-6 w-full py-2.5 rounded-lg font-medium ${
            selectedGoals.length > 0
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="bg-gray-900 border border-gray-800 rounded-xl max-h-[80vh] overflow-y-auto p-6 max-w-md w-full">
      <h2 className="text-xl font-bold text-white mb-6">Set Your Goal Values</h2>
      <div className="space-y-5">
        {selectedGoals.map(goalId => {
          const goal = goalOptions.find(g => g.id === goalId);
          if (!goal) return null;
          
          return (
            <div key={goalId} className="space-y-2">
              <label className="font-medium text-gray-300">{goal.name}</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current</label>
                  <input
                    type="number"
                    value={goalValues[`${goalId}_current`] || ''}
                    onChange={(e) => setGoalValues({
                      ...goalValues,
                      [`${goalId}_current`]: e.target.value,
                      [`${goalId}_initial`]: e.target.value,
                    })}
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Target</label>
                  <input
                    type="number"
                    value={goalValues[`${goalId}_target`] || ''}
                    onChange={(e) => setGoalValues({
                      ...goalValues,
                      [`${goalId}_target`]: e.target.value
                    })}
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3 mt-8">
        <motion.button
          onClick={() => setStep(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
        >
          Back
        </motion.button>
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
        >
          Save Goals
        </motion.button>
      </div>
    </DialogContent>
  );
}