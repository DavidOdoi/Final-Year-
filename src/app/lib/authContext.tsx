import React, { createContext, useContext, useState } from 'react';
import { apiRequest, clearStoredSession, getStoredUser, setStoredSession, type AuthUser } from './api';

export type UserRole = 'driver' | 'shipper';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  verified?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
  currentRole: UserRole | null;
}

interface AuthResponseData {
  token: string;
  user: AuthUser;
}

interface AuthSessionState {
  user: User | null;
  currentRole: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function normalizeRole(role?: string | null): UserRole | null {
  if (role === 'driver') {
    return 'driver';
  }

  if (role === 'trader' || role === 'shipper') {
    return 'shipper';
  }

  return null;
}

function toContextUser(rawUser: AuthUser): User {
  return {
    id: rawUser.id || rawUser.email,
    name: rawUser.name,
    email: rawUser.email,
    role: normalizeRole(rawUser.role) ?? 'shipper',
    phone: rawUser.phone,
  };
}

function getOtherRole(role: UserRole) {
  return role === 'driver' ? 'trader' : 'driver';
}

function getInitialAuthState(): AuthSessionState {
  const storedUser = getStoredUser('driver') ?? getStoredUser('trader') ?? getStoredUser();
  const normalizedRole = normalizeRole(storedUser?.role);

  if (!storedUser || !normalizedRole) {
    return {
      user: null,
      currentRole: null,
    };
  }

  return {
    user: toContextUser(storedUser),
    currentRole: normalizedRole,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSessionState>(() => getInitialAuthState());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, currentRole } = session;

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<AuthResponseData>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          role: role === 'driver' ? 'driver' : 'trader',
        }),
      });

      const authData = response.data;
      if (!authData?.token || !authData?.user) {
        throw new Error('Login failed');
      }

      const loggedInRole = normalizeRole(authData.user.role);
      if (!loggedInRole) {
        throw new Error('Unsupported account role');
      }

      if (loggedInRole !== role) {
        throw new Error(
          role === 'driver'
            ? 'This account belongs to a trader. Please use trader login.'
            : 'This account belongs to a driver. Please use driver login.',
        );
      }

      clearStoredSession(getOtherRole(role));
      setStoredSession(authData.user, authData.token);
      setSession({
        user: toContextUser(authData.user),
        currentRole: loggedInRole,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<AuthResponseData>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          role: role === 'driver' ? 'driver' : 'trader',
        }),
      });

      const authData = response.data;
      if (!authData?.token || !authData?.user) {
        throw new Error('Registration failed');
      }

      const registeredRole = normalizeRole(authData.user.role);
      if (!registeredRole) {
        throw new Error('Unsupported account role');
      }

      clearStoredSession('driver');
      clearStoredSession('trader');
      setSession({
        user: null,
        currentRole: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearStoredSession('driver');
    clearStoredSession('trader');
    setSession({
      user: null,
      currentRole: null,
    });
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    currentRole,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
