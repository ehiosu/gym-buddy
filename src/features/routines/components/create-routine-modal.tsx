"use client";

import { Dialog, DialogContent,  } from "@/components/ui/dialog"
import {motion} from "framer-motion"
import { Slider } from "@/components/ui/slider";
import useModalStore from "@/features/store/modalStore"
import { useState } from "react";
import { useCreateRoutine } from "../hooks/useCreateRoutine";
import {toast} from "sonner"

export const CreateRoutineModal = () => {
    const {setModalType,modalType,isOpen}=useModalStore()
  return (
    <Dialog open={isOpen||modalType==="create-routine"} onOpenChange={(open)=>setModalType(isOpen?"create-routine":open?"create-routine":null)}>
        <RoutineForm/>
    </Dialog>
  )
}
function RoutineForm() {
    const [goal, setGoal] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [fitnessLevel, setFitnessLevel] = useState<string>("Intermediate")
    const [preferences, setPreferences] = useState<string>("")
    const [healthConditions, setHealthConditions] = useState<string[]>(["None"])
    const [daysPerWeek, setDaysPerWeek] = useState<number>(4)
    const [sessionDuration, setSessionDuration] = useState<number>(60)
    const [planDuration, setPlanDuration] = useState<number>(4)
  
    const levels = ["Beginner", "Intermediate", "Advanced"]
    const conditions = ["None", "Back pain", "Joint issues", "Asthma"]
    const {setIsOpen,setModalType}=useModalStore()
  
    const toggleSelect = (item: string) => {
      if (healthConditions.includes(item)) {
        setHealthConditions(healthConditions.filter(i => i !== item))
      } else {
        setHealthConditions([...healthConditions, item])
      }
    }
    const {createNewRoutine}= useCreateRoutine()
    const handleCreateRoutine = () => {
        toast.promise(createNewRoutine({
            goal,
            fitnessLevel,
            preferences,
            healthConditions,
            daysPerWeek,
            sessionDuration,
            planDuration,  
            name
        }).then(()=>{
            setIsOpen(false);
            setModalType(null)
        }),{
            loading:"Creating your routine...",
            success:"Your routine has been created!",
            error:(error)=><div>
                    {error.message||"An unknown error has occured."}
                </div>
        })

    }
  
    return (
         <DialogContent className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="border-b border-gray-800 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-white">Create Routine</h2>
        <p className="text-gray-400 mt-1">
          Create a new routine by filling out the form below.
        </p>
      </div>

      <div className="space-y-5">
        {/* Routine Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Routine Name</label>
          <input
            value={name}
            required
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Summer body loading"
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">What&apos;s the name of your super awesome routine?</p>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Goal</label>
          <input
            value={goal}
            required
            onChange={e => setGoal(e.target.value)}
            placeholder="e.g. Build muscle, lose fat, improve cardio"
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">State your primary fitness goal clearly.</p>
        </div>

        {/* Fitness Level */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Fitness Level</label>
          <div className="flex gap-2">
            {levels.map(level => (
              <motion.button
                key={level}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFitnessLevel(level)}
                className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
                  fitnessLevel === level
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Training Preferences</label>
          <input
            value={preferences}
            onChange={e => setPreferences(e.target.value)}
            placeholder="e.g. Home training, bodyweight, cardio, weights"
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">List any training styles or equipment you prefer.</p>
        </div>

        {/* Health Conditions */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Health Conditions</label>
          <div className="flex flex-wrap gap-2">
            {conditions.map(condition => (
              <motion.button
                key={condition}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSelect(condition)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  healthConditions.includes(condition)
                    ? 'bg-orange-500/20 border-orange-500 text-orange-500'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {condition}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Days per Week */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-400">Days per Week</label>
            <span className="text-sm text-orange-500">{daysPerWeek}</span>
          </div>
          <Slider
            min={1}
            max={7}
            step={1}
            value={[daysPerWeek]}
            onValueChange={([val]) => setDaysPerWeek(val)}
            className="[&_.slider-range]:bg-orange-500 [&_.slider-thumb]:border-orange-500"
          />
        </div>

        {/* Session Duration */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-400">Session Duration (minutes)</label>
            <span className="text-sm text-orange-500">{sessionDuration}</span>
          </div>
          <Slider
            min={15}
            max={120}
            step={5}
            value={[sessionDuration]}
            onValueChange={([val]) => setSessionDuration(val)}
            className="[&_.slider-range]:bg-orange-500 [&_.slider-thumb]:border-orange-500"
          />
        </div>

        {/* Plan Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Plan Duration (weeks)</label>
          <input
            type="number"
            min={1}
            value={planDuration}
            onChange={e => setPlanDuration(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <motion.button
            type="button"
            onClick={handleCreateRoutine}
            disabled={!goal || !preferences}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2.5 rounded-lg font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 ${
              (!goal || !preferences) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Generate Plan
          </motion.button>
        </div>
      </div>
    </DialogContent>
    )
  }
