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
        public ActionResult CreateUser([FromBody] User user) {

            _userService.AddUser(user);
            return Ok("valami!");
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] UserDto userdto) {

            return Ok();
        }

        //[HttpDelete("delete")]
        



        //proba
        [HttpGet("proba-get")]
        public ActionResult GetProba() {
            return Ok("Itt van az adat!");
        }

    }
}
