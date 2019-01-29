using Microsoft.AspNetCore.Identity;

namespace Webservice.Interfaces
{
    public interface IPasswordService
    {
        byte[] HashUserPassword(string password);

        PasswordVerificationResult VerifyPassword(byte[] hashedPassword, string providedPassword);
    }
}
