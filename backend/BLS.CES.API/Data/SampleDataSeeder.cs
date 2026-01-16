using BLS.CES.API.Models;

namespace BLS.CES.API.Data;

public static class SampleDataSeeder
{
    public static void SeedSampleData(CESDbContext context)
    {
        if (context.Submissions.Any())
        {
            return; // Database already seeded
        }

        var sampleSubmissions = new List<CESSubmission>
        {
            new CESSubmission
            {
                BusinessName = "Tech Solutions Inc",
                IndustryCode = "54",
                IndustryName = "Professional, Scientific, and Technical Services",
                State = "CA",
                City = "San Francisco",
                ZipCode = "94102",
                ReferencePeriod = new DateTime(2024, 12, 12),
                PayGroup = "One Pay Group",
                TotalEmployees = 250,
                NonsupervisoryEmployees = 200,
                AverageWeeklyHours = 40.0m,
                AverageWeeklyHoursNonsupervisory = 40.0m,
                AverageHourlyEarnings = 45.50m,
                AverageHourlyEarningsNonsupervisory = 38.75m,
                TotalPayroll = 455000m,
                SubmittedBy = "admin@techsolutions.com",
                SubmittedAt = DateTime.UtcNow.AddDays(-5),
                SubmissionMethod = "Web Form"
            },
            new CESSubmission
            {
                BusinessName = "Healthcare Partners",
                IndustryCode = "62",
                IndustryName = "Health Care and Social Assistance",
                State = "NY",
                City = "New York",
                ZipCode = "10001",
                ReferencePeriod = new DateTime(2024, 12, 12),
                PayGroup = "One Pay Group",
                TotalEmployees = 500,
                NonsupervisoryEmployees = 450,
                AverageWeeklyHours = 36.0m,
                AverageWeeklyHoursNonsupervisory = 36.0m,
                AverageHourlyEarnings = 32.25m,
                AverageHourlyEarningsNonsupervisory = 28.50m,
                TotalPayroll = 580500m,
                SubmittedBy = "hr@healthcarepartners.com",
                SubmittedAt = DateTime.UtcNow.AddDays(-4),
                SubmissionMethod = "Web Form"
            },
            new CESSubmission
            {
                BusinessName = "Retail Express",
                IndustryCode = "44-45",
                IndustryName = "Retail Trade",
                State = "TX",
                City = "Houston",
                ZipCode = "77001",
                ReferencePeriod = new DateTime(2024, 12, 12),
                PayGroup = "One Pay Group",
                TotalEmployees = 150,
                NonsupervisoryEmployees = 140,
                AverageWeeklyHours = 30.0m,
                AverageWeeklyHoursNonsupervisory = 30.0m,
                AverageHourlyEarnings = 18.50m,
                AverageHourlyEarningsNonsupervisory = 17.25m,
                TotalPayroll = 83250m,
                SubmittedBy = "manager@retailexpress.com",
                SubmittedAt = DateTime.UtcNow.AddDays(-3),
                SubmissionMethod = "Web Form"
            },
            new CESSubmission
            {
                BusinessName = "Construction Pro",
                IndustryCode = "23",
                IndustryName = "Construction",
                State = "FL",
                City = "Miami",
                ZipCode = "33101",
                ReferencePeriod = new DateTime(2024, 12, 12),
                PayGroup = "One Pay Group",
                TotalEmployees = 75,
                NonsupervisoryEmployees = 65,
                AverageWeeklyHours = 40.0m,
                AverageWeeklyHoursNonsupervisory = 40.0m,
                AverageHourlyEarnings = 28.75m,
                AverageHourlyEarningsNonsupervisory = 26.50m,
                TotalPayroll = 86100m,
                SubmittedBy = "admin@constructionpro.com",
                SubmittedAt = DateTime.UtcNow.AddDays(-2),
                SubmissionMethod = "Web Form"
            },
            new CESSubmission
            {
                BusinessName = "Manufacturing Corp",
                IndustryCode = "31-33",
                IndustryName = "Manufacturing",
                State = "MI",
                City = "Detroit",
                ZipCode = "48201",
                ReferencePeriod = new DateTime(2024, 11, 12),
                PayGroup = "One Pay Group",
                TotalEmployees = 300,
                NonsupervisoryEmployees = 280,
                AverageWeeklyHours = 40.0m,
                AverageWeeklyHoursNonsupervisory = 40.0m,
                AverageHourlyEarnings = 24.50m,
                AverageHourlyEarningsNonsupervisory = 22.75m,
                TotalPayroll = 294000m,
                SubmittedBy = "hr@manufacturingcorp.com",
                SubmittedAt = DateTime.UtcNow.AddDays(-35),
                SubmissionMethod = "Web Form"
            },
            new CESSubmission
            {
                BusinessName = "Finance First",
                IndustryCode = "52",
                IndustryName = "Finance and Insurance",
                State = "IL",
                City = "Chicago",
                ZipCode = "60601",
                ReferencePeriod = new DateTime(2024, 12, 12),
                PayGroup = "One Pay Group",
                TotalEmployees = 180,
                NonsupervisoryEmployees = 150,
                AverageWeeklyHours = 40.0m,
                AverageWeeklyHoursNonsupervisory = 40.0m,
                AverageHourlyEarnings = 42.00m,
                AverageHourlyEarningsNonsupervisory = 35.50m,
                TotalPayroll = 302400m,
                SubmittedBy = "admin@financefirst.com",
                SubmittedAt = DateTime.UtcNow.AddDays(-1),
                SubmissionMethod = "Web Form"
            }
        };

        context.Submissions.AddRange(sampleSubmissions);
        context.SaveChanges();
    }
}

