import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {  useEffect, useState } from "react";
import { DropletIcon, DumbbellIcon, FootprintsIcon, MoonIcon, ScaleIcon } from "lucide-react";
import { DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import useModalStore from "@/features/store/modalStore";
import { useUserGoals } from "../hooks/use-user-goals";
import { Doc } from "../../../../convex/_generated/dataModel";
type goalState={current:number,initial:number,target:number}
// components/GoalSetupWizard.tsx
export function GoalSetupModal() {
    const setupGoals = useMutation(api.goals.setup);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [goalValues, setGoalValues] = useState<Record<string,string>>({});
    const [step, setStep] = useState<number>(1); // 1: select, 2: configure
    const {setModalType} = useModalStore();
    const addGoals = useMutation(api.goals.add);
    const {data:userGoals}=useUserGoals();
    const isFreshGoals = !Boolean(userGoals);
    const goalOptions = [
      { id: 'weight', name: 'Weight Target', icon: <ScaleIcon /> },
      { id: 'sessions', name: 'Weekly Workouts', icon: <DumbbellIcon /> },
      { id: 'water', name: 'Daily Water', icon: <DropletIcon /> },
      { id: 'sleep', name: 'Sleep Hours', icon: <MoonIcon /> },
      { id: 'steps', name: 'Daily Steps', icon: <FootprintsIcon /> }
    ];
    
    useEffect(()=>{
      if(userGoals && userGoals!== undefined){
        const initialValues:Record<string,string> = {};
        userGoals.activeGoals.forEach((goalId:string)=>{
          initialValues[`${goalId}_current`] = (userGoals[goalId as keyof Doc<"goals">]! as unknown as goalState ).current.toString();
          initialValues[`${goalId}_target`] = (userGoals[goalId as keyof Doc<"goals">]! as unknown as goalState).target.toString();
          initialValues[`${goalId}_initial`] = (userGoals[goalId as keyof Doc<"goals">]! as unknown as goalState).initial.toString();
        })
        setGoalValues(initialValues);
        setSelectedGoals(userGoals.activeGoals);
      }
    },[userGoals])
    const handleSubmit = async () => {
      if(selectedGoals.length <1 ) return;
      if(isFreshGoals){
        toast.promise(setupGoals({ 
        
          activeGoals: selectedGoals,
          values: goalValues
        }).then(()=>{setModalType(null)}),{
          loading:"Saving Goals...",
          success:"Goals Saved!",
          error:(error)=><p>{error.message}</p>
        })
        return;
      }
      else{
        toast.promise(addGoals({ 
          goalId: userGoals!._id,
          activeGoals: selectedGoals,
          values: goalValues
        }).then(()=>{setModalType(null)}),{
          loading:"Saving Goals...",
          success:"Goals Saved!",
          error:(error)=><p>{error.message}</p>
        })
      }
    };

 
  
    if (step === 1) {
      return (
        <DialogContent className="">
          <h2 className="text-xl font-bold mb-6">Set Up Your Fitness Goals</h2>
          <div className="grid grid-cols-2 gap-4">
            {goalOptions.map(goal => (
              <div
                key={goal.id}
                onClick={() => setSelectedGoals(prev => 
                  prev.includes(goal.id) 
                    ? prev.filter(id => id !== goal.id) 
                    : [...prev, goal.id]
                )}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  (selectedGoals.includes(goal.id) || userGoals?.activeGoals?.includes(goal.id))
                    ? 'border-black bg-black/5' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {goal.icon}
                  </div>
                  <span>{goal.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={selectedGoals.length === 0}
            className="mt-6 w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            Continue
          </button>
        </DialogContent>
      );
    }
  
    return (
      <DialogContent className="">
        <h2 className="text-xl font-bold mb-6">Set Your Goal Values</h2>
        <div className="space-y-6">
          {selectedGoals.map(goalId => {
            const goal = goalOptions.find(g => g.id === goalId);
            if(goal){
                return (
                    <div key={goalId} className="space-y-2">
                      <label className="font-medium">{goal.name}</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Current</label>
                          <input
                            type="number"
                            value={goalValues[`${goalId}_current`] || ''}
                            onChange={(e) => setGoalValues({
                              ...goalValues,
                              [`${goalId}_current`]: e.target.value,
                              [`${goalId}_initial`]: e.target.value,
                            })}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Target</label>
                          <input
                            type="number"
                            value={goalValues[`${goalId}_target`] || ''}
                            onChange={(e) => setGoalValues({
                              ...goalValues,
                              [`${goalId}_target`]: e.target.value
                            })}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                  );
            }
            
          })}
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-100 text-gray-800 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            Save Goals
          </button>
        </div>
      </DialogContent>
    );
  }