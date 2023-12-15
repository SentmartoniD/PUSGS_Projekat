﻿using System;
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
using System.Text.Json;

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

        public List<OrderDto> GetAllCurrentOrdersForSeller(string email)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            _dbContext.Entry(user).State = EntityState.Detached;

            List<Order> orders = _dbContext.Orders.ToList();

            List<Article> articles = _dbContext.Articles.Where(x => x.UserSellerId == user.UserId).ToList();

            List<Order> ordersForSeller = new List<Order>();

            Order tempOrder = new Order();

            foreach (Order o in orders) {

                if (o.DateOfOrder == "canceled")
                    continue;
                TimeSpan timeDifference = DateTime.Now - DateTime.Parse(o.DateOfOrder);
                if (timeDifference.TotalMinutes >= 2)
                    continue;

                string jsonString = JsonSerializer.Serialize(o);
                tempOrder = JsonSerializer.Deserialize<Order>(jsonString);

                tempOrder.ArticleIds = new List<int>();
                for (int i = 0; i < o.ArticleIds.Count; i++) {
                    foreach (Article a in articles) {
                        if (o.ArticleIds.ToList()[i] == a.ArticleId)
                        {
                            tempOrder.ArticleIds.Add(a.ArticleId);
                            break;
                        }
                    }
                }
                if (tempOrder.ArticleIds.Count != 0)
                    ordersForSeller.Add(tempOrder);
            }


            return _mapper.Map<List<OrderDto>>(ordersForSeller);
        }

        public List<OrderDto> GetAllPastOrdersForSeller(string email)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            _dbContext.Entry(user).State = EntityState.Detached;

            List<Order> orders = _dbContext.Orders.ToList();

            List<Article> articles = _dbContext.Articles.Where(x => x.UserSellerId == user.UserId).ToList();

            List<Order> ordersForSeller = new List<Order>();

            Order tempOrder = new Order();

            foreach (Order o in orders)
            {
                if (o.DateOfOrder == "canceled")
                    continue;
                else
                {
                    TimeSpan timeDifference = DateTime.Now - DateTime.Parse(o.DateOfOrder);
                    if (timeDifference.TotalMinutes < 2)
                        continue;
                }

                string jsonString = JsonSerializer.Serialize(o);
                tempOrder = JsonSerializer.Deserialize<Order>(jsonString);

                tempOrder.ArticleIds = new List<int>();
                for (int i = 0; i < o.ArticleIds.Count; i++)
                {
                    foreach (Article a in articles)
                    {
                        if (o.ArticleIds.ToList()[i] == a.ArticleId)
                        {
                            tempOrder.ArticleIds.Add(a.ArticleId);
                            break;
                        }
                    }
                }
                if(tempOrder.ArticleIds.Count != 0)
                    ordersForSeller.Add(tempOrder);
            }


            return _mapper.Map<List<OrderDto>>(ordersForSeller);
        }

        public Tuple<List<OrderDto>, List<OrderDto>> GetCurrentAndPastOrdersForBuyer(string email)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            _dbContext.Entry(user).State = EntityState.Detached;

            List<Order> orders = _dbContext.Orders.Where(x => x.UserBuyerId == user.UserId).ToList();
            List<Order> currentOrders = new List<Order>();
            List<Order> pastOrders = new List<Order>();

            foreach (Order o in orders)
            {
                if (o.DateOfOrder != "canceled")
                {
                    TimeSpan timeDifference = DateTime.Now - DateTime.Parse(o.DateOfOrder);
                    if (timeDifference.TotalMinutes < 2)
                        currentOrders.Add(o);
                    else
                        pastOrders.Add(o);
                }
            }

            List<OrderDto> currentOrdersDto = _mapper.Map<List<OrderDto>>(currentOrders);
            List<OrderDto> pasttOrdersDto = _mapper.Map<List<OrderDto>>(pastOrders);

            return new Tuple<List<OrderDto>, List<OrderDto>>(currentOrdersDto, pasttOrdersDto);
        }

        public void CanceleOrder(int id)
        {
            Order order = _dbContext.Orders.FirstOrDefault(X => X.OrderId == id);
            order.DateOfOrder = "canceled";
            _dbContext.SaveChanges();

            Article tempArticle = new Article();

            for (int i = 0; i < order.ArticleIds.Count; i++) {
                tempArticle = _dbContext.Articles.FirstOrDefault(x => x.ArticleId == order.ArticleIds.ToList()[i]);
                tempArticle.Quantity = tempArticle.Quantity + order.AmountOfArticles.ToList()[i];
                _dbContext.SaveChanges();
            }

        }

        public OrderDetailsDto GetOrderDetails(int id, string email)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            _dbContext.Entry(user).State = EntityState.Detached;

            Order order = _dbContext.Orders.FirstOrDefault(u => u.OrderId == id);

            OrderDetailsDto orderDetailsDto = new OrderDetailsDto();
            orderDetailsDto.Address = order.Address; orderDetailsDto.Comment = order.Comment;  orderDetailsDto.Price = order.Price; orderDetailsDto.DateOfOrder = order.DateOfOrder;
            orderDetailsDto.AmountOfArticles = new List<int>(); orderDetailsDto.Articles = new List<Article>(); orderDetailsDto.OrderId = order.OrderId;

            Article tempArticle = new Article();

            if (user.UserType == "admin" || user.UserType == "buyer")
            {
                for (int i = 0; i < order.ArticleIds.ToList().Count; i++) {
                    orderDetailsDto.Articles.Add(_dbContext.Articles.FirstOrDefault(x => x.ArticleId == order.ArticleIds.ToList()[i]));
                    orderDetailsDto.AmountOfArticles.Add(order.AmountOfArticles.ToList()[i]);
                }
            }
            else {
                List<Article> articles = _dbContext.Articles.Where(x => x.UserSellerId == user.UserId).ToList();
                for (int i = 0; i < order.ArticleIds.ToList().Count; i++)
                {
                    foreach (Article a in articles)
                    {
                        if (order.ArticleIds.ToList()[i] == a.ArticleId)
                        {
                            orderDetailsDto.Articles.Add(a);
                            orderDetailsDto.AmountOfArticles.Add(order.AmountOfArticles.ToList()[i]);
                            break;
                        }
                    }
                }
            }

            return orderDetailsDto;
        }
    }
}
