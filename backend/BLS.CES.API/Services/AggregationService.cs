using Microsoft.EntityFrameworkCore;
using BLS.CES.API.Data;
using BLS.CES.API.Models;

namespace BLS.CES.API.Services;

public class AggregationService
{
    private readonly CESDbContext _context;

    public AggregationService(CESDbContext context)
    {
        _context = context;
    }

    public async Task<List<AggregatedData>> GetAggregatedDataByPeriodAsync(string? period = null, string? industryCode = null, string? state = null)
    {
        var query = _context.Submissions.AsQueryable();

        if (!string.IsNullOrEmpty(period))
        {
            var periodDate = DateTime.Parse(period + "-01");
            query = query.Where(s => s.ReferencePeriod.Year == periodDate.Year && 
                                     s.ReferencePeriod.Month == periodDate.Month);
        }

        if (!string.IsNullOrEmpty(industryCode))
        {
            query = query.Where(s => s.IndustryCode == industryCode);
        }

        if (!string.IsNullOrEmpty(state))
        {
            query = query.Where(s => s.State == state);
        }

        var submissions = await query.ToListAsync();

        var grouped = submissions
            .GroupBy(s => new
            {
                Period = $"{s.ReferencePeriod:yyyy-MM}",
                s.IndustryCode,
                s.IndustryName,
                s.State
            })
            .Select(g => new AggregatedData
            {
                Period = g.Key.Period,
                IndustryCode = g.Key.IndustryCode,
                IndustryName = g.Key.IndustryName,
                State = g.Key.State,
                TotalSubmissions = g.Count(),
                TotalEmployees = g.Sum(s => s.TotalEmployees),
                TotalNonsupervisoryEmployees = g.Sum(s => s.NonsupervisoryEmployees ?? 0),
                AverageWeeklyHours = g.Where(s => s.AverageWeeklyHours.HasValue)
                    .Average(s => (double?)s.AverageWeeklyHours) != null
                    ? (decimal?)g.Where(s => s.AverageWeeklyHours.HasValue)
                        .Average(s => (double)s.AverageWeeklyHours!.Value)
                    : null,
                AverageHourlyEarnings = g.Where(s => s.AverageHourlyEarnings.HasValue)
                    .Average(s => (double?)s.AverageHourlyEarnings) != null
                    ? (decimal?)g.Where(s => s.AverageHourlyEarnings.HasValue)
                        .Average(s => (double)s.AverageHourlyEarnings!.Value)
                    : null,
                TotalPayroll = g.Sum(s => s.TotalPayroll ?? 0)
            })
            .ToList();

        // Calculate month-over-month changes
        foreach (var item in grouped)
        {
            var currentPeriod = DateTime.Parse(item.Period + "-01");
            var previousPeriod = currentPeriod.AddMonths(-1);
            var previousPeriodStr = $"{previousPeriod:yyyy-MM}";

            var previousData = grouped.FirstOrDefault(g => 
                g.Period == previousPeriodStr && 
                g.IndustryCode == item.IndustryCode &&
                g.State == item.State);

            if (previousData != null)
            {
                item.EmploymentChange = item.TotalEmployees - previousData.TotalEmployees;
                item.EmploymentChangePercent = previousData.TotalEmployees > 0
                    ? (item.EmploymentChange.Value / previousData.TotalEmployees) * 100
                    : 0;

                if (item.AverageHourlyEarnings.HasValue && previousData.AverageHourlyEarnings.HasValue)
                {
                    item.EarningsChangePercent = ((item.AverageHourlyEarnings.Value - previousData.AverageHourlyEarnings.Value) 
                        / previousData.AverageHourlyEarnings.Value) * 100;
                }
            }
        }

        return grouped;
    }

    public async Task<Dictionary<string, object>> GetDashboardStatsAsync()
    {
        var totalSubmissions = await _context.Submissions.CountAsync();
        var totalEmployees = await _context.Submissions.SumAsync(s => s.TotalEmployees);
        
        var latestPeriod = await _context.Submissions
            .OrderByDescending(s => s.ReferencePeriod)
            .Select(s => s.ReferencePeriod)
            .FirstOrDefaultAsync();

        var latestPeriodStr = latestPeriod != default 
            ? $"{latestPeriod:yyyy-MM}" 
            : DateTime.Now.ToString("yyyy-MM");

        var currentMonthData = await GetAggregatedDataByPeriodAsync(latestPeriodStr);
        var previousMonthData = latestPeriod != default
            ? await GetAggregatedDataByPeriodAsync($"{latestPeriod.AddMonths(-1):yyyy-MM}")
            : new List<AggregatedData>();

        var totalCurrentEmployees = currentMonthData.Sum(d => d.TotalEmployees);
        var totalPreviousEmployees = previousMonthData.Sum(d => d.TotalEmployees);
        var employmentChange = totalCurrentEmployees - totalPreviousEmployees;
        var employmentChangePercent = totalPreviousEmployees > 0
            ? (employmentChange / (decimal)totalPreviousEmployees) * 100
            : 0;

        var avgEarnings = currentMonthData
            .Where(d => d.AverageHourlyEarnings.HasValue)
            .Select(d => d.AverageHourlyEarnings!.Value)
            .DefaultIfEmpty(0)
            .Average();

        return new Dictionary<string, object>
        {
            { "totalSubmissions", totalSubmissions },
            { "totalEmployees", totalEmployees },
            { "currentPeriod", latestPeriodStr },
            { "currentMonthEmployees", totalCurrentEmployees },
            { "previousMonthEmployees", totalPreviousEmployees },
            { "employmentChange", employmentChange },
            { "employmentChangePercent", employmentChangePercent },
            { "averageHourlyEarnings", avgEarnings },
            { "industriesReported", currentMonthData.Select(d => d.IndustryCode).Distinct().Count() },
            { "statesReported", currentMonthData.Select(d => d.State).Distinct().Count() }
        };
    }
}

