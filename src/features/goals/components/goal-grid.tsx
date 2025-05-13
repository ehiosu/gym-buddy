import { useQuery } from "convex/react";
import {motion} from "framer-motion"
import {
  DropletIcon,
  DumbbellIcon,
  Edit2,
  FootprintsIcon,
  MoonIcon,
  Plus,
  ScaleIcon,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useModalStore from "@/features/store/modalStore";
import { Doc } from "../../../../convex/_generated/dataModel";


const trackableGoals = [
    { id: 'weight', name: 'Weight', unit: 'kg', icon: <ScaleIcon />,color: "bg-blue-100 text-blue-800", },
    { id: 'water', name: 'Water', unit: 'L', icon: <DropletIcon /> ,
        color: "bg-cyan-100 text-cyan-800"},
    { id: 'steps', name: 'Steps', unit: '', icon: <FootprintsIcon />,
        color: "bg-green-100 text-green-800" }
  ];

  const visualGoals = [
    { id: 'sleep', name: 'Sleep', unit: 'hrs', icon: <MoonIcon /> ,
        color: "bg-indigo-100 text-indigo-800"},
    {
        id: "sessions",
        name: "Weekly Sessions",
        unit: "sessions",
        icon: <DumbbellIcon className="w-5 h-5" />,
        color: "bg-purple-100 text-purple-800",
      },
  ];
export function GoalsGrid() {
  const goals = useQuery(api.goals.getUsersGoals);
  const { setModalType } = useModalStore();

  console.log({ goals });
  // Available goal types with color accents
  // const goalTypes = [
  //   {
  //     id: "weight",
  //     name: "Weight",
  //     unit: "kg",
  //     icon: <ScaleIcon className="w-5 h-5" />,
  //     color: "bg-blue-100 text-blue-800",
  //   },
  //   {
  //     id: "sessions",
  //     name: "Weekly Sessions",
  //     unit: "sessions",
  //     icon: <DumbbellIcon className="w-5 h-5" />,
  //     color: "bg-purple-100 text-purple-800",
  //   },
  //   {
  //     id: "water",
  //     name: "Water Intake",
  //     unit: "L",
  //     icon: <DropletIcon className="w-5 h-5" />,
  //     color: "bg-cyan-100 text-cyan-800",
  //   },
  //   {
  //     id: "sleep",
  //     name: "Sleep",
  //     unit: "hours",
  //     icon: <MoonIcon className="w-5 h-5" />,
  //     color: "bg-indigo-100 text-indigo-800",
  //   },
  //   {
  //     id: "steps",
  //     name: "Daily Steps",
  //     unit: "steps",
  //     icon: <FootprintsIcon className="w-5 h-5" />,
  //     color: "bg-green-100 text-green-800",
  //   },
  // ];

 return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Goals</h2>
        <button
          onClick={() => setModalType("create-goal")}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="flex overflow-x-auto  gap-4 scrollbar-thin py-4">
        {[...trackableGoals, ...visualGoals].map((goal) => {
          if (!goals?.activeGoals.includes(goal.id)) return null
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          const goalData = goals[goal.id as keyof Doc<"goals">] as {initial:number,current:number,target:number}
          const progress = goalData && goalData.target 
            ? Math.min(Math.round(((goalData.current - goalData.initial) / (goalData.target - goalData.initial)) * 100), 100)
            : 0

          return (
            <motion.div
              key={goal.id}
              whileHover={{ y: -5 }}
              className="flex-shrink-0 w-64 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500/30 p-4 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`${goal.color} p-2 rounded-lg text-lg`}>
                  {goal.icon}
                </div>
                <button
                  onClick={() => setModalType("add-goal-record")}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-semibold mt-3 text-white">{goal.name}</h3>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-medium text-white">{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${goal.color.split(' ')[0]}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-gray-400">Current</p>
                  <p className="font-medium text-white">
                    {goalData?.current || '--'} {goal.unit}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Target</p>
                  <p className="font-medium text-white">
                    {goalData?.target || '--'} {goal.unit}
                  </p>
                </div>
              </div>

              {trackableGoals.some(g => g.id === goal.id) && (
                <button
                  onClick={() => setModalType("add-goal-record")}
                  className="mt-4 w-full text-sm py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 text-white transition-colors"
                >
                  + Add Today&apos;s Record
                </button>
              )}
            </motion.div>
          )
        })}

        {/* Add New Goal Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModalType("create-goal")}
          className="flex-shrink-0 w-64 min-h-60  flex flex-col items-center justify-center bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 hover:border-orange-500 cursor-pointer transition-colors"
        >
          <div className="p-3 rounded-full bg-gray-700 text-gray-400 mb-3">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-gray-400">Create New Goal</span>
        </motion.div>
      </div>
    </div>
  )
}

//   function GoalEditForm({ current, target, unit, onSave, onCancel }) {
//     const [values, setValues] = useState({
//       current: current || '',
//       target: target || ''
//     });

//     return (
//       <div className="space-y-3">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Current {unit}</label>
//           <input
//             type="number"
//             value={values.current}
//             onChange={(e) => setValues({...values, current: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Target {unit}</label>
//           <input
//             type="number"
//             value={values.target}
//             onChange={(e) => setValues({...values, target: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => onSave(values.current, values.target)}
//             className="flex-1 bg-black text-white py-1 px-3 rounded text-sm"
//           >
//             Save
//           </button>
//           <button
//             onClick={onCancel}
//             className="flex-1 bg-gray-100 text-gray-800 py-1 px-3 rounded text-sm"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }
