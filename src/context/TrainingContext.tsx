
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
type TrainingState = {
  completedLessons: string[];
  activeSection: string;
  activeModule: string;
  activeClass: string;
  activeView: string;
  loading: boolean;
};

type TrainingAction = 
  | { type: 'SET_COMPLETED_LESSONS'; payload: string[] }
  | { type: 'MARK_LESSON_COMPLETED'; payload: string }
  | { type: 'MARK_LESSON_INCOMPLETE'; payload: string }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_ACTIVE_MODULE'; payload: string }
  | { type: 'SET_ACTIVE_CLASS'; payload: string }
  | { type: 'SET_ACTIVE_VIEW'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: TrainingState = {
  completedLessons: [],
  activeSection: 'business-establishment',
  activeModule: 'module-1',
  activeClass: 'class-1',
  activeView: 'lessons',
  loading: false
};

// Reducer
function trainingReducer(state: TrainingState, action: TrainingAction): TrainingState {
  switch (action.type) {
    case 'SET_COMPLETED_LESSONS':
      return { ...state, completedLessons: action.payload };
    case 'MARK_LESSON_COMPLETED':
      return { 
        ...state, 
        completedLessons: [...state.completedLessons, action.payload] 
      };
    case 'MARK_LESSON_INCOMPLETE':
      return { 
        ...state, 
        completedLessons: state.completedLessons.filter(id => id !== action.payload) 
      };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'SET_ACTIVE_MODULE':
      return { ...state, activeModule: action.payload };
    case 'SET_ACTIVE_CLASS':
      return { ...state, activeClass: action.payload };
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

// Context
type TrainingContextType = {
  state: TrainingState;
  dispatch: React.Dispatch<TrainingAction>;
  markLessonCompleted: (section: string, module: string, classId: string) => void;
  isLessonCompleted: (section: string, module: string, classId: string) => boolean;
  setActiveSection: (section: string) => void;
  setActiveModule: (module: string) => void;
  setActiveClass: (classId: string) => void;
  setActiveView: (view: string) => void;
};

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

// Provider
export function TrainingProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(trainingReducer, initialState);

  // Load completed lessons from localStorage on mount
  useEffect(() => {
    const savedLessons = localStorage.getItem("completedLessons");
    if (savedLessons) {
      dispatch({ 
        type: 'SET_COMPLETED_LESSONS', 
        payload: JSON.parse(savedLessons) 
      });
    }
  }, []);

  // Save completed lessons to localStorage when they change
  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(state.completedLessons));
  }, [state.completedLessons]);

  // Helper functions
  const markLessonCompleted = (section: string, module: string, classId: string) => {
    const lessonKey = `${section}-${module}-${classId}`;
    
    if (state.completedLessons.includes(lessonKey)) {
      dispatch({ type: 'MARK_LESSON_INCOMPLETE', payload: lessonKey });
      toast({
        title: "Lesson marked as incomplete",
        description: `This lesson has been removed from your completed lessons.`
      });
    } else {
      dispatch({ type: 'MARK_LESSON_COMPLETED', payload: lessonKey });
      toast({
        title: "Lesson completed! 🎉",
        description: `This lesson has been marked as completed.`
      });
    }
  };

  const isLessonCompleted = (section: string, module: string, classId: string) => {
    const lessonKey = `${section}-${module}-${classId}`;
    return state.completedLessons.includes(lessonKey);
  };

  const setActiveSection = (section: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  };

  const setActiveModule = (module: string) => {
    dispatch({ type: 'SET_ACTIVE_MODULE', payload: module });
  };

  const setActiveClass = (classId: string) => {
    dispatch({ type: 'SET_ACTIVE_CLASS', payload: classId });
  };

  const setActiveView = (view: string) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  };

  return (
    <TrainingContext.Provider value={{ 
      state, 
      dispatch,
      markLessonCompleted,
      isLessonCompleted,
      setActiveSection,
      setActiveModule,
      setActiveClass,
      setActiveView
    }}>
      {children}
    </TrainingContext.Provider>
  );
}

// Hook
export function useTraining() {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
}
