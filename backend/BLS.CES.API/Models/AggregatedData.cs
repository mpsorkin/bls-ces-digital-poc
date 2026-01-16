namespace BLS.CES.API.Models;

public class AggregatedData
{
    public string Period { get; set; } = string.Empty; // e.g., "2024-12"
    public string IndustryCode { get; set; } = string.Empty;
    public string IndustryName { get; set; } = string.Empty;
    public string? State { get; set; }
    
    public int TotalSubmissions { get; set; }
    public int TotalEmployees { get; set; }
    public int? TotalNonsupervisoryEmployees { get; set; }
    
    public decimal? AverageWeeklyHours { get; set; }
    public decimal? AverageHourlyEarnings { get; set; }
    public decimal? TotalPayroll { get; set; }
    
    // Month-over-month changes
    public decimal? EmploymentChange { get; set; }
    public decimal? EmploymentChangePercent { get; set; }
    public decimal? EarningsChangePercent { get; set; }
    
    // Inflation-adjusted earnings (if CPI data available)
    public decimal? RealAverageHourlyEarnings { get; set; }
}

