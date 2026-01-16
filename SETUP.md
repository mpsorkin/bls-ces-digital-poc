# Setup Instructions

## Quick Start (3-Day Build Timeline)

### Day 1: Backend Setup & Core API
- ✅ Set up C# .NET Web API project
- ✅ Create data models matching BLS-790 form
- ✅ Implement CRUD endpoints
- ✅ Set up database with Entity Framework

### Day 2: Frontend Development
- ✅ Create React application with Vite
- ✅ Build digital CES form component
- ✅ Implement dashboard with charts
- ✅ Connect frontend to backend API

### Day 3: Polish & Documentation
- ✅ Add data aggregation and analytics
- ✅ Improve UI/UX
- ✅ Write documentation
- ✅ Test end-to-end functionality

## Detailed Setup Steps

### 1. Backend Setup

```bash
# Navigate to backend
cd backend/BLS.CES.API

# Restore NuGet packages
dotnet restore

# Build the project
dotnet build

# Run the API (default port: 5000 or 5001)
dotnet run
```

**Verify Backend:**
- Open `http://localhost:5000/swagger` to see API documentation
- Test endpoints using Swagger UI

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Verify Frontend:**
- Open `http://localhost:3000`
- You should see the dashboard

### 3. Testing the System

1. **Submit a Test Survey:**
   - Navigate to "Submit Survey"
   - Fill out the form with sample data
   - Submit and verify success message

2. **View Dashboard:**
   - Check aggregated statistics
   - View charts and visualizations

3. **View Submissions:**
   - Navigate to "View Submissions"
   - Filter and browse submitted data

## Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Change port in Properties/launchSettings.json or
# Set environment variable:
export ASPNETCORE_URLS="http://localhost:5001"
```

**Database Issues:**
- Delete `ces_data.db` file to reset database
- The database will be recreated on next run

### Frontend Issues

**CORS Errors:**
- Ensure backend CORS is configured in `Program.cs`
- Check that API URL matches in `vite.config.js`

**API Connection Issues:**
- Verify backend is running on port 5000
- Check browser console for errors
- Verify API base URL in `src/services/api.js`

## Production Deployment Considerations

### Backend
- Use PostgreSQL or SQL Server instead of SQLite
- Configure proper connection strings
- Set up HTTPS
- Add authentication middleware
- Configure CORS for production domain

### Frontend
- Build for production: `npm run build`
- Serve static files from a web server
- Configure environment variables
- Set up CDN for assets

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **API Testing**: Use Swagger UI for quick API testing
3. **Database**: SQLite database file is created automatically in the backend directory
4. **Logs**: Check console output for both frontend and backend

## Next Steps for Production

1. Add user authentication (JWT tokens)
2. Implement role-based access control
3. Add email notification system
4. Set up automated backups
5. Add comprehensive error logging
6. Implement rate limiting
7. Add data export features (CSV, Excel, PDF)
8. Set up monitoring and analytics

