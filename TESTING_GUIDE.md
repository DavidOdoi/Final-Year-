# Quick Start: Testing Role Separation

## What Changed?
- Shipper and driver logins are now completely separate
- Each has its own database/storage space
- Logging in as one role automatically clears the other
- Cannot accidentally access the wrong dashboard

---

## How to Test

### Test 1: Verify Storage Separation

**Step 1:** Open your app in browser and open DevTools (F12)

**Step 2:** Go to Console → Application → Local Storage

**Step 3:** Driver Login
- Click "Join as Driver" on homepage
- Login with any email/password (min 6 chars)
- Check Local Storage → you should see:
  ```
  ✅ simba_driver_auth_token: token_xxxxx
  ✅ simba_driver_auth_user: {"id":"driver_xxxxx",...}
  ❌ simba_shipper_auth_token: (should NOT exist)
  ❌ simba_shipper_auth_user: (should NOT exist)
  ```

**Step 4:** Shipper Login (without logging out)
- Click "Start Shipping" on homepage
- Register/Login as shipper
- Check Local Storage → you should now see:
  ```
  ❌ simba_driver_auth_token: (should be CLEARED)
  ❌ simba_driver_auth_user: (should be CLEARED)
  ✅ simba_shipper_auth_token: token_xxxxx
  ✅ simba_shipper_auth_user: {"id":"driver_xxxxx",...}
  ```

**Result:** ✅ Storage is properly isolated per role

---

### Test 2: Prevent Cross-Role Dashboard Access

**Step 1:** Login as driver
- Homepage → "Join as Driver" → Login
- You land on `/driver-dashboard` ✅

**Step 2:** Try to access shipper dashboard directly
- Manually type URL: `localhost:5173/trader-dashboard`
- You should be **redirected to `/driver-dashboard`** ✅
- Check browser console for warning message

**Step 3:** Logout and login as shipper
- Logout
- Homepage → "Start Shipping" → Register/Login
- You land on `/trader-dashboard` ✅

**Step 4:** Try to access driver dashboard directly
- Manually type URL: `localhost:5173/driver-dashboard`
- You should be **redirected to `/trader-dashboard`** ✅
- Check browser console for warning message

**Result:** ✅ Cross-role access is prevented

---

### Test 3: Dashboard Data Isolation

**Step 1:** Login as driver
- Go to `/driver-dashboard`
- View "Available Loads" and "My Trips"
- These should show DRIVER-specific data ✅

**Step 2:** Open Network tab (DevTools → Network)
- Check API calls
- Should see requests like: `/api/v1/loads?status=open` and `/api/v1/loads?assigned=me`
- Response should contain driver loads ✅

**Step 3:** Logout and login as shipper
- Go to `/trader-dashboard`
- View "Recent Shipments"
- These should show SHIPPER-specific data ✅

**Step 4:** Open Network tab again
- Check API calls
- Should see requests like: `/api/v1/loads?mine=true`
- Response should contain shipper loads ✅

**Result:** ✅ Each role sees only their own data

---

### Test 4: Session Persistence on Reload

**Step 1:** Login as driver
- Wait for page to fully load
- Refresh page with F5
- You should STAY logged in as driver ✅
- Dashboard loads with your data ✅

**Step 2:** Logout and login as shipper
- Perform logout
- Refresh page with F5
- You should see login page (not logged in) ✅

**Step 3:** Login as shipper
- Complete login
- Refresh page with F5
- You should STAY logged in as shipper ✅
- Dashboard loads with your data ✅

**Result:** ✅ Sessions persist correctly per role

---

### Test 5: Console Warnings

**Step 1:** Login as driver

**Step 2:** Manually visit `/trader-dashboard`

**Step 3:** Open DevTools → Console

**Expected to see:**
```
⚠️  User example@email.com with role driver attempted to access trader dashboard
```

**Result:** ✅ Warnings are logged for debugging

---

## Expected Behavior Summary

| Action | Expected Result |
|--------|-----------------|
| Driver login | Only driver keys in storage |
| Shipper login (after driver) | Driver keys cleared, shipper keys added |
| Access wrong dashboard | Redirected to correct dashboard |
| Logout | All role-specific keys cleared |
| Refresh page | Session persists correctly |
| API calls | Receive only role-appropriate data |

---

## Troubleshooting

### Issue: Redirected to login instead of dashboard
**Check:**
- Verify email/password are at least 6 characters
- Check browser console for errors
- Clear localStorage manually and try again

### Issue: Still seeing both roles' data in localStorage
**Check:**
- Hard refresh browser (Ctrl+Shift+R)
- Clear application cache
- Check that authContext is properly clearing old role

### Issue: Console warnings not appearing
**Check:**
- Verify ProtectedRoute is rendering correctly
- Check that requiredRole prop is set on routes
- Verify currentRole is being set in auth context

### Issue: Data loading forever
**Check:**
- Verify backend is running at `VITE_BACKEND_URL`
- Check Network tab for failed requests
- Verify token format is correct in localStorage

---

## Browser DevTools Debugging

### View Storage:
```
DevTools → Application → Local Storage → Select your app URL
```

### Monitor Auth Changes:
```
DevTools → Console → Paste:
localStorage.addEventListener('change', (e) => {
  console.log('Storage changed:', e);
});
```

### Check Current User:
```
DevTools → Console → Paste:
JSON.parse(localStorage.getItem('simba_driver_auth_user'))
JSON.parse(localStorage.getItem('simba_shipper_auth_user'))
```

---

## Success Criteria

You've successfully implemented role separation when:

- ✅ Driver and shipper never share the same localStorage keys
- ✅ Logging in as one role clears the other's session
- ✅ Users can't access the wrong role's dashboard
- ✅ Each dashboard shows only their role's data
- ✅ Console logs warn about cross-role access attempts
- ✅ Sessions persist correctly on page refresh
- ✅ Logout properly clears role-specific data

---

## Next Steps

1. **Test all scenarios** using the tests above
2. **Monitor console** for any errors or warnings
3. **Check Network tab** to verify API calls match role
4. **Test on mobile** to ensure responsive behavior
5. **Report any issues** found during testing

---

## Questions or Issues?

1. Check `IMPLEMENTATION_SUMMARY.md` for code changes
2. Review `SHIPPER_DRIVER_SEPARATION_GUIDE.md` for architecture details
3. Check browser console for error messages
4. Verify backend is returning role-appropriate data

Happy testing! 🚀
