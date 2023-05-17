﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Services;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Dto;
using Microsoft.AspNetCore.Authorization;

namespace WebApplicationPUSGS.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) {
            _userService = userService;
        }

        [HttpPost("registration")]
        public ActionResult CreateUser([FromBody] UserDtoRegistration userDto) {
            try
            {
                return Ok(_userService.AddUser(userDto));
            }
            catch (Exception e)
            {
                if (e.Message == "Email already in use!")
                    return StatusCode(StatusCodes.Status409Conflict, "Email already in use!");
                else if(e.Message == "Username already in use!")
                    return StatusCode(StatusCodes.Status409Conflict, "Username already in use!");
                else
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }

        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] UserDtoLogin userdto) {
            try
            {
                return Ok(_userService.LoginUser(userdto));
            }
            catch (Exception e)
            {
                if(e.Message == "There is no user with that email!")
                    return StatusCode(StatusCodes.Status404NotFound, "Invalid email provided!");
                else if (e.Message == "There is no user with that password!")
                    return StatusCode(StatusCodes.Status404NotFound, "Invalid password provided!");
                else
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }
        }

        [HttpGet("get-user-by-email/{email}")]
        [Authorize(Roles = "admin, buyer, seller")]
        public ActionResult GetUserByEmail(string email) {
            try
            {  
                return Ok(_userService.GetUserByEmail(email));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }
        
        }
        
        [HttpPut("update/{id:int}")]
        [Authorize(Roles = "admin, buyer, seller")]
        public ActionResult UpdateUser(int id, [FromBody] UserDtoRegistration userDtoRegistration) {
            try
            {
                return Ok(_userService.UpdateUser(id, userDtoRegistration));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }

        }

        [HttpDelete("{id:int}")]
        public ActionResult DeleteUser(int id)
        {
            try
            {
                _userService.DeleteUserById(id);
                return Ok();
            }
            catch (Exception)
            {
                //NotFound();
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult GetUserById(int id) {
            try
            {
                return Ok(_userService.GetUserById(id));
            }
            catch (Exception)
            {

                //NotFound();
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

        [HttpGet]
        public ActionResult GetUsers() {
            try
            {
                return Ok(_userService.GetUsers());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }
    }
}
