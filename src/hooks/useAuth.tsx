
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for local authentication
const MOCK_USERS_KEY = "grade-genius-users";
const CURRENT_USER_KEY = "grade-genius-current-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a logged-in user in localStorage
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const ensureUsersCollection = (): User[] => {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    if (users) return JSON.parse(users);
    return [];
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = ensureUsersCollection();
      const user = users.find(u => 
        u.email === email && 
        // Note: In a real app, you'd properly hash passwords
        // This is just for demo purposes
        btoa(password) === u.id.split('-')[1]
      );
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = ensureUsersCollection();
      
      // Check if email already exists
      if (users.some(user => user.email === email)) {
        throw new Error("Email already in use");
      }
      
      // Create a new user with a fake id
      const hashedPassword = btoa(password); // Again, not secure - just for demo
      const newUser: User = {
        id: `user-${hashedPassword}-${Date.now()}`,
        name,
        email
      };
      
      // Save to our mock "database"
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify([...users, newUser]));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    toast.info("You've been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
