"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            setIsOpen(false),
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
        <DialogContent className="bg-white text-black border border-gray-300 rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-black">Create Routine</DialogTitle>
          <DialogDescription className="text-gray-600">
            Create a new routine by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Label className="mb-1 block">Routine Name</Label>
          <Input
            value={name}
            required
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Summer body loadingg"
            className="bg-white border border-gray-300 text-black placeholder-gray-400"
          />
          <p className="text-sm text-gray-500 mt-1">What's the name of your super awesome routine?</p>
        </div>
        {/* Goal */}
        <div className="mt-4">
          <Label className="mb-1 block">Goal</Label>
          <Input
            value={goal}
            required
            onChange={e => setGoal(e.target.value)}
            placeholder="e.g. Build muscle, lose fat, improve cardio"
            className="bg-white border border-gray-300 text-black placeholder-gray-400"
          />
          <p className="text-sm text-gray-500 mt-1">State your primary fitness goal clearly.</p>
        </div>
  
        {/* Fitness Level */}
        <div className="mt-4">
          <Label className="mb-1 block">Fitness Level</Label>
          <div className="flex gap-2">
            {levels.map(l => (
              <Button
                key={l}
                variant="outline"
                onClick={() => setFitnessLevel(l)}
                className={`rounded-md text-sm px-4 py-2 border ${
                  fitnessLevel === l ? "bg-black text-white" : "text-black border-gray-300"
                }`}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>
  
        {/* Preferences */}
        <div className="mt-4">
          <Label className="mb-1 block">Training Preferences</Label>
          <Input
            value={preferences}
            onChange={e => setPreferences(e.target.value)}
            placeholder="e.g. Home training, bodyweight, cardio, weights"
            className="bg-white border border-gray-300 text-black placeholder-gray-400"
          />
          <p className="text-sm text-gray-500 mt-1">List any training styles or equipment you prefer.</p>
        </div>
  
        {/* Health Conditions */}
        <div className="mt-4">
          <Label className="mb-1 block">Health Conditions</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {conditions.map(c => (
              <Button
                key={c}
                variant="outline"
                className={`rounded-full text-sm px-4 py-1 border ${
                  healthConditions.includes(c) ? "bg-black text-white" : "text-black border-gray-300"
                }`}
                onClick={() => toggleSelect(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
  
        {/* Days per Week */}
        <div className="mt-6">
          <Label className="mb-2 block">Days per Week: {daysPerWeek}</Label>
          <Slider
            min={1}
            max={7}
            step={1}
            defaultValue={[daysPerWeek]}
            onValueChange={([val]) => setDaysPerWeek(val)}
            className="text-black"
          />
        </div>
  
        {/* Session Duration */}
        <div className="mt-4">
          <Label className="mb-2 block">Session Duration (minutes): {sessionDuration}</Label>
          <Slider
            min={15}
            max={120}
            step={5}
            defaultValue={[sessionDuration]}
            onValueChange={([val]) => setSessionDuration(val)}
            className="text-black"
          />
        </div>
  
        {/* Plan Duration */}
        <div className="mt-4">
          <Label className="mb-1 block">Plan Duration (weeks)</Label>
          <Input
            type="number"
            min={1}
            value={planDuration}
            onChange={e => setPlanDuration(Number(e.target.value))}
            className="bg-white border border-gray-300 text-black"
          />
        </div>
  
        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <Button onClick={()=>{handleCreateRoutine()}} disabled={!goal || !preferences} className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-md">
            Generate Plan
          </Button>
        </div>
      </DialogContent>
    )
  }
