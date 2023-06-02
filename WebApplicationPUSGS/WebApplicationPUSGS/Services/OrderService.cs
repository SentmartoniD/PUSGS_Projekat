using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Mapping;
using WebApplicationPUSGS.Infrastucture;
using AutoMapper;
using WebApplicationPUSGS.Dto;
using Microsoft.EntityFrameworkCore;


namespace WebApplicationPUSGS.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly PUSGSWebAppDbContext _dbContext;

        public OrderService(IMapper mapper, PUSGSWebAppDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public OrderDto AddOrder(string email, OrderDto orderDto)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            _dbContext.Entry(user).State = EntityState.Detached;

            Order order = _mapper.Map<Order>(orderDto);
            order.UserBuyerId = user.UserId;
            order.DateOfOrder = DateTime.Now.ToString();

            _dbContext.Orders.Add(order);

            List<Article> articlesToUpdate = _dbContext.Articles.Where(x => orderDto.ArticleIds.Contains(x.ArticleId)).ToList();
            List<int> amountOfArticles = orderDto.AmountOfArticles.ToList();

            for (int i = 0; i < articlesToUpdate.Count; i++) {
                articlesToUpdate[i].Quantity = articlesToUpdate[i].Quantity - amountOfArticles[i];
            }

            _dbContext.SaveChanges();

            return _mapper.Map<OrderDto>(order);
        }

        public List<OrderDto> GetAllOrders()
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList());
        }
    }
}
