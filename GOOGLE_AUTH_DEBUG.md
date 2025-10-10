# Google OAuth Debugging Guide

## Current Issue
After successful Google authentication, the app is not redirecting to the home page.

## Debugging Steps

### 1. Check Browser Console
When you click "Login with Google" and complete the authentication:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for these messages:
   - "Processing Google OAuth callback..."
   - "Google authentication successful, redirecting to home..."
   - OR any error messages

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Click "Login with Google"
3. After Google authentication, check:
   - What URL did Google redirect you to? (Should be `http://localhost:3000/auth/google/callback`)
   - Are there any query parameters in the URL? (e.g., `?token=...` or `?error=...`)
   - What API calls are being made?
   - Look for a call to `/api/auth/google/success` - did it succeed (200) or fail (404/500)?

### 3. Check Backend Response
The issue is likely that the frontend is trying to fetch user data from an endpoint that doesn't exist on your backend.

**You need to tell me: What endpoint should the frontend call to get user data after Google OAuth?**

Common options:
- `/api/auth/google/success`
- `/api/auth/me`
- `/api/auth/user`
- `/api/users/me`

### 4. Check Backend Redirect
After Google authenticates the user, your backend should:
1. Create a session/JWT token
2. Redirect to: `http://localhost:3000/auth/google/callback`
3. Either:
   - Include user data in query params: `?user=...&token=...`
   - OR set a cookie/session that the frontend can use to fetch user data

## Quick Fix Options

### Option 1: If backend sends user data in URL
If your backend redirects like this:
```
http://localhost:3000/auth/google/callback?user={...}&token={...}
```

The current code should handle it (lines 30-41 in `useGoogleAuth.js`).

### Option 2: If backend has a different endpoint
Update line 45 in `/src/hooks/useGoogleAuth.js`:

```javascript
const res = await fetch("/api/auth/YOUR_ENDPOINT_HERE", {
    method: "GET",
    credentials: "include",
});
```

Replace `YOUR_ENDPOINT_HERE` with the actual endpoint.

### Option 3: If backend sets cookies and you need to check session
Some backends just set a cookie and you need to verify the session. In that case, you might need to call the same endpoint as regular login uses.

## Testing Commands

1. **Start backend:**
   ```bash
   # Navigate to your backend directory and start it
   # Make sure it's running on http://localhost:5000
   ```

2. **Start frontend:**
   ```bash
   npm run dev
   ```

3. **Test the flow:**
   - Go to http://localhost:3000/login
   - Click "Login with Google"
   - Complete Google authentication
   - Check console for logs
   - Check if you're redirected to home page

## Common Issues

### Issue: "Failed to get user data from backend"
**Cause:** The endpoint `/api/auth/google/success` doesn't exist
**Fix:** Update the endpoint in `useGoogleAuth.js` to match your backend

### Issue: CORS error
**Cause:** Backend not allowing credentials from frontend
**Fix:** Backend needs to set CORS headers:
```javascript
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
```

### Issue: Redirect works but user data not set
**Cause:** The response format doesn't match what frontend expects
**Fix:** Check the response format and adjust the code accordingly

## Next Steps

Please check your backend code and tell me:
1. What endpoint returns user data after Google OAuth?
2. Does it send user data in URL params or via an API call?
3. What does the response look like?

Then I can update the frontend code to match your backend implementation.
