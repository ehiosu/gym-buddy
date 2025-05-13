import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Pause,
  Play,
  SkipForward,
  RotateCcw,
  Clock,
  Activity,
  Loader2,
} from "lucide-react";

interface Exercise {
  name: string;
  duration: string;
  equipment: string;
  sets: string;
  repetitions: string;
}

interface ExerciseGif {
  gifUrl: string;
  id: string;
  bodyPart: string;
  target: string;
  instructions: string[];
}

interface WorkoutModalProps {
  exercise: Exercise;
  routine: Exercise[];
  currentExerciseIndex: number;
  isOpen: boolean;
  onComplete: () => void;
  onNext: () => void;
  onClose: () => void;
  initialTime?: number;
}

export function WorkoutModal({
  exercise,
  routine,
  currentExerciseIndex,
  isOpen,
  onComplete,
  onNext,
  onClose,
  initialTime = 0,
}: WorkoutModalProps) {
  const [selectedGifIndex, setSelectedGifIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoadingGifs, setIsLoadingGifs] = useState(false);
  const [gifError, setGifError] = useState<string | null>(null);
  const [possibleGifs, setPossibleGifs] = useState<ExerciseGif[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch GIFs when exercise changes
  useEffect(() => {
    if (!isOpen) return;

    const fetchExerciseGifs = async () => {
      setIsLoadingGifs(true);
      setGifError(null);
      try {
        const url = `https://exercisedb.p.rapidapi.com/exercises/name/${exercise.name.toLowerCase().replace("s","")}?offset=0&limit=10`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
          }
        };

        const response = await fetch(url,options);
        if (!response.ok) throw new Error("Failed to fetch GIFs");
        const gifs = await response.json();
        setPossibleGifs(gifs);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
        setGifError("Failed to load exercise GIFs");
      } finally {
        setIsLoadingGifs(false);
      }
    };

    fetchExerciseGifs();
    setSelectedGifIndex(0);
    setTimeElapsed(initialTime);
    setIsPaused(false);
  }, [exercise.name, isOpen, initialTime]);

  // Timer logic
  useEffect(() => {
    if (!isOpen || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGifChange = (direction: "prev" | "next") => {
    if (possibleGifs.length === 0) return;

    setSelectedGifIndex((prev) =>
      direction === "prev"
        ? prev === 0
          ? possibleGifs.length - 1
          : prev - 1
        : prev === possibleGifs.length - 1
          ? 0
          : prev + 1
    );
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const handleNext = () => {
    onNext();
  };

  // const handleClose = () => {
  //   onClose();
  // };

  if (!isOpen) return null;

  const currentGif = possibleGifs[selectedGifIndex];

  return (
    <div className="fixed inset-0 bg-gray-900/90 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2">
            {exercise.name}
            <span className="text-sm text-gray-400 ml-2">
              ({currentExerciseIndex + 1}/{routine.length})
            </span>
          </h3>

          {/* Loading State */}
          {isLoadingGifs && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="animate-spin text-orange-500 h-12 w-12 mb-4" />
              <p className="text-gray-400">Loading exercise GIFs...</p>
            </div>
          )}

          {/* Error State */}
          {gifError && (
            <div className="flex flex-col items-center justify-center h-64 text-red-400">
              <p>{gifError}</p>
              <p className="text-gray-400 text-sm mt-2">
                You can still continue your workout
              </p>
            </div>
          )}

          {/* GIF Display */}
          {!isLoadingGifs && possibleGifs.length > 0 && (
            <div className="relative mb-4">
              <img
                src={currentGif.gifUrl}
                alt={exercise.name}
                className="w-full h-64 object-contain rounded-lg aspect-video"
              />

              <div className="absolute inset-0 flex items-center justify-between px-2">
                <button
                  onClick={() => handleGifChange("prev")}
                  className="bg-gray-900/70 hover:bg-gray-900 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  &larr;
                </button>
                <button
                  onClick={() => handleGifChange("next")}
                  className="bg-gray-900/70 hover:bg-gray-900 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  &rarr;
                </button>
              </div>

              <div className="flex justify-center mt-2 space-x-1">
                {possibleGifs.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedGifIndex(index)}
                    className={`h-2 w-2 rounded-full ${index === selectedGifIndex ? "bg-orange-500" : "bg-gray-600"}`}
                  />
                ))}
              </div>
            </div>
          )}
          {
  !isLoadingGifs && possibleGifs.length === 0 && (
    <div className="flex flex-col items-center justify-center h-64 my-2.5 bg-gray-700/50 rounded-lg p-4">
      <div className="text-gray-400 text-center mb-4">
        <p className="text-lg font-medium">No GIFs available for this exercise</p>
        <p className="text-sm mt-1">We couldn&apos;t find visual demonstrations for <span className="text-orange-400">{exercise.name}</span></p>
      </div>
      
      <a 
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name.replaceAll(" ","+") + " beginner tutorial")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
        Search YouTube Tutorial
      </a>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        We&apos;ll open YouTube in a new tab where you can find proper form demonstrations
      </p>
    </div>
  )
}

          {/* Timer Display */}
          <div className="flex justify-center mb-4">
            <div className="text-4xl font-mono text-white">
              {formatTime(timeElapsed)}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>

            <button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Check size={20} />
            </button>

            <button
              onClick={handleNext}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={() => setTimeElapsed(0)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Exercise Info */}
        <div className="bg-gray-700/50 p-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-3 text-sm text-gray-300">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {exercise.duration}
            </div>
            <div className="flex items-center">
              <Activity className="mr-1 h-4 w-4" />
              {exercise.equipment}
            </div>
          </div>

          {/* Sets and reps */}
          <div className="mt-3 space-y-2">
            {Array.from({ length: parseInt(exercise.sets) }).map(
              (_, setIndex) => (
                <div key={setIndex} className="flex items-center">
                  <div className="w-10 text-sm font-medium text-gray-300">
                    Set {setIndex + 1}
                  </div>
                  <div className="ml-2 flex-1 h-8 bg-gray-600 rounded-md flex items-center px-3">
                    <span className="text-sm text-white">
                      {exercise.repetitions !== "N/A"
                        ? `${exercise.repetitions} reps`
                        : "---"}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
