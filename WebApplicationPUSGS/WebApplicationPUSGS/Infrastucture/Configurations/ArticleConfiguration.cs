using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Infrastucture.Configurations
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.HasKey(x => x.ArticleId);
            builder.Property(x => x.ArticleId).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).HasMaxLength(30);

            builder.Property(x => x.Description).HasMaxLength(70);

            builder.Property(x => x.Image).HasMaxLength(70);
        }
    }
}
