using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class Updating_the_User_table2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: -1);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "Approved", "DateOfBirth", "Email", "FirstName", "Image", "LastName", "Password", "UserType", "Username", "Verified" },
                values: new object[] { 1, "Serbia, NoviSad, Temerinska 99", true, "1995-05-13", "peraperic@gmail.com", "Pera", "QzpcZmFrZXBhdGhccGVyYV9rZXAucG5n", "Peric", "3A2C878140187B8A880BE9FC9E7BF0A4CABD3C707245A5221EB05E3208AF5067", "admin", "PeraP", false });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "Approved", "DateOfBirth", "Email", "FirstName", "Image", "LastName", "Password", "UserType", "Username", "Verified" },
                values: new object[] { -1, "Serbia, NoviSad, Temerinska 99", true, "1995-05-13", "peraperic@gmail.com", "Pera", "QzpcZmFrZXBhdGhccGVyYV9rZXAucG5n", "Peric", "3A2C878140187B8A880BE9FC9E7BF0A4CABD3C707245A5221EB05E3208AF5067", "admin", "PeraP", false });
        }
    }
}
