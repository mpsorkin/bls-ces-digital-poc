using Microsoft.AspNetCore.Mvc;
using BLS.CES.API.Services;

namespace BLS.CES.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly AggregationService _aggregationService;
    private readonly ILogger<AnalyticsController> _logger;

    public AnalyticsController(AggregationService aggregationService, ILogger<AnalyticsController> logger)
    {
        _aggregationService = aggregationService;
        _logger = logger;
    }

    [HttpGet("aggregated")]
    public async Task<IActionResult> GetAggregatedData(
        [FromQuery] string? period = null,
        [FromQuery] string? industryCode = null,
        [FromQuery] string? state = null)
    {
        var data = await _aggregationService.GetAggregatedDataByPeriodAsync(period, industryCode, state);
        return Ok(data);
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var stats = await _aggregationService.GetDashboardStatsAsync();
        return Ok(stats);
    }
}

