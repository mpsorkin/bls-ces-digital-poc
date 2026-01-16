import React, { useState, useEffect } from 'react'
import { analyticsAPI } from '../services/api'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import './Dashboard.css'

const COLORS = ['#1e3c72', '#2a5298', '#4a90e2', '#6bb6ff', '#8fc9ff', '#b3dcff']

// Helper function to truncate text with ellipsis
const truncateText = (text, maxLength = 20) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Shorter truncation for bar charts (X-axis labels)
const truncateBarLabel = (text, maxLength = 16) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Shorter truncation for pie chart labels
const truncatePieLabel = (text, maxLength = 12) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Custom tooltip that shows full names
const CustomTooltip = ({ active, payload, labelKey = 'industry' }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const fullLabel = data[labelKey] || data.industry || data.state || ''
    return (
      <div className="custom-tooltip" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{fullLabel}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '2px 0', color: entry.color }}>
            {entry.name || 'Value'}: {typeof entry.value === 'number' 
              ? entry.value.toLocaleString() 
              : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [aggregatedData, setAggregatedData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [selectedPeriod])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, aggregatedResponse] = await Promise.all([
        analyticsAPI.getDashboardStats(),
        analyticsAPI.getAggregated({ period: selectedPeriod || undefined })
      ])
      setStats(statsResponse.data)
      setAggregatedData(aggregatedResponse.data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard data...</div>
  }

  if (!stats) {
    return <div className="dashboard-error">Error loading dashboard data</div>
  }

  // Prepare chart data with truncated labels for display
  const industryData = aggregatedData
    .reduce((acc, item) => {
      const fullName = item.industryName || item.industryCode
      const existing = acc.find(x => x.industry === fullName)
      if (existing) {
        existing.employees += item.totalEmployees
      } else {
        acc.push({
          industry: fullName,
          industryDisplay: truncateBarLabel(fullName),
          employees: item.totalEmployees
        })
      }
      return acc
    }, [])
    .sort((a, b) => b.employees - a.employees)
    .slice(0, 10)

  const stateData = aggregatedData
    .reduce((acc, item) => {
      if (!item.state) return acc
      const existing = acc.find(x => x.state === item.state)
      if (existing) {
        existing.employees += item.totalEmployees
      } else {
        acc.push({
          state: item.state,
          employees: item.totalEmployees
        })
      }
      return acc
    }, [])
    .sort((a, b) => b.employees - a.employees)
    .slice(0, 10)

  const earningsData = aggregatedData
    .filter(item => item.averageHourlyEarnings)
    .map(item => {
      const fullName = item.industryName || item.industryCode
      return {
        industry: fullName,
        industryDisplay: truncateBarLabel(fullName),
        earnings: parseFloat(item.averageHourlyEarnings.toFixed(2))
      }
    })
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 10)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>CES Survey Dashboard</h2>
        <p className="dashboard-subtitle">Current Employment Statistics - Aggregated Data Analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Total Submissions</h3>
            <p className="metric-value">{stats.totalSubmissions}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Total Employees</h3>
            <p className="metric-value">{stats.totalEmployees.toLocaleString()}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Employment Change</h3>
            <p className={`metric-value ${stats.employmentChange >= 0 ? 'positive' : 'negative'}`}>
              {stats.employmentChange >= 0 ? '+' : ''}{stats.employmentChange.toLocaleString()}
            </p>
            <p className="metric-change">
              ({stats.employmentChangePercent >= 0 ? '+' : ''}{stats.employmentChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Avg. Hourly Earnings</h3>
            <p className="metric-value">${stats.averageHourlyEarnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🏭</div>
          <div className="metric-content">
            <h3>Industries Reported</h3>
            <p className="metric-value">{stats.industriesReported}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🗺️</div>
          <div className="metric-content">
            <h3>States Reported</h3>
            <p className="metric-value">{stats.statesReported}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {industryData.length > 0 && (
          <div className="chart-card">
            <h3>Employment by Industry (Top 10)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="industryDisplay" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip labelKey="industry" />} />
                <Bar dataKey="employees" fill="#2a5298" name="Employees" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {stateData.length > 0 && (
          <div className="chart-card">
            <h3>Employment by State (Top 10)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#4a90e2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {earningsData.length > 0 && (
          <div className="chart-card">
            <h3>Average Hourly Earnings by Industry (Top 10)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="industryDisplay" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  content={<CustomTooltip labelKey="industry" />}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="earnings" fill="#1e3c72" name="Avg. Hourly Earnings ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {industryData.length > 0 && (
          <div className="chart-card">
            <h3>Industry Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData.slice(0, 6).map(item => ({
                    ...item,
                    pieLabel: truncatePieLabel(item.industry)
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ pieLabel, percent }) => `${pieLabel} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="employees"
                >
                  {industryData.slice(0, 6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip labelKey="industry" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {aggregatedData.length === 0 && (
        <div className="dashboard-empty">
          <p>No data available. Submit a survey to see analytics.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard

