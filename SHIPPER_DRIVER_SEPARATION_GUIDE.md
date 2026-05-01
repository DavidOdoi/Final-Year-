# Shipper & Driver Authentication Separation Guide

## Overview
This document describes the complete authentication separation between Shipper (Trader) and Driver roles in the ELOGISTICA application. The system now ensures complete isolation of sessions, storage, and data access.

---

## Architecture Changes

### 1. **Role-Specific Storage Keys** (`src/app/lib/api.ts`)

#### Storage Keys Breakdown:
```
Drivers:
- Token: simba_driver_auth_token
- User: simba_driver_auth_user

Shippers (Traders):
- Token: simba_shipper_auth_token
- User: simba_shipper_auth_user
```

#### New Functions in api.ts:
```typescript
- getAuthToken(role?: UserRole) // Pass 'driver' or 'trader'
- getStoredUser(role?: UserRole) // Pass 'driver' or 'trader'
- setStoredSession(user: AuthUser, token: string) // Automatically sets role-specific keys
- clearStoredSession(role?: UserRole) // Clears role-specific session
```

**Benefit**: Complete isolation prevents accidental data leakage between roles.

---

### 2. **Enhanced Authentication Context** (`src/app/lib/authContext.tsx`)

#### Key Changes:
- **Role Isolation**: When a user logs in as one role, the other role's session is automatically cleared
- **Current Role Tracking**: New `currentRole` field in `AuthContextType` for better tracking
- **Storage Keys**: Uses role-specific storage functions internally

#### Login/Registration Flow:
```
1. User initiates login with email, password, and ROLE
2. If another role session exists → CLEAR IT
3. Store credentials in role-specific localStorage keys
4. Set user and currentRole in context
5. Redirect to appropriate dashboard
```

#### Logout Flow:
```
1. Clear role-specific localStorage keys
2. Reset user and currentRole to null
3. Clear any error state
```

---

### 3. **Protected Routes Enhancement** (`src/app/lib/ProtectedRoute.tsx`)

#### Checks Performed:
1. **Authentication Check**: Redirects unauthenticated users to appropriate login page
2. **Role Validation**: Ensures user role matches required role
3. **Cross-Role Prevention**: If user tries to access wrong dashboard, redirects to their own
4. **Logging**: Attempts to access wrong dashboard are logged for debugging

---

### 4. **Dashboard Role Enforcement**

#### DriverDashboard (`src/app/pages/DriverDashboard.tsx`):
```typescript
const token = getAuthToken('driver');
const storedUser = getStoredUser('driver');
// Uses driver-specific storage keys
```

#### TraderDashboard (`src/app/pages/TraderDashboard.tsx`):
```typescript
const token = getAuthToken('trader');
const storedUser = getStoredUser('trader');
// Uses trader-specific storage keys
```

**Result**: Each dashboard only accesses its role's authentication data.

---

## User Flow Diagrams

### Driver Registration & Login:
```
LandingPage
    ↓
CTASection (Click "Join as Driver")
    ↓
/driver (DriverAccess page)
    ↓
Choose: Login or Register
    ├─→ /driver/login (DriverLogin) → /driver-dashboard
    └─→ /driver/register (DriverRegister) → /driver-dashboard
```

### Shipper Registration & Login:
```
LandingPage
    ↓
CTASection (Click "Start Shipping")
    ↓
/trader-register (TraderRegister)
    ↓
/trader-login (TraderLogin)
    ↓
/trader-dashboard
```

---

## Database Isolation Best Practices

### Frontend Implementation (Already Done):
- ✅ Separate localStorage keys per role
- ✅ Role-specific auth token management
- ✅ Role validation on dashboard access
- ✅ Automatic cross-role session clearing

### Backend Implementation (Recommended):
To fully implement role-based data separation on the backend:

```typescript
// Example: API middleware to enforce role isolation
app.use('/api/v1/loads', requireAuth, (req, res, next) => {
  const userRole = req.user.role; // 'driver' or 'trader'
  
  if (userRole === 'driver') {
    // Only show loads assigned to this driver
    req.query.assignedTo = req.user.id;
  } else if (userRole === 'trader') {
    // Only show loads posted by this trader
    req.query.postedBy = req.user.id;
  }
  
  next();
});
```

---

## Testing Checklist

### Authentication Separation:
- [ ] Driver can login and access only `/driver-dashboard`
- [ ] Shipper can login and access only `/trader-dashboard`
- [ ] Driver cannot access `/trader-dashboard` (redirects to driver dashboard)
- [ ] Shipper cannot access `/driver-dashboard` (redirects to trader dashboard)
- [ ] Logging in as driver clears shipper session data
- [ ] Logging in as shipper clears driver session data
- [ ] Logout clears role-specific session data

### Data Isolation:
- [ ] Driver dashboard shows only driver-related loads
- [ ] Shipper dashboard shows only shipper-posted loads
- [ ] No data leakage between roles in localStorage
- [ ] API requests include proper role validation

### Error Handling:
- [ ] Cross-role access attempts are logged
- [ ] Proper error messages for unauthorized access
- [ ] Graceful fallback to appropriate login page

---

## Migration Notes

### If Upgrading Existing Installations:

1. **Clear Old Storage**: Old sessions using `auth_token` and `auth_user` keys should be invalidated
2. **User Sessions**: Users will need to login again after upgrade
3. **Gradual Rollout**: Test in staging environment first

### Backward Compatibility:
- Legacy keys (`auth_token`, `auth_user`) are cleared on role logout for clean migration
- New code uses role-specific keys exclusively

---

## Troubleshooting

### Issue: Users redirected to wrong dashboard
**Solution**: Check `ProtectedRoute` logs. Ensure `requiredRole` prop matches user's actual role.

### Issue: Session cleared unexpectedly
**Solution**: Verify login flow is setting role correctly. Check `authContext.tsx` login function.

### Issue: Data showing from wrong role
**Solution**: Ensure dashboard uses correct role in `getStoredUser('role')` and `getAuthToken('role')` calls.

### Issue: Cross-role access not prevented
**Solution**: Verify `ProtectedRoute` component is properly wrapping dashboard routes.

---

## Code Examples

### Accessing Current User (Correct Way):
```typescript
// In DriverDashboard
const user = getStoredUser('driver'); // Gets ONLY driver user

// In TraderDashboard  
const user = getStoredUser('trader'); // Gets ONLY trader user
```

### Clearing Session (Correct Way):
```typescript
// When unauthorized error occurs
if (message.includes('Authentication required')) {
  clearStoredSession('driver'); // Clear driver session specifically
  navigate('/driver/login');
}
```

### Checking Authentication (Correct Way):
```typescript
const token = getAuthToken('driver');
const user = getStoredUser('driver');

if (!token || !user) {
  // Not authenticated as driver
  navigate('/driver/login');
}
```

---

## Future Enhancements

1. **Server-Side Session Management**: Replace localStorage with secure session cookies
2. **Role-Based API Routes**: Implement backend middleware for role enforcement
3. **Audit Logging**: Log all cross-role access attempts
4. **Token Expiration**: Add token refresh mechanism per role
5. **Concurrent Session Prevention**: Prevent user from being logged in as both roles simultaneously

---

## Support & Questions

For questions about this implementation:
1. Review the relevant source files listed above
2. Check the test cases in this guide
3. Examine the ProtectedRoute warnings in browser console
4. Debug using browser DevTools → Application → Local Storage
