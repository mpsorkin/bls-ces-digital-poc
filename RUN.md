# How to Run the BLS CES Digital Survey System

Follow these steps to run the project on your computer.

## Step-by-Step Instructions

### Step 1: Open Two Terminal Windows

You'll need two terminal windows - one for the backend and one for the frontend.

**Windows:**
- Press `Win + R`, type `cmd`, press Enter (for first terminal)
- Press `Win + R`, type `cmd`, press Enter again (for second terminal)

**Or use PowerShell:**
- Right-click Start menu → Windows PowerShell
- Open a second PowerShell window

### Step 2: Start the Backend (Terminal 1)

1. Navigate to the backend folder:
   ```bash
   cd C:\Users\mps62\bls-ces-digital\backend\BLS.CES.API
   ```

2. Restore packages (first time only):
   ```bash
   dotnet restore
   ```

3. Run the backend:
   ```bash
   dotnet run
   ```

4. **Wait for this message:**
   ```
   Now listening on: http://localhost:5000
   ```

5. **Keep this terminal open!** The backend must stay running.

6. **Optional:** Open `http://localhost:5000/swagger` in your browser to see the API documentation.

### Step 3: Start the Frontend (Terminal 2)

1. Navigate to the frontend folder:
   ```bash
   cd C:\Users\mps62\bls-ces-digital\frontend
   ```

2. Install dependencies (first time only - this may take a few minutes):
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

4. **Wait for this message:**
   ```
   Local:   http://localhost:3000
   ```

5. **Keep this terminal open!** The frontend must stay running.

### Step 4: Open in Your Browser

1. Open your web browser (Chrome, Edge, Firefox, etc.)

2. Go to: **http://localhost:3000**

3. You should see the **Dashboard** with sample data!

## What You Should See

### Dashboard (Home Page)
- Key metrics cards showing:
  - Total Submissions
  - Total Employees
  - Employment Change
  - Average Hourly Earnings
- Charts showing:
  - Employment by Industry
  - Employment by State
  - Average Hourly Earnings
  - Industry Distribution

### Submit Survey Page
- Click "Submit Survey" in the navigation
- Fill out the form with test data
- Submit and see success message

### View Submissions Page
- Click "View Submissions" in the navigation
- See all submitted surveys
- Filter by period, industry, or state

## Troubleshooting

### Problem: "dotnet: command not found"
**Solution:** Install .NET 8.0 SDK from https://dotnet.microsoft.com/download/dotnet/8.0

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/ (get the LTS version)

### Problem: Port 5000 already in use
**Solution:** 
- Close any other applications using port 5000
- Or change the port in `backend/BLS.CES.API/Properties/launchSettings.json`

### Problem: Port 3000 already in use
**Solution:**
- Close any other applications using port 3000
- Or the frontend will automatically use a different port (check the terminal output)

### Problem: "Cannot connect to API"
**Solution:**
- Make sure the backend is running (check Terminal 1)
- Make sure backend shows "Now listening on: http://localhost:5000"
- Check browser console (F12) for error messages

### Problem: No data showing on dashboard
**Solution:**
- Sample data is automatically created on first backend run
- If you see empty dashboard, try:
  1. Stop the backend (Ctrl+C in Terminal 1)
  2. Delete the file `backend/BLS.CES.API/ces_data.db` (if it exists)
  3. Restart the backend - it will recreate the database with sample data

### Problem: CORS errors in browser console
**Solution:**
- Make sure backend is running on port 5000
- Make sure frontend is trying to connect to `http://localhost:5000`
- Check that CORS is enabled in `backend/BLS.CES.API/Program.cs`

## Stopping the Application

1. **Stop Frontend:** In Terminal 2, press `Ctrl + C`
2. **Stop Backend:** In Terminal 1, press `Ctrl + C`

## Quick Test

After starting both servers:

1. ✅ Backend running: Visit `http://localhost:5000/swagger` - should see API docs
2. ✅ Frontend running: Visit `http://localhost:3000` - should see dashboard
3. ✅ Submit a test form: Fill out and submit - should see success
4. ✅ View submissions: Should see your new submission in the list

## Need Help?

- Check the browser console (F12 → Console tab) for errors
- Check both terminal windows for error messages
- Make sure both servers are running simultaneously
- Verify you're using the correct URLs (localhost:5000 for API, localhost:3000 for frontend)

