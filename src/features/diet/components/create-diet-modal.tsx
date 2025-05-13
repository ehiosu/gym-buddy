"use client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/features/auth/hooks/use-get-current-user";
import useModalStore from "@/features/store/modalStore";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateDiet } from "../hooks/use-create-diet";
import {motion} from "framer-motion"
interface DietFormData {
  goal: string;
  activityLevel: string;
  preferences: string[];
}

export const CreateDietModal = () => {
  const { modalType, setModalType } = useModalStore();
  const [customPreference, setCustomPreference] = useState<string>('');
  const createNewDiet = useCreateDiet();
  const [formData, setFormData] = useState<DietFormData>({
    goal: '',
    activityLevel: '',
    preferences: []
  });
  const updateField = (field: keyof DietFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePreference = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };
const {user} =useCurrentUser();
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(createNewDiet({diet:{
        goal:formData.goal,
        daily_activity_level:formData.activityLevel,
        dietary_restrictions:formData.preferences,
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
     <DialogContent className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
      <div className="border-b border-gray-800 pb-4 mb-4">
        <h2 className="text-lg font-semibold text-white">Create Diet Plan</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Diet Goal
          </label>
          <input
            type="text"
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Example: 'Lose 5kg in 3 months'"
            value={formData.goal}
            onChange={(e) => updateField("goal", e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Examples: &quot;Lose weight&quot;, &quot;Gain muscle&quot;, &quot;Maintain current weight&quot;
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Dietary Preferences
            <span className="text-xs text-gray-500 ml-1">(Select multiple)</span>
          </label>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              "Nigerian food", "No meat", "High protein", "Asian food",
              "Low carb", "Dairy-free", "Gluten-free", "Pescatarian",
              "High fiber", "Mediterranean"
            ].map((pref) => (
              <motion.button
                key={pref}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs px-3 py-1.5 border rounded-full transition-colors ${
                  formData.preferences.includes(pref)
                    ? 'bg-orange-500/20 border-orange-500 text-orange-500'
                    : 'border-gray-700 hover:bg-gray-800 text-gray-300'
                }`}
                onClick={() => togglePreference(pref)}
              >
                {pref}
              </motion.button>
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
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {customPreference && (
              <button
                type="button"
                onClick={() => {
                  togglePreference(customPreference.trim());
                  setCustomPreference('');
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                <PlusCircleIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {formData.preferences.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Selected:</p>
              <div className="flex flex-wrap gap-2">
                {formData.preferences.map((pref) => (
                  <motion.div 
                    key={pref} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300"
                  >
                    {pref}
                    <button 
                      onClick={() => togglePreference(pref)}
                      className="text-gray-400 hover:text-orange-500"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Activity Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["Low", "Moderate", "High"].map((level) => (
              <motion.button
                key={level}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateField("activityLevel", level)}
                className={`p-2 border rounded-lg transition-colors ${
                  formData.activityLevel === level
                    ? 'border-orange-500 bg-orange-500/20 text-orange-500'
                    : 'border-gray-700 hover:bg-gray-800 text-gray-300'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
        >
          Generate Plan
        </motion.button>
      </form>
    </DialogContent>
    </Dialog>
  );
};
