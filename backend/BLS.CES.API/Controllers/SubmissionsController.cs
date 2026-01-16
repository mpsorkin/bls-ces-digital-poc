using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BLS.CES.API.Data;
using BLS.CES.API.DTOs;
using BLS.CES.API.Models;

namespace BLS.CES.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubmissionsController : ControllerBase
{
    private readonly CESDbContext _context;
    private readonly ILogger<SubmissionsController> _logger;

    public SubmissionsController(CESDbContext context, ILogger<SubmissionsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CESSubmission>>> GetSubmissions(
        [FromQuery] string? period = null,
        [FromQuery] string? industryCode = null,
        [FromQuery] string? state = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50)
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

        var totalCount = await query.CountAsync();
        var submissions = await query
            .OrderByDescending(s => s.SubmittedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        Response.Headers["X-Total-Count"] = totalCount.ToString();
        Response.Headers["X-Page"] = page.ToString();
        Response.Headers["X-Page-Size"] = pageSize.ToString();

        return Ok(submissions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CESSubmission>> GetSubmission(int id)
    {
        var submission = await _context.Submissions.FindAsync(id);

        if (submission == null)
        {
            return NotFound();
        }

        return Ok(submission);
    }

    [HttpPost]
    public async Task<ActionResult<CESSubmission>> CreateSubmission(SubmissionDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var submission = new CESSubmission
        {
            BusinessName = dto.BusinessName,
            IndustryCode = dto.IndustryCode,
            IndustryName = dto.IndustryName,
            State = dto.State,
            City = dto.City,
            ZipCode = dto.ZipCode,
            ReferencePeriod = dto.ReferencePeriod,
            PayGroup = dto.PayGroup,
            TotalEmployees = dto.TotalEmployees,
            NonsupervisoryEmployees = dto.NonsupervisoryEmployees,
            AverageWeeklyHours = dto.AverageWeeklyHours,
            AverageWeeklyHoursNonsupervisory = dto.AverageWeeklyHoursNonsupervisory,
            AverageHourlyEarnings = dto.AverageHourlyEarnings,
            AverageHourlyEarningsNonsupervisory = dto.AverageHourlyEarningsNonsupervisory,
            TotalPayroll = dto.TotalPayroll,
            SubmittedBy = dto.SubmittedBy,
            Notes = dto.Notes,
            SubmittedAt = DateTime.UtcNow,
            SubmissionMethod = "Web Form"
        };

        _context.Submissions.Add(submission);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSubmission), new { id = submission.Id }, submission);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubmission(int id, SubmissionDTO dto)
    {
        var submission = await _context.Submissions.FindAsync(id);

        if (submission == null)
        {
            return NotFound();
        }

        submission.BusinessName = dto.BusinessName;
        submission.IndustryCode = dto.IndustryCode;
        submission.IndustryName = dto.IndustryName;
        submission.State = dto.State;
        submission.City = dto.City;
        submission.ZipCode = dto.ZipCode;
        submission.ReferencePeriod = dto.ReferencePeriod;
        submission.PayGroup = dto.PayGroup;
        submission.TotalEmployees = dto.TotalEmployees;
        submission.NonsupervisoryEmployees = dto.NonsupervisoryEmployees;
        submission.AverageWeeklyHours = dto.AverageWeeklyHours;
        submission.AverageWeeklyHoursNonsupervisory = dto.AverageWeeklyHoursNonsupervisory;
        submission.AverageHourlyEarnings = dto.AverageHourlyEarnings;
        submission.AverageHourlyEarningsNonsupervisory = dto.AverageHourlyEarningsNonsupervisory;
        submission.TotalPayroll = dto.TotalPayroll;
        submission.Notes = dto.Notes;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubmission(int id)
    {
        var submission = await _context.Submissions.FindAsync(id);
        if (submission == null)
        {
            return NotFound();
        }

        _context.Submissions.Remove(submission);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

