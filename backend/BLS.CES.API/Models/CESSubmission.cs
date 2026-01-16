namespace BLS.CES.API.Models;

public class CESSubmission
{
    public int Id { get; set; }
    
    // Business Information
    public string BusinessName { get; set; } = string.Empty;
    public string IndustryCode { get; set; } = string.Empty; // NAICS code
    public string IndustryName { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    
    // Reference Period
    public DateTime ReferencePeriod { get; set; } // Pay period that includes the 12th of the month
    public string PayGroup { get; set; } = "One Pay Group"; // One Pay Group or Multiple Pay Groups
    
    // Employment Data
    public int TotalEmployees { get; set; } // All employees on payroll
    public int? NonsupervisoryEmployees { get; set; } // Production/nonsupervisory employees (if applicable)
    
    // Hours Worked
    public decimal? AverageWeeklyHours { get; set; } // Average weekly hours for all employees
    public decimal? AverageWeeklyHoursNonsupervisory { get; set; } // Average weekly hours for nonsupervisory
    
    // Earnings Data
    public decimal? AverageHourlyEarnings { get; set; } // Average hourly earnings
    public decimal? AverageHourlyEarningsNonsupervisory { get; set; } // Average hourly earnings for nonsupervisory
    public decimal? TotalPayroll { get; set; } // Total payroll for the period
    
    // Metadata
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public string SubmittedBy { get; set; } = string.Empty; // Email or identifier
    public string SubmissionMethod { get; set; } = "Web Form"; // Web Form, Email, API
    public bool IsVerified { get; set; } = false;
    public string? Notes { get; set; }
}

