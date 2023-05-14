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
        UserDtoRegistration AddUser(UserDtoRegistration newUser);
        //Check if the user is in the databse and create the token for him
        string LoginUser(UserDtoLogin userDto);

        void DeleteUserById(int id);

        UserDtoRegistration GetUserById(int id);

        UserDtoRegistration GetUserByEmail(string email);

        List<UserDtoRegistration> GetUsers();
    }
}
