# "Failed to fetch" Error - Debugging Guide

## The Error

You're getting `Failed to fetch` when trying to login/signup. This is a browser network error that usually means one of these things:

## Quick Checklist:

### ✅ **1. Is your NestJS backend running?**

```bash
# In your NestJS project terminal, check if it's running
# Should see: "Server is running on port 5000"
```

If NOT running:

```bash
cd /path/to/your/nestjs/project
npm run start:dev
```

### ✅ **2. Check the correct API URL**

In your terminal, verify:

```bash
cat /home/localhost/Projects/websterwork/.env
# Should show: NEXT_PUBLIC_API_URL=http://localhost:5000
```

If not correct, fix it:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

### ✅ **3. Check CORS in NestJS**

Your NestJS backend must have CORS enabled:

```typescript
// main.ts (NestJS)
app.enableCors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

### ✅ **4. Restart Next.js dev server**

After changing `.env`:

```bash
# Kill the current server (Ctrl+C)
# Then restart
npm run dev
```

## How to Debug:

### **Open Browser DevTools (F12):**

1. **Console tab** - Look for console.log messages:

   - "Attempting login with: xxx"
   - "API URL: http://localhost:5000"
   - These will show the URL being used

2. **Network tab** - Try to login and check:

   - Do you see a POST request to `/api/auth/login`?
   - If YES: Click it and check Response
   - If NO: The fetch never even started (network error)

3. **Common Network Issues**:
   - **Red "OPTIONS /api/auth/login"** → CORS not configured
   - **No requests at all** → Backend not running or wrong URL
   - **CORS error in console** → Add credentials & CORS headers

### **Check Backend is Running:**

In another terminal:

```bash
# Try to reach backend directly
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Should get a response (either error or success), not "Connection refused"
```

## What to Share When Asking for Help:

When you get the error, please share:

1. **Console output** (F12 → Console):
   - Paste everything from "Attempting login..." onwards
2. **Network requests** (F12 → Network):
   - Show the failed request and its response
3. **NestJS backend logs**:
   - What does it show when you try to login?
4. **Your `.env` file**:

   ```bash
   cat /home/localhost/Projects/websterwork/.env
   ```

5. **Backend status**:
   ```bash
   # Is it running?
   ps aux | grep nest
   ```

## Step-by-Step Fix:

1. **Terminal 1** - Start NestJS backend:

   ```bash
   cd /path/to/nestjs
   npm run start:dev
   # Wait for: "Server is running on port 5000"
   ```

2. **Terminal 2** - Verify it's responding:

   ```bash
   curl http://localhost:5000/api/auth/token
   # Should get a response (with CSRF token)
   ```

3. **Terminal 3** - Start Next.js frontend:

   ```bash
   cd /path/to/websterwork
   npm run dev
   # Wait for: "Local: http://localhost:3000"
   ```

4. **Browser** - Open http://localhost:3000/login
   - Open DevTools (F12)
   - Check Console and Network tabs
   - Try to login
   - Let me know what you see!

## Most Common Cause:

❌ Backend is NOT running on port 5000

**Fix:** Make sure you see this in your NestJS terminal:

```
[Nest] ... Server is running on port 5000
```
