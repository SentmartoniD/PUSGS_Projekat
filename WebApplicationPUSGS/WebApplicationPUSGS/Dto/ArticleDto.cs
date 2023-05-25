using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPUSGS.Dto
{
    public class ArticleDto
    {
        public int ArticleId { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public int Quantity { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }
    }
}
