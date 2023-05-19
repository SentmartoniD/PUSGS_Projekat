using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Infrastucture
{
    public class PUSGSWebAppDbContext : DbContext
    {
        public PUSGSWebAppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 1,
                Username = "PeraP123",
                Email = "peraperic@gmail.com",
                FirstName = "Pera",
                LastName = "Peric",
                DateOfBirth = "1995-05-13",
                Address = "Serbia, NoviSad, Temerinska 99",
                UserType = "admin",
                Image = "QzpcZmFrZXBhdGhccGVyYV9rZXAucG5n",
                Password = "3A2C878140187B8A880BE9FC9E7BF0A4CABD3C707245A5221EB05E3208AF5067",
                Approved = Status.YES,
                Verified = Status.NO
            });

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PUSGSWebAppDbContext).Assembly);
        }
    }
}
