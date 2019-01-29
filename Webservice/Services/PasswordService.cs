using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Webservice.Interfaces;

namespace CheckWebApp.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly ILogger<PasswordService> _logger;
        private readonly Lazy<RandomNumberGenerator> _randomNumberGenerator = new Lazy<RandomNumberGenerator>(RandomNumberGenerator.Create);

        public PasswordService(ILogger<PasswordService> logger)
        {
            _logger = logger;
        }

        public byte[] HashUserPassword(string password)
        {
            _logger.LogInformation("Hashing user password");
            const KeyDerivationPrf pbkdf2Prf = KeyDerivationPrf.HMACSHA512; // default for Rfc2898DeriveBytes
            const int pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
            const int pbkdf2SubkeyLength = 256 / 8; // 256 bits
            const int saltSize = 128 / 8; // 128 bits

            // Produce a version 2 (see comment above) text hash.
            var salt = new byte[saltSize];
            _randomNumberGenerator.Value.GetBytes(salt);
            var subkey = KeyDerivation.Pbkdf2(password, salt, pbkdf2Prf, pbkdf2IterCount, pbkdf2SubkeyLength);

            var outputBytes = new byte[1 + saltSize + pbkdf2SubkeyLength];
            outputBytes[0] = 0x00; // format marker
            Buffer.BlockCopy(salt, 0, outputBytes, 1, saltSize);
            Buffer.BlockCopy(subkey, 0, outputBytes, 1 + saltSize, pbkdf2SubkeyLength);
            return outputBytes;
        }

        public PasswordVerificationResult VerifyPassword(byte[] hashedPassword, string providedPassword)
        {
            _logger.LogInformation("Verifing password hash");
            if (hashedPassword == null)
            {
                throw new ArgumentNullException(nameof(hashedPassword));
            }
            if (providedPassword == null)
            {
                throw new ArgumentNullException(nameof(providedPassword));
            }

            // read the format marker from the hashed password
            if (hashedPassword.Length == 0)
            {
                return PasswordVerificationResult.Failed;
            }

            return VerifyHashedPassword(hashedPassword, providedPassword) ? PasswordVerificationResult.Success : PasswordVerificationResult.Failed;
        }

        private static bool VerifyHashedPassword(byte[] hashedPassword, string password)
        {
            const KeyDerivationPrf pbkdf2Prf = KeyDerivationPrf.HMACSHA512; // default for Rfc2898DeriveBytes
            const int pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
            const int pbkdf2SubkeyLength = 256 / 8; // 256 bits
            const int saltSize = 128 / 8; // 128 bits

            // We know ahead of time the exact length of a valid hashed password payload.
            if (hashedPassword.Length != 1 + saltSize + pbkdf2SubkeyLength)
            {
                return false; // bad size
            }

            var salt = new byte[saltSize];
            Buffer.BlockCopy(hashedPassword, 1, salt, 0, salt.Length);

            var expectedSubkey = new byte[pbkdf2SubkeyLength];
            Buffer.BlockCopy(hashedPassword, 1 + salt.Length, expectedSubkey, 0, expectedSubkey.Length);

            // Hash the incoming password and verify it
            var actualSubkey = KeyDerivation.Pbkdf2(password, salt, pbkdf2Prf, pbkdf2IterCount, pbkdf2SubkeyLength);
            return ByteArraysEqual(actualSubkey, expectedSubkey);
        }

        private static bool ByteArraysEqual(IReadOnlyList<byte> a, IReadOnlyList<byte> b)
        {
            if (a == null && b == null)
            {
                return true;
            }
            if (a == null || b == null || a.Count != b.Count)
            {
                return false;
            }
            var areSame = true;
            for (var i = 0; i < a.Count; i++)
            {
                areSame &= (a[i] == b[i]);
            }
            return areSame;
        }
    }
}
