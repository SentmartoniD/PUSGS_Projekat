using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;

namespace WebApplicationPUSGS.Dto
{
    public class UserDtoApprovedVerified
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DateOfBirth { get; set; }

        public string Address { get; set; }

        public string UserType { get; set; }

        public byte[] ImageFile { get; set; }

        public Status Approved { get; set; }

        public Status Verified { get; set; }
    }
}
