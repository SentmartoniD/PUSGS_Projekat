using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Services;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Dto;

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

        [HttpDelete("{id:int}")]
        public ActionResult DeleteUser(int id) {
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
        
        //get by id
        [HttpGet("{id:int}")]
        public ActionResult GetUser(int id) {
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
