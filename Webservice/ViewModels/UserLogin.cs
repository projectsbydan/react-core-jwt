using Webservice.Database.Models;

namespace Webservice.ViewModels
{
    public class UserLogin : User
    {
        public string JwtToken { get; set; }
    }
}
