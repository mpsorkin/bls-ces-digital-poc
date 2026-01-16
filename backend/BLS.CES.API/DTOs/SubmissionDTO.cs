namespace BLS.CES.API.DTOs;

public class SubmissionDTO
{
    public string BusinessName { get; set; } = string.Empty;
    public string IndustryCode { get; set; } = string.Empty;
    public string IndustryName { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    public DateTime ReferencePeriod { get; set; }
    public string PayGroup { get; set; } = "One Pay Group";
    public int TotalEmployees { get; set; }
    public int? NonsupervisoryEmployees { get; set; }
    public decimal? AverageWeeklyHours { get; set; }
    public decimal? AverageWeeklyHoursNonsupervisory { get; set; }
    public decimal? AverageHourlyEarnings { get; set; }
    public decimal? AverageHourlyEarningsNonsupervisory { get; set; }
    public decimal? TotalPayroll { get; set; }
    public string SubmittedBy { get; set; } = string.Empty;
    public string? Notes { get; set; }
}

