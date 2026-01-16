# Quick Start Guide

Get the BLS CES Digital Survey System running in 5 minutes!

## Prerequisites Check

Make sure you have:
- ✅ .NET 8.0 SDK installed (`dotnet --version` should show 8.x)
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)

## Step 1: Start Backend (Terminal 1)

```bash
cd backend/BLS.CES.API
dotnet restore
dotnet run
```

Wait for: `Now listening on: http://localhost:5000`

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Wait for: `Local: http://localhost:3000`

## Step 3: Open in Browser

1. Open `http://localhost:3000`
2. You should see the dashboard with sample data
3. Click "Submit Survey" to test the form
4. Click "View Submissions" to see all data

## Verify Everything Works

✅ **Backend API**: Visit `http://localhost:5000/swagger` - you should see API documentation

✅ **Frontend**: Visit `http://localhost:3000` - you should see the dashboard

✅ **Test Form**: 
   - Go to "Submit Survey"
   - Fill out the form
   - Submit and verify success message

✅ **Dashboard**: 
   - Should show metrics
   - Charts should display data
   - Sample data from 6 businesses should be visible

## Troubleshooting

**Backend won't start:**
- Check if port 5000 is available
- Make sure .NET 8.0 SDK is installed
- Try: `dotnet clean` then `dotnet build`

**Frontend won't start:**
- Make sure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check that port 3000 is available

**No data showing:**
- Sample data is seeded automatically on first run
- If you deleted the database, restart the backend to reseed

**CORS errors:**
- Make sure backend is running on port 5000
- Check browser console for specific error messages

## Next Steps

- Read `README.md` for full documentation
- Check `PROJECT_PLAN.md` for architecture details
- Review `SETUP.md` for detailed setup instructions

## Demo Tips

For your US Tech Force application:

1. **Show the Form**: Demonstrate the digital form matching BLS-790 structure
2. **Show Dashboard**: Highlight real-time analytics and aggregation
3. **Show Code**: Point out clean architecture and best practices
4. **Explain Benefits**: Digital transformation, efficiency gains, real-time insights

Good luck with your application! 🚀

