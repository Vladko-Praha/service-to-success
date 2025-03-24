
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type TrainingState = {
  completedLessons: string[];
  currentSection: string;
  currentModule: string;
  currentClass: string;
  currentView: string;
  loading: boolean;
};

type TrainingAction = 
  | { type: 'SET_SECTION'; payload: string }
  | { type: 'SET_MODULE'; payload: string }
  | { type: 'SET_CLASS'; payload: string }
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'MARK_LESSON_COMPLETE'; payload: string }
  | { type: 'MARK_LESSON_INCOMPLETE'; payload: string }
  | { type: 'LOAD_COMPLETED_LESSONS'; payload: string[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: TrainingState = {
  completedLessons: [],
  currentSection: "business-establishment",
  currentModule: "module-1",
  currentClass: "class-1",
  currentView: "lessons",
  loading: false
};

function trainingReducer(state: TrainingState, action: TrainingAction): TrainingState {
  switch (action.type) {
    case 'SET_SECTION':
      return { ...state, currentSection: action.payload };
    case 'SET_MODULE':
      return { ...state, currentModule: action.payload };
    case 'SET_CLASS':
      return { ...state, currentClass: action.payload };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'MARK_LESSON_COMPLETE':
      return { 
        ...state, 
        completedLessons: [...state.completedLessons, action.payload]
      };
    case 'MARK_LESSON_INCOMPLETE':
      return { 
        ...state, 
        completedLessons: state.completedLessons.filter(id => id !== action.payload)
      };
    case 'LOAD_COMPLETED_LESSONS':
      return {
        ...state,
        completedLessons: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}

const TrainingContext = createContext<{
  state: TrainingState;
  dispatch: React.Dispatch<TrainingAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(trainingReducer, initialState);
  
  // Load completed lessons from localStorage on initial render
  React.useEffect(() => {
    const savedLessons = localStorage.getItem("completedLessons");
    if (savedLessons) {
      dispatch({ 
        type: 'LOAD_COMPLETED_LESSONS', 
        payload: JSON.parse(savedLessons) 
      });
    }
  }, []);
  
  // Save completed lessons to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(state.completedLessons));
  }, [state.completedLessons]);
  
  return (
    <TrainingContext.Provider value={{ state, dispatch }}>
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
}
