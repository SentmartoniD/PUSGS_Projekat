using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Infrastucture.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.OrderId);
            builder.Property(x => x.OrderId).ValueGeneratedOnAdd();

            builder.Property(x => x.Comment).HasMaxLength(70);

            builder.Property(x => x.Address).HasMaxLength(70);

            builder.HasOne(x => x.UserBuyer) //Order ima jedan User
                   .WithMany(x => x.Orders) //User ima vise Order
                   .HasForeignKey(x => x.UserBuyerId) //Strani ljuc je UserId
                   .OnDelete(DeleteBehavior.Cascade); //Ako se obrise User kaskadno se brisu svi njegovi Orderr

            builder.Property(e => e.ArticleIds)
                   .HasConversion(
                        v => string.Join(',', v),
                        v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                            .Select(int.Parse)
                            .ToList());

            builder.Property(e => e.AmountOfArticles)
                    .HasConversion(
                        v => string.Join(',', v),
                        v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                            .Select(int.Parse)
                            .ToList());
        }
    }
}
