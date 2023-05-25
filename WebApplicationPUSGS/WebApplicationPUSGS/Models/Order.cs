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

        //list tuple vagy Dictionary key=quantity, value Article
    }
}
