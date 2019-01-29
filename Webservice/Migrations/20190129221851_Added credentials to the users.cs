using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Webservice.Migrations
{
    public partial class Addedcredentialstotheusers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Credentials",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credentials",
                table: "Users");
        }
    }
}
