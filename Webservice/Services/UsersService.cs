using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Webservice.Database;
using Webservice.Database.Models;
using Webservice.Interfaces;

namespace Webservice.Services
{
    public class UsersService : IUserService
    {
        private readonly ILogger<UsersService> _logger;
        private readonly DatabaseContext _databaseContext;
        private readonly IPasswordService _passwordService;

        public UsersService(ILogger<UsersService> logger, DatabaseContext databaseContext,
            IPasswordService passwordService)
        {
            _logger = logger;
            _databaseContext = databaseContext;
            _passwordService = passwordService;
        }

        public async Task<User> AddUser(User data, string password)
        {
            data.Credentials = _passwordService.HashUserPassword(password); // or maybe a combination of the email and the password
            var newUser = _databaseContext.Users.Add(data);

            await _databaseContext.SaveChangesAsync();
            _logger.LogInformation($"Added new user to the database {data.EmailAddress}"); // don't log usernames of email addresses GDPR ehm ehm
            return newUser.Entity;
        }

        public async Task<User> SignInUser(string emailAddress, string password)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(x => x.EmailAddress == emailAddress);
            if (user == null) return null;

            var passwordResult = _passwordService.VerifyPassword(user.Credentials, password);
            if (passwordResult != PasswordVerificationResult.Success) return null;

            _logger.LogInformation("User signed in");
            return user;
        }
    }
}
