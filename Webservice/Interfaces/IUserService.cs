using System.Threading.Tasks;
using Webservice.Database.Models;

namespace Webservice.Interfaces
{
    public interface IUserService
    {
        Task<User> AddUser(User data, string password);

        Task<User> SignInUser(string emailAddress, string password);
    }
}
