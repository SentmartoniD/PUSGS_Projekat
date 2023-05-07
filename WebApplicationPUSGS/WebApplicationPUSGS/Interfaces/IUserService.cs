using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Dto;

namespace WebApplicationPUSGS.Interfaces
{
    public interface IUserService
    {
        //Add the new user to the database
        User AddUser(User newUser);
        //Check if the user is in the databse and create the token for him
        UserDto LoginUser(UserDto userDto);
    }
}
