using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webservice.Database.Models;

namespace Webservice.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
            Database.Migrate();
        }

        public DbSet<User> Users { get; set; }
    
    }
}
