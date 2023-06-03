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

        List<OrderDto> GetAllOrdersForBuyer(string email);

        List<OrderDto> GetAllCurrentOrdersForSeller(string email);

        List<OrderDto> GetAllPastOrdersForSeller(string email);

        List<OrderDto> GetAllCurrentOrdersForBuyer(string email);

        List<OrderDto> GetAllPastOrdersForBuyer(string email);
    }
}
