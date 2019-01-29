using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Webservice.Database.Models;
using Webservice.Interfaces;
using Webservice.ViewModels;

namespace Webservice.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UsersController(ILogger<UsersController> logger, IUserService userService, IConfiguration configuration)
        {
            _logger = logger;
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<User> AddUser(UserCreate data)
        {
            var newUser = await _userService.AddUser(new User { EmailAddress = data.EmailAddress }, data.Password);

            return newUser;
        }

        [HttpPost]
        public async Task<ActionResult<UserLogin>> SignInUser(UserSignin data)
        {
            _logger.LogInformation("Signing user in");
            var user = await _userService.SignInUser(data.EmailAddress, data.Password);
            if (user != null)
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Role, "Some user role"),
                    new Claim(ClaimTypes.Name, user.EmailAddress),
                    new Claim("CustomUserIdentifier", user.Id.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("jwt")["key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

                var token = new JwtSecurityToken(
                    _configuration.GetSection("jwt")["issuer"],
                    _configuration.GetSection("jwt")["audience"],
                    claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds);

                _logger.LogInformation("Signed user in, sending back his login data");
                return new UserLogin
                {
                    JwtToken = new JwtSecurityTokenHandler().WriteToken(token),
                    EmailAddress = user.EmailAddress,
                    Id = user.Id
                };
            }

            return Unauthorized();
        }
    }
}
