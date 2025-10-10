# Google OAuth Integration Setup

## Overview
Google OAuth authentication has been successfully integrated into your ChatApp frontend. Users can now login and signup using their Google accounts.

## What Was Added

### 1. **useGoogleAuth Hook** (`src/hooks/useGoogleAuth.js`)
- Handles Google OAuth flow
- `loginWithGoogle()`: Redirects to backend Google OAuth endpoint (`/api/auth/google`)
- `handleGoogleCallback()`: Fetches user data after successful OAuth authentication

### 2. **GoogleAuthButton Component** (`src/componenets/GoogleAuthButton.jsx`)
- Reusable button component with Google icon
- Styled to match your existing UI theme
- Can be customized with different text

### 3. **GoogleCallback Page** (`src/pages/auth/GoogleCallback.jsx`)
- Handles the OAuth callback after Google authentication
- Shows a loading screen while processing authentication
- Redirects to home page on success, login page on failure

### 4. **Updated Pages**
- **Login Page**: Added "Login with Google" button with OR divider
- **SignUp Page**: Added "Sign up with Google" button with OR divider

### 5. **Updated Routes** (`src/App.jsx`)
- Added route: `/auth/google/callback` for handling OAuth callback

## How It Works

### Authentication Flow:
1. User clicks "Login with Google" or "Sign up with Google"
2. Frontend redirects to: `http://localhost:5000/api/auth/google`
3. Backend handles Google OAuth and redirects back to: `http://localhost:3000/auth/google/callback`
4. Frontend fetches user data from `/api/auth/me`
5. User data is stored in localStorage and AuthContext
6. User is redirected to the home page

## Configuration

### Development (localhost:5000)
The `vite.config.js` is configured to proxy `/api` requests to `http://localhost:5000`:

```javascript
proxy: {
  "/api": {
    target: "http://localhost:5000",
    changeOrigin: true,
    secure: false,
  },
}
```

### Production (Vercel)
The `vercel.json` is configured to proxy API requests to your production backend:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://chatapp-backend-1-2k8y.onrender.com/api/:path*"
    }
  ]
}
```

## Backend Requirements

Your backend must have the following endpoints:

1. **`GET /api/auth/google`**
   - Initiates Google OAuth flow
   - Redirects to Google for authentication
   - After Google auth, redirects back to frontend callback URL

2. **`GET /api/auth/me`** (or similar)
   - Returns authenticated user data
   - Must include credentials/cookies
   - Response format should match your existing auth structure

## Testing

### Local Development:
1. Start your backend server on `http://localhost:5000`
2. Start your frontend: `npm run dev` (runs on `http://localhost:3000`)
3. Click "Login with Google" button
4. Complete Google authentication
5. You should be redirected back and logged in

### Important Notes:
- Make sure your backend Google OAuth callback URL is set to redirect to: `http://localhost:3000/auth/google/callback` (for development)
- For production, the callback should be: `https://your-frontend-domain.vercel.app/auth/google/callback`
- Ensure CORS is properly configured on your backend to accept requests from your frontend domain
- The backend should set HTTP-only cookies or return user data that can be stored in localStorage

## Environment Variables (Optional)

You can create a `.env.local` file to customize the API URL:

```env
VITE_API_URL=http://localhost:5000
```

For production deployment, set this in your Vercel environment variables.

## Troubleshooting

### Issue: Redirect loop or authentication fails
- Check that your backend is correctly setting cookies/session
- Verify CORS settings allow credentials
- Ensure the `/api/auth/me` endpoint returns the correct user data format

### Issue: "Failed to initiate Google login"
- Verify your backend is running on the correct port
- Check the proxy configuration in `vite.config.js`
- Ensure the `/api/auth/google` endpoint is accessible

### Issue: Callback page shows error
- Check browser console for detailed error messages
- Verify the `/api/auth/me` endpoint is working
- Ensure cookies are being sent with credentials: "include"

## Next Steps

If you need to customize the authentication flow further, you can:
1. Modify the `useGoogleAuth` hook to handle different response formats
2. Update the `GoogleCallback` page to show more detailed error messages
3. Add additional OAuth providers (Facebook, GitHub, etc.) using the same pattern
