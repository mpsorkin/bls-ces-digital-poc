# BLS CES Digital Survey System

A modern digital solution to replace paper-based BLS (Bureau of Labor Statistics) Current Employment Statistics (CES) surveys. This system provides a web-based form for businesses to submit employment data and a comprehensive dashboard for data aggregation and analysis.

## 🎯 Project Overview

This project demonstrates a digital transformation of the BLS-790 survey form, replacing inefficient paper-based processes with a modern web application. The system enables:

- **Digital Form Submission**: Businesses can submit CES survey data via a user-friendly web form
- **Real-time Analytics**: Dashboard with aggregated data, charts, and employment trend analysis
- **Data Management**: View, filter, and manage all survey submissions
- **Automated Aggregation**: Automatic calculation of employment changes, averages, and industry breakdowns

## 🏗️ Architecture

- **Frontend**: React 18 with Vite, React Router, and Recharts for data visualization
- **Backend**: C# .NET 8.0 Web API with Entity Framework Core
- **Database**: SQLite (easily upgradeable to PostgreSQL/SQL Server)
- **API**: RESTful API with Swagger documentation

## 📋 Features

### Digital CES Form
- Matches the structure of the official BLS-790 form
- Industry code selection (NAICS codes)
- Employment counts (total and nonsupervisory)
- Hours worked and earnings data
- Form validation and error handling
- Responsive design for mobile and desktop

### Analytics Dashboard
- Key metrics: Total submissions, employees, employment changes
- Employment trends by industry and state
- Average hourly earnings analysis
- Interactive charts and visualizations
- Month-over-month comparisons

### Data Management
- View all submissions with filtering
- Filter by period, industry, and state
- Pagination for large datasets
- Export capabilities (future enhancement)

## 🚀 Getting Started

### Prerequisites

- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** and npm - [Download](https://nodejs.org/)
- **Git** (for cloning the repository)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/BLS.CES.API
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the API:
```bash
dotnet run
```

The API will be available at `http://localhost:5000` (or the port shown in the console).

Swagger documentation is available at `http://localhost:5000/swagger` when running in development mode.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### Environment Configuration

Create a `.env` file in the frontend directory (optional):
```
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
bls-ces-digital/
├── backend/
│   └── BLS.CES.API/
│       ├── Controllers/        # API endpoints
│       ├── Models/             # Data models
│       ├── Services/           # Business logic
│       ├── Data/               # Database context
│       └── DTOs/              # Data transfer objects
├── frontend/
│   └── src/
│       ├── components/         # React components
│       ├── services/           # API client
│       └── App.jsx            # Main app component
└── README.md
```

## 🔌 API Endpoints

### Submissions
- `GET /api/submissions` - Get all submissions (with filtering)
- `GET /api/submissions/{id}` - Get a specific submission
- `POST /api/submissions` - Create a new submission
- `PUT /api/submissions/{id}` - Update a submission
- `DELETE /api/submissions/{id}` - Delete a submission

### Analytics
- `GET /api/analytics/aggregated` - Get aggregated data by period/industry/state
- `GET /api/analytics/dashboard` - Get dashboard statistics

## 📊 Data Model

The system collects the following data points matching the BLS-790 form:

- **Business Information**: Name, industry (NAICS), location
- **Reference Period**: Pay period that includes the 12th of the month
- **Employment**: Total employees, nonsupervisory employees
- **Hours**: Average weekly hours worked
- **Earnings**: Average hourly earnings, total payroll

## 🎨 Key Technologies

- **React**: Modern UI framework
- **C# .NET 8**: Enterprise-grade backend
- **Entity Framework Core**: ORM for database operations
- **SQLite**: Lightweight database (production-ready alternatives available)
- **Recharts**: Beautiful chart visualizations
- **Vite**: Fast build tool and dev server

## 🔒 Security & Compliance

- Data validation on both client and server
- CORS configuration for secure API access
- SQL injection protection via Entity Framework
- Confidentiality language matching BLS requirements
- Ready for authentication/authorization implementation

## 🚧 Future Enhancements

- Email submission capability
- PDF export of submissions
- User authentication and role-based access
- Advanced reporting and export features
- Integration with BLS systems
- Real-time notifications
- Data validation rules matching BLS standards
- Multi-pay group support enhancement

## 📝 Notes

This is a demonstration project created for US Tech Force application. It showcases:

- Modern full-stack development skills
- Understanding of government data collection processes
- Ability to transform legacy systems into modern digital solutions
- Clean code architecture and best practices

## 🤝 Contributing

This project is a portfolio demonstration. For production use, additional features would be needed:

- Authentication and authorization
- Audit logging
- Data encryption at rest
- Backup and recovery procedures
- Performance optimization for large datasets
- Integration testing

## 📄 License

This project is created for demonstration purposes.

## 👤 Author - Matthew Sorkin

Created for US Tech Force application - showcasing digital transformation capabilities.

