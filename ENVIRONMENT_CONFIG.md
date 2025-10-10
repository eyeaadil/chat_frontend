# Environment Configuration Guide

## Overview
The application now automatically detects whether it's running in development (localhost) or production and uses the appropriate backend URLs.

## How It Works

### Automatic Detection
The app checks `window.location.hostname`:
- **Development**: `localhost` or `127.0.0.1` → Uses `http://localhost:5000`
- **Production**: Any other domain → Uses `https://chatapp-backend-1-2k8y.onrender.com`

### Configuration File
All environment settings are centralized in `/src/config/environment.js`:

```javascript
{
  apiUrl: "http://localhost:5000" (dev) or production URL,
  socketUrl: "http://localhost:5000" (dev) or production URL,
  isDevelopment: true/false,
  isProduction: true/false
}
```

## Files Updated

1. **`src/context/SocketContext.jsx`**
   - Now uses `config.socketUrl` from environment config
   - Automatically connects to correct socket server based on environment
   - Logs the socket URL to console for debugging

2. **`src/config/environment.js`** (NEW)
   - Centralized configuration for all environment-based URLs
   - Can be imported anywhere in the app

3. **`.env.example`**
   - Added `VITE_SOCKET_URL` option for manual override

## Usage

### Development (Default)
Just run your app normally:
```bash
npm run dev
```

The app will automatically use:
- API: `http://localhost:5000`
- Socket: `http://localhost:5000`

### Production (Default)
When deployed to Vercel or any production domain, it will automatically use:
- API: `https://chatapp-backend-1-2k8y.onrender.com`
- Socket: `https://chatapp-backend-1-2k8y.onrender.com`

### Manual Override (Optional)
Create a `.env.local` file to override defaults:

```env
VITE_SOCKET_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000
```

Or for a different backend:
```env
VITE_SOCKET_URL=http://localhost:8080
VITE_API_URL=http://localhost:8080
```

## Vercel Environment Variables

For production deployment on Vercel, you can set environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_SOCKET_URL` = `https://chatapp-backend-1-2k8y.onrender.com`
   - `VITE_API_URL` = `https://chatapp-backend-1-2k8y.onrender.com`

## Testing

### Check Socket Connection
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for: `"Connecting to socket: http://localhost:5000"` (dev) or production URL
4. Check Network tab → WS (WebSocket) to see active socket connection

### Verify Environment
Add this to any component to check current config:
```javascript
import config from '../config/environment';
console.log('Current config:', config);
```

## Troubleshooting

### Socket not connecting in development
- Make sure your backend is running on `http://localhost:5000`
- Check console for "Connecting to socket:" message
- Verify the URL is correct

### Socket not connecting in production
- Check Vercel environment variables
- Verify backend URL is accessible
- Check CORS settings on backend

### Using a different port
If your backend runs on a different port (e.g., 8080):
1. Create `.env.local`:
   ```env
   VITE_SOCKET_URL=http://localhost:8080
   VITE_API_URL=http://localhost:8080
   ```
2. Update `vite.config.js` proxy target to match

## Benefits

✅ **No manual switching** - Automatically detects environment
✅ **Centralized config** - All URLs in one place
✅ **Easy override** - Use `.env.local` for custom settings
✅ **Production ready** - Works seamlessly on Vercel
✅ **Debugging friendly** - Logs socket URL to console
