using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Dto;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Services
{
    public class UserService : IUserService
    {
        public User AddUser(User newUser) {



            return newUser;
        }

        public UserDto LoginUser(UserDto userDto)
        {



            return userDto;
        }
    }
}
