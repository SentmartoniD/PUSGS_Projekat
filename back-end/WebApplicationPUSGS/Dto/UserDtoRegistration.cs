﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPUSGS.Dto
{
    public class UserDtoRegistration
    {
        public int UserId { get; set; }//KELL IT HOGY LEGYEN AZ ID ????????????????????

        public string Username { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DateOfBirth { get; set; }

        public string Address { get; set; }

        public string UserType { get; set; }

        public byte[] ImageFile { get; set; }

        public string Password { get; set; }
    }
}
