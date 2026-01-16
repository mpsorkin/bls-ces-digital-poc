import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CESForm from './components/CESForm'
import Dashboard from './components/Dashboard'
import SubmissionsList from './components/SubmissionsList'
import './App.css'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">BLS CES Digital Survey System</h1>
            <div className="nav-links">
              <Link to="/" className="nav-link">Dashboard</Link>
              <Link to="/form" className="nav-link">Submit Survey</Link>
              <Link to="/submissions" className="nav-link">View Submissions</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<CESForm />} />
            <Route path="/submissions" element={<SubmissionsList />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Bureau of Labor Statistics - Current Employment Statistics (CES) Digital Survey System</p>
          <p className="footer-note">This is a demonstration project for US Tech Force application</p>
        </footer>
      </div>
    </Router>
  )
}

export default App

