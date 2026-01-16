import React, { useState } from 'react'
import { submissionsAPI } from '../services/api'
import './CESForm.css'

const INDUSTRIES = [
  { code: '54', name: 'Professional, Scientific, and Technical Services' },
  { code: '62', name: 'Health Care and Social Assistance' },
  { code: '44-45', name: 'Retail Trade' },
  { code: '72', name: 'Accommodation and Food Services' },
  { code: '23', name: 'Construction' },
  { code: '31-33', name: 'Manufacturing' },
  { code: '52', name: 'Finance and Insurance' },
  { code: '51', name: 'Information' },
  { code: '53', name: 'Real Estate and Rental and Leasing' },
  { code: '56', name: 'Administrative and Support Services' },
]

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]

function CESForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    industryCode: '',
    industryName: '',
    state: '',
    city: '',
    zipCode: '',
    referencePeriod: new Date().toISOString().split('T')[0],
    payGroup: 'One Pay Group',
    totalEmployees: '',
    nonsupervisoryEmployees: '',
    averageWeeklyHours: '',
    averageWeeklyHoursNonsupervisory: '',
    averageHourlyEarnings: '',
    averageHourlyEarningsNonsupervisory: '',
    totalPayroll: '',
    submittedBy: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-fill industry name when code is selected
    if (name === 'industryCode') {
      const industry = INDUSTRIES.find(ind => ind.code === value)
      if (industry) {
        setFormData(prev => ({
          ...prev,
          industryName: industry.name
        }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const submissionData = {
        ...formData,
        totalEmployees: parseInt(formData.totalEmployees) || 0,
        nonsupervisoryEmployees: formData.nonsupervisoryEmployees 
          ? parseInt(formData.nonsupervisoryEmployees) 
          : null,
        averageWeeklyHours: formData.averageWeeklyHours 
          ? parseFloat(formData.averageWeeklyHours) 
          : null,
        averageWeeklyHoursNonsupervisory: formData.averageWeeklyHoursNonsupervisory 
          ? parseFloat(formData.averageWeeklyHoursNonsupervisory) 
          : null,
        averageHourlyEarnings: formData.averageHourlyEarnings 
          ? parseFloat(formData.averageHourlyEarnings) 
          : null,
        averageHourlyEarningsNonsupervisory: formData.averageHourlyEarningsNonsupervisory 
          ? parseFloat(formData.averageHourlyEarningsNonsupervisory) 
          : null,
        totalPayroll: formData.totalPayroll 
          ? parseFloat(formData.totalPayroll) 
          : null,
        referencePeriod: new Date(formData.referencePeriod + 'T12:00:00'),
      }

      await submissionsAPI.create(submissionData)
      setSubmitStatus({ type: 'success', message: 'Survey submitted successfully!' })
      
      // Reset form
      setFormData({
        businessName: '',
        industryCode: '',
        industryName: '',
        state: '',
        city: '',
        zipCode: '',
        referencePeriod: new Date().toISOString().split('T')[0],
        payGroup: 'One Pay Group',
        totalEmployees: '',
        nonsupervisoryEmployees: '',
        averageWeeklyHours: '',
        averageWeeklyHoursNonsupervisory: '',
        averageHourlyEarnings: '',
        averageHourlyEarningsNonsupervisory: '',
        totalPayroll: '',
        submittedBy: '',
        notes: '',
      })
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to submit survey. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Current Employment Statistics (CES) Survey Form</h2>
        <p className="form-subtitle">
          U.S. Department of Labor - Bureau of Labor Statistics
        </p>
        <p className="form-description">
          Please report data for the pay period that includes the 12th of the month.
          Your information will be used only for statistical purposes and held in confidence.
        </p>
      </div>

      {submitStatus && (
        <div className={`alert alert-${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="ces-form">
        <section className="form-section">
          <h3>Business Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="businessName">Business Name *</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="industryCode">Industry Code (NAICS) *</label>
              <select
                id="industryCode"
                name="industryCode"
                value={formData.industryCode}
                onChange={handleChange}
                required
              >
                <option value="">Select Industry</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind.code} value={ind.code}>{ind.code} - {ind.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                pattern="[0-9]{5}(-[0-9]{4})?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="referencePeriod">Reference Period (Pay period including 12th) *</label>
              <input
                type="date"
                id="referencePeriod"
                name="referencePeriod"
                value={formData.referencePeriod}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Employment Data</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="totalEmployees">
                Total Employees (All Employees) *
                <span className="help-text">Include: full-time, part-time, trainees, employees on paid leave</span>
                <span className="help-text">Exclude: contractors, unpaid family members, employees on unpaid leave</span>
              </label>
              <input
                type="number"
                id="totalEmployees"
                name="totalEmployees"
                value={formData.totalEmployees}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nonsupervisoryEmployees">
                Nonsupervisory Employees (if applicable)
                <span className="help-text">Production or nonsupervisory workers</span>
              </label>
              <input
                type="number"
                id="nonsupervisoryEmployees"
                name="nonsupervisoryEmployees"
                value={formData.nonsupervisoryEmployees}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Hours Worked</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="averageWeeklyHours">Average Weekly Hours (All Employees)</label>
              <input
                type="number"
                id="averageWeeklyHours"
                name="averageWeeklyHours"
                value={formData.averageWeeklyHours}
                onChange={handleChange}
                min="0"
                max="168"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="averageWeeklyHoursNonsupervisory">Average Weekly Hours (Nonsupervisory)</label>
              <input
                type="number"
                id="averageWeeklyHoursNonsupervisory"
                name="averageWeeklyHoursNonsupervisory"
                value={formData.averageWeeklyHoursNonsupervisory}
                onChange={handleChange}
                min="0"
                max="168"
                step="0.1"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Earnings Data</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="averageHourlyEarnings">Average Hourly Earnings (All Employees)</label>
              <input
                type="number"
                id="averageHourlyEarnings"
                name="averageHourlyEarnings"
                value={formData.averageHourlyEarnings}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="averageHourlyEarningsNonsupervisory">Average Hourly Earnings (Nonsupervisory)</label>
              <input
                type="number"
                id="averageHourlyEarningsNonsupervisory"
                name="averageHourlyEarningsNonsupervisory"
                value={formData.averageHourlyEarningsNonsupervisory}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalPayroll">Total Payroll for Period ($)</label>
              <input
                type="number"
                id="totalPayroll"
                name="totalPayroll"
                value={formData.totalPayroll}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Additional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="submittedBy">Submitted By (Email or Name)</label>
              <input
                type="text"
                id="submittedBy"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default CESForm

