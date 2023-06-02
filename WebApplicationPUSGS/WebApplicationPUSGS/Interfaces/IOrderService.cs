using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Dto;

namespace WebApplicationPUSGS.Interfaces
{
    public interface IOrderService
    {
        OrderDto AddOrder(string email, OrderDto orderDto);

        List<OrderDto> GetAllOrders();
    }
}
