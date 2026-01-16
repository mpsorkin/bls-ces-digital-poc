using Microsoft.EntityFrameworkCore;
using BLS.CES.API.Models;

namespace BLS.CES.API.Data;

public class CESDbContext : DbContext
{
    public CESDbContext(DbContextOptions<CESDbContext> options) : base(options)
    {
    }

    public DbSet<CESSubmission> Submissions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CESSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.ReferencePeriod);
            entity.HasIndex(e => e.IndustryCode);
            entity.HasIndex(e => e.State);
            entity.HasIndex(e => new { e.ReferencePeriod, e.IndustryCode });
        });
    }
}

