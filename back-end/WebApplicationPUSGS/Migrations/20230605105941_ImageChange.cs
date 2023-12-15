using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class ImageChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Articles");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageFile",
                table: "Users",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageFile",
                table: "Articles",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFile",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ImageFile",
                table: "Articles");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Users",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Articles",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "DateOfBirth", "Email", "FirstName", "Image", "LastName", "Password", "UserType", "Username", "Verified" },
                values: new object[] { 1, "Serbia, NoviSad, Temerinska 99", "1995-05-13", "peraperic@gmail.com", "Pera", "QzpcZmFrZXBhdGhccGVyYV9rZXAucG5n", "Peric", "3A2C878140187B8A880BE9FC9E7BF0A4CABD3C707245A5221EB05E3208AF5067", "admin", "PeraP123", 2 });
        }
    }
}
