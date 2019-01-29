using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webservice.Database.Models;

namespace Webservice.ViewModels
{
    public class UserCreate : User
    {
        public string Password { get; set; }
    }
}
