import React, { useState, useEffect } from 'react'
import { submissionsAPI } from '../services/api'
import { format } from 'date-fns'
import './SubmissionsList.css'

function SubmissionsList() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    period: '',
    industryCode: '',
    state: ''
  })

  useEffect(() => {
    loadSubmissions()
  }, [page, filters])

  const loadSubmissions = async () => {
    try {
      setLoading(true)
      const response = await submissionsAPI.getAll({
        page,
        pageSize: 20,
        ...filters
      })
      setSubmissions(response.data)
      setTotalCount(parseInt(response.headers['x-total-count'] || '0'))
    } catch (error) {
      console.error('Error loading submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setPage(1)
  }

  const totalPages = Math.ceil(totalCount / 20)

  const handleRowClick = (submission) => {
    setSelectedSubmission(submission)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedSubmission(null)
  }

  // Close modal on Escape key
  useEffect(() => {
    if (!showModal) return
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showModal])

  if (loading && submissions.length === 0) {
    return <div className="submissions-loading">Loading submissions...</div>
  }

  return (
    <div className="submissions-container">
      <div className="submissions-header">
        <h2>Survey Submissions</h2>
        <p>View and manage all CES survey submissions</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Period (YYYY-MM):</label>
          <input
            type="text"
            name="period"
            value={filters.period}
            onChange={handleFilterChange}
            placeholder="2024-12"
          />
        </div>
        <div className="filter-group">
          <label>Industry Code:</label>
          <input
            type="text"
            name="industryCode"
            value={filters.industryCode}
            onChange={handleFilterChange}
            placeholder="e.g., 54"
          />
        </div>
        <div className="filter-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            placeholder="e.g., CA"
            maxLength="2"
          />
        </div>
      </div>

      <div className="submissions-table-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Industry</th>
              <th>State</th>
              <th>Reference Period</th>
              <th>Total Employees</th>
              <th>Avg. Hourly Earnings</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No submissions found</td>
              </tr>
            ) : (
              submissions.map(submission => (
                <tr 
                  key={submission.id}
                  onClick={() => handleRowClick(submission)}
                  className="submission-row-clickable"
                >
                  <td>{submission.businessName}</td>
                  <td>
                    <div className="industry-cell">
                      <span className="industry-code">{submission.industryCode}</span>
                      <span className="industry-name">{submission.industryName}</span>
                    </div>
                  </td>
                  <td>{submission.state}</td>
                  <td>{format(new Date(submission.referencePeriod), 'MMM yyyy')}</td>
                  <td>{submission.totalEmployees.toLocaleString()}</td>
                  <td>
                    {submission.averageHourlyEarnings 
                      ? `$${parseFloat(submission.averageHourlyEarnings).toFixed(2)}`
                      : 'N/A'}
                  </td>
                  <td>{format(new Date(submission.submittedAt), 'MMM d, yyyy')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {totalPages} ({totalCount} total)
          </span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for viewing full submission details */}
      {showModal && selectedSubmission && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submission Details</h2>
              <button className="modal-close" onClick={handleCloseModal} aria-label="Close">
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>Business Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Business Name:</label>
                    <span>{selectedSubmission.businessName}</span>
                  </div>
                  <div className="detail-item">
                    <label>Industry Code (NAICS):</label>
                    <span>{selectedSubmission.industryCode}</span>
                  </div>
                  <div className="detail-item">
                    <label>Industry Name:</label>
                    <span>{selectedSubmission.industryName}</span>
                  </div>
                  <div className="detail-item">
                    <label>State:</label>
                    <span>{selectedSubmission.state}</span>
                  </div>
                  <div className="detail-item">
                    <label>City:</label>
                    <span>{selectedSubmission.city || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>ZIP Code:</label>
                    <span>{selectedSubmission.zipCode || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Reference Period</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Reference Period:</label>
                    <span>{format(new Date(selectedSubmission.referencePeriod), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="detail-item">
                    <label>Pay Group:</label>
                    <span>{selectedSubmission.payGroup}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Employment Data</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Total Employees:</label>
                    <span>{selectedSubmission.totalEmployees.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Nonsupervisory Employees:</label>
                    <span>{selectedSubmission.nonsupervisoryEmployees?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Hours Worked</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Average Weekly Hours (All Employees):</label>
                    <span>{selectedSubmission.averageWeeklyHours?.toFixed(1) || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Average Weekly Hours (Nonsupervisory):</label>
                    <span>{selectedSubmission.averageWeeklyHoursNonsupervisory?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Earnings Data</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Average Hourly Earnings (All Employees):</label>
                    <span>
                      {selectedSubmission.averageHourlyEarnings 
                        ? `$${parseFloat(selectedSubmission.averageHourlyEarnings).toFixed(2)}`
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Average Hourly Earnings (Nonsupervisory):</label>
                    <span>
                      {selectedSubmission.averageHourlyEarningsNonsupervisory 
                        ? `$${parseFloat(selectedSubmission.averageHourlyEarningsNonsupervisory).toFixed(2)}`
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Total Payroll for Period:</label>
                    <span>
                      {selectedSubmission.totalPayroll 
                        ? `$${parseFloat(selectedSubmission.totalPayroll).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Submission Metadata</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Submitted By:</label>
                    <span>{selectedSubmission.submittedBy || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Submission Method:</label>
                    <span>{selectedSubmission.submissionMethod}</span>
                  </div>
                  <div className="detail-item">
                    <label>Submitted At:</label>
                    <span>{format(new Date(selectedSubmission.submittedAt), 'MMMM d, yyyy h:mm a')}</span>
                  </div>
                  <div className="detail-item">
                    <label>Verified:</label>
                    <span>{selectedSubmission.isVerified ? 'Yes' : 'No'}</span>
                  </div>
                  {selectedSubmission.notes && (
                    <div className="detail-item full-width">
                      <label>Notes:</label>
                      <span>{selectedSubmission.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-close" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmissionsList

