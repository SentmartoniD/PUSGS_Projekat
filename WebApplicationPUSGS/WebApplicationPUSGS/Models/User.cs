using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationPUSGS.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set;}

        public string DateOfBirth { get; set;}

        public string Address { get; set; }

        public string UserType { get; set; }

        public string Image { get; set; }

        public string Password { get; set; }

        public Status Approved { get; set; }

        public Status Verified { get; set; }

        public List<Article> Articles { get; set; }

        public List<Order> Orders { get; set; }
    }
}
