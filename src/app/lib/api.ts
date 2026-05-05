if (!import.meta.env.VITE_API_URL) console.warn('VITE_API_URL is not set!');
export const BACKEND_URL = import.meta.env.VITE_API_URL || '';

export type UserRole = 'trader' | 'shipper' | 'driver' | 'admin' | 'customer' | 'staff';
export type PlatformRole = 'customer' | 'staff' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  companyName?: string;
  location?: string;
  businessType?: string;
  tradingVolume?: string;
  email: string;
  phone?: string;
  role: UserRole;
  platformRole?: PlatformRole;
  driverProfile?: string | null;
}

export interface Driver {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  truckTypes?: string[];
  maxWeight?: number;
  cargoTypes?: string[];
  specialCapabilities?: string[];
  languages?: string[];
  currentLocation?: string;
  currentLocationGeo?: {
    lat?: number;
    lng?: number;
  };
  homeBase?: string;
  preferredRoutes?: Array<{
    from?: string;
    to?: string;
  }>;
  pricePerKm?: number;
  rating?: number;
  experienceYears?: number;
  verified?: boolean;
  availability?: {
    status?: 'available' | 'busy' | 'off';
    from?: string;
    to?: string;
  };
  assignedTruck?: {
    _id?: string;
    plateNumber?: string;
    type?: string;
    status?: 'available' | 'in_use' | 'maintenance' | 'offline';
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Truck {
  _id: string;
  plateNumber: string;
  type: string;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance' | 'offline';
  currentLocation?: string;
  currentLocationGeo?: { lat?: number; lng?: number };
  currentShipment?: Load | string | null;
  assignedDriver?: Driver | string | null;
  insuranceExpiry?: string;
  serviceDueDate?: string;
  notes?: string;
  lastMovementAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Load {
  _id: string;
  trackingId?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  cargoType?: string;
  weight?: number;
  pickupGeo?: {
    lat?: number;
    lng?: number;
  };
  deliveryGeo?: {
    lat?: number;
    lng?: number;
  };
  price?: number;
  pickupDate?: string;
  contactName?: string;
  contactPhone?: string;
  loadType?: string;
  length?: number;
  width?: number;
  height?: number;
  quantity?: number;
  description?: string;
  pickupCity?: string;
  pickupTime?: string;
  deliveryCity?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryContact?: string;
  deliveryPhone?: string;
  truckType?: string;
  specialRequirements?: string[];
  budget?: number;
  notes?: string;
  assignedDriver?: Driver | null;
  postedBy?: AuthUser | null;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentAmount?: number;
  paymentRef?: string;
  status?: 'open' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  statusHistory?: Array<{
    status: 'open' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
    note?: string;
    location?: string;
    changedByRole?: string;
    timestamp?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface DriverMatch {
  driver: Driver;
  score: number;
  reasons?: string[];
  distanceKm?: number;
  durationMin?: number;
}

export interface Payment {
  _id: string;
  shipment?: Load | string;
  payer?: AuthUser | string;
  amount: number;
  currency?: string;
  method?: 'card' | 'mobile_money' | 'bank_transfer' | 'cash' | 'wallet';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  provider?: string;
  transactionId?: string;
  externalRef?: string;
  phoneNumber?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
  paidAt?: string;
  failedAt?: string;
  refundedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Role-specific storage keys to ensure complete separation
const DRIVER_AUTH_TOKEN_KEY = 'simba_driver_auth_token';
const DRIVER_AUTH_USER_KEY = 'simba_driver_auth_user';
const SHIPPER_AUTH_TOKEN_KEY = 'simba_shipper_auth_token';
const SHIPPER_AUTH_USER_KEY = 'simba_shipper_auth_user';

// Legacy keys for backward compatibility
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStoredUserFromKey(userKey: string) {
  try {
    const raw = window.localStorage.getItem(userKey);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch (error) {
    console.error('Unable to parse stored user', error);
    return null;
  }
}

function isRoleCompatible(requestedRole: UserRole, storedRole?: UserRole) {
  if (requestedRole === 'driver') {
    return storedRole === 'driver';
  }

  return storedRole === 'trader' || storedRole === 'shipper';
}

function getStorageKeys(role?: UserRole) {
  const isDriver = role === 'driver';
  return {
    tokenKey: isDriver ? DRIVER_AUTH_TOKEN_KEY : SHIPPER_AUTH_TOKEN_KEY,
    userKey: isDriver ? DRIVER_AUTH_USER_KEY : SHIPPER_AUTH_USER_KEY,
  };
}

export function getAuthToken(role?: UserRole) {
  if (!canUseStorage()) {
    return null;
  }

  if (role) {
    const { tokenKey } = getStorageKeys(role);
    return window.localStorage.getItem(tokenKey) ?? window.localStorage.getItem(AUTH_TOKEN_KEY);
  }

  return (
    window.localStorage.getItem(DRIVER_AUTH_TOKEN_KEY) ??
    window.localStorage.getItem(SHIPPER_AUTH_TOKEN_KEY) ??
    window.localStorage.getItem(AUTH_TOKEN_KEY)
  );
}

export function getStoredUser(role?: UserRole) {
  if (!canUseStorage()) {
    return null;
  }

  if (role) {
    const { userKey } = getStorageKeys(role);
    const storedUser = readStoredUserFromKey(userKey);
    if (storedUser && isRoleCompatible(role, storedUser.role)) {
      return storedUser;
    }

    const legacyUser = readStoredUserFromKey(AUTH_USER_KEY);
    if (legacyUser && isRoleCompatible(role, legacyUser.role)) {
      return legacyUser;
    }

    return null;
  }

  return (
    readStoredUserFromKey(DRIVER_AUTH_USER_KEY) ??
    readStoredUserFromKey(SHIPPER_AUTH_USER_KEY) ??
    readStoredUserFromKey(AUTH_USER_KEY)
  );
}

export function setStoredSession(user: AuthUser, token: string) {
  if (!canUseStorage()) {
    return;
  }

  const { userKey, tokenKey } = getStorageKeys(user.role);
  window.localStorage.setItem(userKey, JSON.stringify(user));
  window.localStorage.setItem(tokenKey, token);

  // Keep legacy keys in sync for older components that still read them directly.
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredSession(role?: UserRole) {
  if (!canUseStorage()) {
    return;
  }

  if (role) {
    const { userKey, tokenKey } = getStorageKeys(role);
    window.localStorage.removeItem(userKey);
    window.localStorage.removeItem(tokenKey);
  } else {
    window.localStorage.removeItem(DRIVER_AUTH_USER_KEY);
    window.localStorage.removeItem(DRIVER_AUTH_TOKEN_KEY);
    window.localStorage.removeItem(SHIPPER_AUTH_USER_KEY);
    window.localStorage.removeItem(SHIPPER_AUTH_TOKEN_KEY);
  }
  
  // Also clear legacy keys
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  options: { auth?: boolean } = {},
) {
  const headers = new Headers(init.headers ?? {});

  if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth) {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.message || `Request failed with status ${response.status}`);
  }

  return body as ApiResponse<T>;
}
