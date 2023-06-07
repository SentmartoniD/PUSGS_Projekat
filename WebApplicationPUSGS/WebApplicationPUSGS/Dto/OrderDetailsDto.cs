using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Dto
{
    public class OrderDetailsDto
    {
        public int OrderId { get; set; }

        public string Comment { get; set; }

        public string Address { get; set; }

        public int Price { get; set; }

        public string DateOfOrder { get; set; }

        public List<Article> Articles { get; set; }

        public List<int> AmountOfArticles { get; set; }
    }
}
