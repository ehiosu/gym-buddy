// contexts/WorkoutContext.tsx
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

interface Exercise {
  name: string
  duration: string
  equipment: string
  sets: string
  repetitions: string
}

interface ExerciseGif {
  gifUrl: string
  id: string
  // ... other GIF properties from your API
}

interface WorkoutState {
  currentExercise: Exercise | null
  currentExerciseIndex: number
  workoutId: string | null
  routine: Exercise[]
  isModalOpen: boolean
  timeElapsed: number
  isPaused: boolean
  isLoadingGifs: boolean
  gifError: string | null
  possibleGifs: ExerciseGif[]
}

interface WorkoutContextType {
  workoutState: WorkoutState
  startWorkout: (exercise: Exercise, workoutId: string, exerciseIndex: number, routine?: Exercise[]) => Promise<void>
  closeWorkout: () => void
  completeWorkout: () => void
  goToNextExercise: () => void
  togglePause: () => void
  resetTimer: () => void
  updateTimeElapsed: (time: number) => void
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workoutState, setWorkoutState] = useState<WorkoutState>({
    currentExercise: null,
    currentExerciseIndex: 0,
    workoutId: null,
    routine: [],
    isModalOpen: false,
    timeElapsed: 0,
    isPaused: false,
    isLoadingGifs: false,
    gifError: null,
    possibleGifs: []
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Save progress to localStorage
  const saveProgress = useCallback(() => {
    if (!workoutState.currentExercise || !workoutState.workoutId) return
    
    const workoutProgress = {
      workoutId: workoutState.workoutId,
      exerciseName: workoutState.currentExercise.name,
      exerciseIndex: workoutState.currentExerciseIndex,
      routine: workoutState.routine,
      timeElapsed: workoutState.timeElapsed,
      lastUpdated: Date.now()
    }
    localStorage.setItem('workoutProgress', JSON.stringify(workoutProgress))
  }, [workoutState])

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('workoutProgress')
    if (savedProgress) {
      // const progress = JSON.parse(savedProgress)
      // You might want to add additional checks here
      // to ensure the saved progress is still valid
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (!workoutState.isModalOpen || workoutState.isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setWorkoutState(prev => {
        const newTime = prev.timeElapsed + 1
        return { ...prev, timeElapsed: newTime }
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [workoutState.isModalOpen, workoutState.isPaused])

  // Auto-save every 5 seconds
  useEffect(() => {
    if (workoutState.isModalOpen) {
      const saveInterval = setInterval(saveProgress, 5000)
      return () => clearInterval(saveInterval)
    }
  }, [workoutState.isModalOpen, saveProgress])

  const fetchExerciseGifs = async (exerciseName: string) => {
    try {
      const response = await fetch(`https://your-gifs-api.com/exercises/name/${exerciseName}`)
      if (!response.ok) throw new Error('Failed to fetch GIFs')
      return await response.json()
    } catch (error) {
      console.error('Error fetching GIFs:', error)
      throw error
    }
  }

  const startWorkout = async (
    exercise: Exercise, 
    workoutId: string, 
    exerciseIndex: number,
    routine: Exercise[] = []
  ) => {
    setWorkoutState(prev => ({
      ...prev,
      isLoadingGifs: true,
      gifError: null
    }))

    try {
      const gifs = await fetchExerciseGifs(exercise.name)
      
      // Load saved progress if available
      const savedProgress = localStorage.getItem('workoutProgress')
      let initialTime = 0
      
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        if (progress.workoutId === workoutId && progress.exerciseName === exercise.name) {
          initialTime = progress.timeElapsed
        }
      }

      setWorkoutState({
        currentExercise: exercise,
        currentExerciseIndex: exerciseIndex,
        workoutId,
        routine: routine.length > 0 ? routine : [exercise],
        isModalOpen: true,
        timeElapsed: initialTime,
        isPaused: false,
        isLoadingGifs: false,
        gifError: null,
        possibleGifs: gifs
      })
    } catch  {
      setWorkoutState(prev => ({
        ...prev,
        isLoadingGifs: false,
        gifError: 'Failed to load exercise GIFs',
        isModalOpen: true,
        possibleGifs: [] // Empty array as fallback
      }))
    }
  }

  const closeWorkout = () => {
    saveProgress() // Save before closing
    setWorkoutState(prev => ({
      ...prev,
      isModalOpen: false,
      isPaused: true // Pause timer when closing
    }))
  }

  const completeWorkout = () => {
    // Mark exercise as completed and move to next
    // You might want to add your completion logic here
    goToNextExercise()
  }

  const goToNextExercise = () => {
    saveProgress()
    const nextIndex = workoutState.currentExerciseIndex + 1
    
    if (nextIndex < workoutState.routine.length) {
      // Move to next exercise
      startWorkout(
        workoutState.routine[nextIndex],
        workoutState.workoutId!,
        nextIndex
      )
    } else {
      // Workout complete
      localStorage.removeItem('workoutProgress')
      closeWorkout()
    }
  }

  const togglePause = () => {
    setWorkoutState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }))
  }

  const resetTimer = () => {
    setWorkoutState(prev => ({
      ...prev,
      timeElapsed: 0
    }))
  }

  const updateTimeElapsed = (time: number) => {
    setWorkoutState(prev => ({
      ...prev,
      timeElapsed: time
    }))
  }

  return (
    <WorkoutContext.Provider value={{
      workoutState,
      startWorkout,
      closeWorkout,
      completeWorkout,
      goToNextExercise,
      togglePause,
      resetTimer,
      updateTimeElapsed
    }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export const useWorkout = (): WorkoutContextType => {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
}