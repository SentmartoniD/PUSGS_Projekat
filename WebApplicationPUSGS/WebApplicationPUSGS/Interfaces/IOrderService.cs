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

        List<OrderDto> GetAllCurrentOrdersForSeller(string email);

        List<OrderDto> GetAllPastOrdersForSeller(string email);

        Tuple<List<OrderDto>, List<OrderDto>> GetCurrentAndPastOrdersForBuyer(string email);

        void DeleteOrder(int id);

        OrderDetailsDto GetOrderDetails(int id, string email);
    }
}
