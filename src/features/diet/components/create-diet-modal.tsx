"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/features/auth/hooks/use-get-current-user";
import useModalStore from "@/features/store/modalStore";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateDiet } from "../hooks/use-create-diet";

export const CreateDietModal = () => {
  const { modalType, setModalType } = useModalStore();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [customPreference, setCustomPreference] = useState<string>('');
  const createNewDiet = useCreateDiet();
  const [formData,setFormData] = useState<{
    goal: string;
    activityLevel: string;
  }>({
    goal: "",
    activityLevel: "",
  });
const togglePreference = (pref: string) => {

  setSelectedPreferences(prev => 
    prev.includes(pref)
      ? prev.filter(p => p !== pref)
      : [...prev, pref]
  );
};
const updateField = (field: keyof typeof formData, value: string) => {
    console.log({field,value})
    setFormData((prev)=>({...prev,[field]:value}))
};
const {user} =useCurrentUser();
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(createNewDiet({diet:{
        goal:formData.goal,
        daily_activity_level:formData.activityLevel,
        dietary_restrictions:selectedPreferences,
        lang:"en",
        current_weight:user?.currentWeight||0,
        target_weight:user?.targetWeight||0,

    }}),{
        loading:"Generating diet plan...",
        success:()=>{
            setModalType(null);
            return "Diet plan generated successfully!";
        },
        error:(error)=>{
            console.log(error)
            return "Error generating diet plan";
        }
    })
}
  return (
    <Dialog
      open={modalType === "create-diet"}
      onOpenChange={(open) => {
        if (!open) setModalType(null);
      }}
    >
      <DialogContent className="bg-white rounded-lg max-w-md">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="text-lg font-semibold">
            Create Diet Plan
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1"> {/* Reduced spacing */}
  <label className="text-sm font-medium text-gray-700">
    Diet Goal
  </label>
  
  <input
    type="text"
    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-900 outline-none"
    placeholder="Example: 'Lose 5kg in 3 months'"
    value={formData.goal}
    onChange={(e) => updateField("goal", e.target.value)}
  />
  
  <p className="text-xs text-gray-500">
    Examples: "Lose weight", "Gain muscle", "Maintain current weight", "Train for marathon"
  </p>
</div>

          <div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Dietary Preferences
    <span className="text-xs text-gray-400 ml-1">(Select multiple)</span>
  </label>
  
  <div className="flex flex-wrap gap-2 mb-2">
    {[
      "Nigerian food",
      "No meat",
      "High protein",  
      "Asian food",
      "Low carb",
      "Dairy-free",
      "Gluten-free",
      "Pescatarian",
      "High fiber",
      "Mediterranean"
    ].map((pref) => (
      <button
        key={pref}
        type="button"
        className={`text-xs px-3 py-1.5 border rounded-full transition-colors ${
          selectedPreferences.includes(pref)
            ? 'bg-gray-900 text-white border-gray-900'
            : 'border-gray-200 hover:bg-gray-50'
        }`}
        onClick={() => togglePreference(pref)}
      >
        {pref}
      </button>
    ))}
  </div>
  
  <div className="relative">
    <input
      type="text"
      placeholder="Add custom preference (e.g. 'no pork')"
      value={customPreference}
      onChange={(e) => setCustomPreference(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && customPreference.trim()) {
          togglePreference(customPreference.trim());
          setCustomPreference('');
        }
      }}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-900 outline-none"
    />
    {customPreference && (
      <button
        type="button"
        onClick={() => {
          togglePreference(customPreference.trim());
          setCustomPreference('');
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <PlusCircleIcon className="w-5 h-5" />
      </button>
    )}
  </div>
  
  {/* Selected tags display */}
  {selectedPreferences.length > 0 && (
    <div className="mt-3">
      <p className="text-xs text-gray-500 mb-1">Selected:</p>
      <div className="flex flex-wrap gap-2">
        {selectedPreferences.map((pref) => (
          <div 
            key={pref} 
            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs"
          >
            {pref}
            <button 
              onClick={() => togglePreference(pref)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Activity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Moderate", "High"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => updateField("activityLevel", level)}
                  className={`${formData.activityLevel===level?"border-purple-400 bg-black text-white":"border-gray-200 hover:bg-gray-50" } text-sm p-2 border  rounded-md transition-colors duration-300`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Generate Plan
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
