using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPUSGS.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public string Comment { get; set; }

        public string Address { get; set; }

        public int Price { get; set; }

        public string DateOfOrder { get; set; }

        public int UserBuyerId { get; set; }

        public User UserBuyer { get; set; }

        public ICollection<int> ArticleIds { get; set; }

        public ICollection<int> AmountOfArticles { get; set; }
    }
}
