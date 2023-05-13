using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Infrastucture.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.UserId);
            builder.Property(x => x.UserId).ValueGeneratedOnAdd();

            builder.Property(x => x.Username).HasMaxLength(22);
            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Email).HasMaxLength(70);
            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.FirstName).HasMaxLength(20);

            builder.Property(x => x.LastName).HasMaxLength(20);

            builder.Property(x => x.DateOfBirth).HasMaxLength(20);

            builder.Property(x => x.Address).HasMaxLength(70);

            builder.Property(x => x.UserType).HasMaxLength(10);

            builder.Property(x => x.Image).HasMaxLength(70);

            builder.Property(x => x.Password).HasMaxLength(70);

        }
    }
}
