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

        public string UserBuyerId { get; set; }

        public User UserBuyer { get; set; }

        public List<Article> Articles { get; set; }
    }
}
