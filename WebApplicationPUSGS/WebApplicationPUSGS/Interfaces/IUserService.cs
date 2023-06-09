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
        
        UserDtoRegistration AddUser(UserDtoRegistration newUser);
        
        string LoginUser(UserDtoLogin userDto);

        void DeleteUserById(int id);

        UserDtoRegistration GetUserById(int id);

        UserDtoApprovedVerified GetUserByEmail(string email);

        List<UserDtoApprovedVerified> GetUsers();

        UserDtoRegistration UpdateUser(int id, UserDtoRegistration userDtoRegistration);

        UserDtoStatus UpdateUserStatus(UserDtoStatus userDtoStatus);

        bool UploadImage(Microsoft.AspNetCore.Http.IFormFile file, string email);

        byte[] GetImage(string email);
    }
}
