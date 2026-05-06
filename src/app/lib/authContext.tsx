import React, { createContext, useCallback, useContext, useState } from 'react';
import { apiRequest, clearStoredSession, getStoredUser, setStoredSession, type AuthUser } from './api';
import { localRegister as localRegisterFn, localLogin as localLoginFn, localLogout, getLocalUser, isLocalAuthEnabled } from './localAuth';

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
  register: (name: string, email: string, password: string, role: UserRole, additionalData?: {
    phone?: string;
    location?: string;
    pricePerKm?: number;
    companyName?: string;
    businessType?: string;
    tradingVolume?: string;
  }) => Promise<void>;
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
  // First check if we're using local auth (no backend)
  if (isLocalAuthEnabled()) {
    const localUser = getLocalUser();
    if (localUser) {
      const normalizedRole = normalizeRole(localUser.role);
      if (normalizedRole) {
        return {
          user: toContextUser(localUser),
          currentRole: normalizedRole,
        };
      }
    }
  }

  // Check trader/shipper first to prioritize shipper/trader sessions over driver sessions
  // This ensures that when a user logs in as a trader, they don't get an old driver session
  const storedUser = getStoredUser('trader') ?? getStoredUser('driver') ?? getStoredUser();
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
      // Try local auth first if enabled
      if (isLocalAuthEnabled()) {
        try {
          const { user, token } = localLoginFn(email, password, role);
          clearStoredSession('driver');
          clearStoredSession('trader');
          setStoredSession(user, token);
          const loggedInRole = normalizeRole(user.role);
          if (loggedInRole) {
            setSession({
              user: toContextUser(user),
              currentRole: loggedInRole,
            });
            setIsLoading(false);
            return;
          }
        } catch (localErr) {
          // If local auth fails, throw the error
          throw localErr;
        }
      }

      // Try backend auth
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

      // Clear ALL sessions first to prevent stale sessions from being loaded
      clearStoredSession('driver');
      clearStoredSession('trader');
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

  const register = async (name: string, email: string, password: string, role: UserRole, additionalData?: {
    phone?: string;
    location?: string;
    pricePerKm?: number;
    companyName?: string;
    businessType?: string;
    tradingVolume?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Try local auth first if enabled
      if (isLocalAuthEnabled()) {
        try {
          const { user, token } = localRegisterFn({
            name,
            email,
            password,
            role,
            phone: additionalData?.phone,
            location: additionalData?.location,
            pricePerKm: additionalData?.pricePerKm,
          });
          clearStoredSession('driver');
          clearStoredSession('trader');
          setStoredSession(user, token);
          const registeredRole = normalizeRole(user.role);
          if (registeredRole) {
            setSession({
              user: toContextUser(user),
              currentRole: registeredRole,
            });
            setIsLoading(false);
            return;
          }
        } catch (localErr) {
          // If local auth fails, throw the error
          throw localErr;
        }
      }

      // Try backend auth
      const requestBody = role === 'driver' 
        ? { name, email, password, role: 'driver', ...additionalData }
        : { name, email, password, role: 'trader', ...additionalData };

      const response = await apiRequest<AuthResponseData>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      const authData = response.data;
      if (!authData?.token || !authData?.user) {
        throw new Error('Registration failed');
      }

      const registeredRole = normalizeRole(authData.user.role);
      if (!registeredRole) {
        throw new Error('Unsupported account role');
      }

      // Clear any existing sessions
      clearStoredSession('driver');
      clearStoredSession('trader');
      
      // Set the new session and auto-login the user
      setStoredSession(authData.user, authData.token);
      setSession({
        user: toContextUser(authData.user),
        currentRole: registeredRole,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    if (isLocalAuthEnabled()) {
      localLogout();
    }
    clearStoredSession('driver');
    clearStoredSession('trader');
    setSession({ user: null, currentRole: null });
    setError(null);
  }, []);

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
