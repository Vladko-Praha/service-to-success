
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
export interface UserSettings {
  apiKey: string;
  theme: 'light' | 'dark' | 'system';
  preferredModel: string;
  notifications: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
  militaryBranch?: string;
  yearsOfService?: number;
  businessInterests?: string[];
}

interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  profile: UserProfile | null;
  settings: UserSettings;
}

type UserAction = 
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'LOGOUT' };

// Initial state
const initialState: UserState = {
  isAuthenticated: false,
  loading: true,
  profile: null,
  settings: {
    apiKey: '',
    theme: 'system',
    preferredModel: 'gpt-4o-mini',
    notifications: true,
  }
};

// Reducer
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, profile: action.payload, isAuthenticated: true };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'UPDATE_SETTINGS':
      return { 
        ...state, 
        settings: { ...state.settings, ...action.payload } 
      };
    case 'UPDATE_PROFILE':
      return { 
        ...state, 
        profile: state.profile ? { ...state.profile, ...action.payload } : null 
      };
    case 'LOGOUT':
      return { 
        ...initialState, 
        loading: false,
        settings: { ...state.settings, apiKey: '' } // Keep settings except API key
      };
    default:
      return state;
  }
}

// Context
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  isInstructor: () => boolean;
  isAdmin: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch({ 
          type: 'UPDATE_SETTINGS', 
          payload: parsedSettings 
        });
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    }
    
    // Mock user authentication check
    const mockAuthCheck = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // In a real app, this would be a call to your auth service
      setTimeout(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            dispatch({ type: 'SET_USER', payload: parsedUser });
          } catch (error) {
            console.error("Error parsing saved user:", error);
          }
        }
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 500);
    };
    
    mockAuthCheck();
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(state.settings));
  }, [state.settings]);

  // Save user to localStorage when they change
  useEffect(() => {
    if (state.profile) {
      localStorage.setItem("currentUser", JSON.stringify(state.profile));
    }
  }, [state.profile]);

  // Helper functions
  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Mock authentication
      // In a real app, this would call your auth API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.email) {
        const mockUser: UserProfile = {
          id: '1',
          name: 'John Doe',
          email: credentials.email,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          role: credentials.email.includes('admin') ? 'admin' : 'student',
          militaryBranch: 'Army',
          yearsOfService: 8,
          businessInterests: ['E-commerce', 'Consulting']
        };
        
        dispatch({ type: 'SET_USER', payload: mockUser });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}!`
        });
        
        dispatch({ type: 'SET_LOADING', payload: false });
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login failed",
        description: "There was an error logging in. Please try again later.",
        variant: "destructive"
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem("currentUser");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  const updateProfile = (profileData: Partial<UserProfile>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully."
    });
  };

  const isInstructor = () => {
    return state.profile?.role === 'instructor' || state.profile?.role === 'admin';
  };

  const isAdmin = () => {
    return state.profile?.role === 'admin';
  };

  return (
    <UserContext.Provider value={{ 
      state, 
      dispatch,
      login,
      logout,
      updateProfile,
      updateSettings,
      isInstructor,
      isAdmin
    }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
