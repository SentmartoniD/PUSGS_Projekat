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
                UserId = 0,
                Username = "PeraP",
                Email = "peraperic@gmail.com",
                FirstName = "Pera",
                LastName = "Peric",
                DateOfBirth = "1995 - 05 - 13",
                Address = "Serbia, NoviSad, Temerinska 99",
                UserType = "Admin",
                Image = "QzpcZmFrZXBhdGhccGVyYV9rZXAucG5n",
                Password = "PeraPeric1234!"
            });

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PUSGSWebAppDbContext).Assembly);
        }
    }
}
