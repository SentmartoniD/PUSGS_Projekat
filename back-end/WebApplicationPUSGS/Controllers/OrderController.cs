﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Dto;

namespace WebApplicationPUSGS.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    { 
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("{email}")]
        [Authorize(Roles = "buyer")]
        public ActionResult CreateOrder(string email, [FromBody] OrderDto orderDto) {
            try
            {
                return Ok(_orderService.AddOrder(email, orderDto));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public ActionResult GetAllOrders() {
            try
            {
                return Ok(_orderService.GetAllOrders());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("all-orders-for-buyer/{email}")]
        [Authorize(Roles = "buyer")]
        public ActionResult GetAllOrderForBuyer(string email) {
            try
            {
                Tuple<List<OrderDto>, List<OrderDto>> t = _orderService.GetCurrentAndPastOrdersForBuyer(email);
                return Ok(t);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("all-past-orders-for-seller/{email}")]
        [Authorize(Roles = "seller")]
        public ActionResult GetAllPastOrderForSeller(string email)
        {
            try
            {
                return Ok(_orderService.GetAllPastOrdersForSeller(email));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("all-current-orders-for-seller/{email}")]
        [Authorize(Roles = "seller")]
        public ActionResult GetAllCurrentOrderForSeller(string email)
        {
            try
            {
                return Ok(_orderService.GetAllCurrentOrdersForSeller(email));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("cancel-order/{id}")]
        [Authorize(Roles = "buyer")]
        public ActionResult CancelOrder(int id) {
            try
            {
                _orderService.CanceleOrder(id);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        /*
        [HttpGet("order-details")]
        [Authorize(Roles = "buyer, seller, admin")]
        public ActionResult OrderDetails(int parameter1, string parameter2) {
            try
            {
                return Ok(_orderService.GetOrderDetails(parameter1, parameter2));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }*/
        [HttpGet("order-details/{id}/{email}")]
        [Authorize(Roles = "buyer, seller, admin")]
        public ActionResult OrderDetails(int id, string email)
        {
            try
            {
                return Ok(_orderService.GetOrderDetails(id, email));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
