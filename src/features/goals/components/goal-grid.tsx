import { useQuery } from "convex/react";

import {
    ChartAreaIcon,
  DropletIcon,
  DumbbellIcon,
  FootprintsIcon,
  MoonIcon,
  PencilIcon,
  PlusCircleIcon,
  ScaleIcon,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useModalStore from "@/features/store/modalStore";
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
  const goalTypes = [
    {
      id: "weight",
      name: "Weight",
      unit: "kg",
      icon: <ScaleIcon className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "sessions",
      name: "Weekly Sessions",
      unit: "sessions",
      icon: <DumbbellIcon className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "water",
      name: "Water Intake",
      unit: "L",
      icon: <DropletIcon className="w-5 h-5" />,
      color: "bg-cyan-100 text-cyan-800",
    },
    {
      id: "sleep",
      name: "Sleep",
      unit: "hours",
      icon: <MoonIcon className="w-5 h-5" />,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "steps",
      name: "Daily Steps",
      unit: "steps",
      icon: <FootprintsIcon className="w-5 h-5" />,
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between max-w-[100dvw]" >
        <h2 className="text-xl font-bold">Your Goals</h2>
        <button
          onClick={() => setModalType("create-goal")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <PlusCircleIcon className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="flex overflow-x-auto scrollbar-thin-minimal max-w-[100dvw]  -mx-1 px-4 pb-10 lg:px-1 gap-3 ">
        
        {trackableGoals.map((goal) => {
          if (!goals?.activeGoals.includes(goal.id)) return null;

          const goalData = goals[goal.id as keyof typeof goals] as
            | { initial: number; current: number; target: number }
            | undefined;
          const progress =
            goalData?.current && goalData?.target
              ? Math.min(
                  Math.round(
                    ((goalData.current - goalData.initial) / goalData.target) *
                      100
                  )
                )
              : 0;

          return (
            <div
              key={goal.id}
              className="bg-white rounded-lg shadow-sm p-4  flex-shrink-0 w-92  full border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`${goal.color} p-2 rounded-lg`}>
                  {goal.icon}
                </div>
                <button
                  onClick={() => setModalType("add-goal-record")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-semibold mt-3">{goal.name}</h3>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${goal.color.split(" ")[0]}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Current</p>
                  <p className="font-medium">
                    {goalData?.current || "--"} {goal.unit}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Target</p>
                  <p className="font-medium">
                    {goalData?.target || "--"} {goal.unit}
                  </p>
                </div>
              </div>
              <button
                 onClick={() => setModalType("add-goal-record")}
                className="mt-3 w-full text-sm py-1.5 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
              >
                + Add Today's Record
              </button>
            </div>
          );
        })}
        {visualGoals.map((goal) => {
          if (!goals?.activeGoals.includes(goal.id)) return null;

          const goalData = goals[goal.id as keyof typeof goals] as
            | { initial: number; current: number; target: number }
            | undefined;
          const progress =
            goalData?.current && goalData?.target
              ? Math.min(
                  Math.round(
                    ((goalData.current - goalData.initial) / goalData.target) *
                      100
                  )
                )
              : 0;

          return (
            <div
              key={goal.id}
              className="bg-white rounded-lg shadow-sm p-4  flex-shrink-0 w-92  max-w-full border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`${goal.color} p-2 rounded-lg`}>
                  {goal.icon}
                </div>
                <button
                  onClick={() => setModalType("add-goal-record")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-semibold mt-3">{goal.name}</h3>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${goal.color.split(" ")[0]}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Current</p>
                  <p className="font-medium">
                    {goalData?.current || "--"} {goal.unit}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Target</p>
                  <p className="font-medium">
                    {goalData?.target || "--"} {goal.unit}
                  </p>
                </div>
              </div>
            
            </div>
          );
        })}

        {/* Add New Goal Card
              <div 
                  onClick={() => setModalType("create-goal")}
                  className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[180px]"
              >
                  <PlusCircleIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-600">Create Goal</span>
              </div> */}
      </div>
    </div>
  );
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
