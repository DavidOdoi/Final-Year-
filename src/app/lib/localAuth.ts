/**
 * Local Authentication Module
 * 
 * This module provides a fallback authentication system that works without a backend.
 * It stores user credentials in localStorage and simulates authentication.
 * 
 * Use this for development/testing when no backend server is available.
 */

import type { AuthUser, UserRole } from './api';

const LOCAL_USERS_KEY = 'simba_local_users';
const LOCAL_SESSION_KEY = 'simba_local_session';

export interface LocalUser {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: UserRole;
  phone?: string;
  location?: string;
  pricePerKm?: number;
  createdAt: string;
}

export interface LocalSession {
  userId: string;
  token: string;
  role: UserRole;
  loggedInAt: string;
}

function generateId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateToken(): string {
  return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 20);
}

function getUsers(): LocalUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: LocalUser[]): void {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

function getSession(): LocalSession | null {
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: LocalSession | null): void {
  if (session) {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(LOCAL_SESSION_KEY);
  }
}

/**
 * Register a new user locally (without backend)
 */
export function localRegister(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  location?: string;
  pricePerKm?: number;
}): { user: AuthUser; token: string } {
  const users = getUsers();
  
  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }
  
  const newUser: LocalUser = {
    id: generateId(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password, // In production, this should be hashed
    role: data.role,
    phone: data.phone,
    location: data.location,
    pricePerKm: data.pricePerKm,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Auto-login after registration
  const token = generateToken();
  const session: LocalSession = {
    userId: newUser.id,
    token,
    role: newUser.role,
    loggedInAt: new Date().toISOString(),
  };
  saveSession(session);
  
  const authUser: AuthUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    phone: newUser.phone,
    location: newUser.location,
  };
  
  return { user: authUser, token };
}

/**
 * Login a user locally (without backend)
 */
export function localLogin(email: string, password: string, requestedRole: UserRole): { user: AuthUser; token: string } {
  const users = getUsers();
  
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('No account found with this email address.');
  }
  
  if (user.password !== password) {
    throw new Error('Incorrect password.');
  }
  
  // Check role compatibility
  const userRole: UserRole = user.role === 'driver' ? 'driver' : 'shipper';
  if (userRole !== requestedRole) {
    throw new Error(
      requestedRole === 'driver'
        ? 'This account belongs to a trader. Please use trader login.'
        : 'This account belongs to a driver. Please use driver login.'
    );
  }
  
  const token = generateToken();
  const session: LocalSession = {
    userId: user.id,
    token,
    role: userRole,
    loggedInAt: new Date().toISOString(),
  };
  saveSession(session);
  
  const authUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: userRole,
    phone: user.phone,
    location: user.location,
  };
  
  return { user: authUser, token };
}

/**
 * Logout the current user
 */
export function localLogout(): void {
  saveSession(null);
}

/**
 * Check if a user is currently logged in locally
 */
export function isLocallyLoggedIn(): boolean {
  return getSession() !== null;
}

/**
 * Get the current local session
 */
export function getLocalSession(): LocalSession | null {
  return getSession();
}

/**
 * Get the current logged-in user from local storage
 */
export function getLocalUser(): AuthUser | null {
  const session = getSession();
  if (!session) return null;
  
  const users = getUsers();
  const user = users.find(u => u.id === session.userId);
  
  if (!user) return null;
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === 'driver' ? 'driver' : 'shipper',
    phone: user.phone,
    location: user.location,
  };
}

/**
 * Check if local auth is being used (no backend)
 * Local auth is ONLY enabled when explicitly set via VITE_USE_LOCAL_AUTH=true
 * Having a backend URL (even localhost) means we should use the backend
 */
export function isLocalAuthEnabled(): boolean {
  return import.meta.env.VITE_USE_LOCAL_AUTH === 'true';
}

/**
 * Clear all local auth data
 */
export function clearLocalAuth(): void {
  localStorage.removeItem(LOCAL_USERS_KEY);
  localStorage.removeItem(LOCAL_SESSION_KEY);
}

/**
 * Get all registered local users (for debugging)
 */
export function getAllLocalUsers(): Omit<LocalUser, 'password'>[] {
  const users = getUsers();
  return users.map(({ password, ...rest }) => rest);
}