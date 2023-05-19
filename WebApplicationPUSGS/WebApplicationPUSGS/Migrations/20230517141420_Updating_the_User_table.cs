using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class Updating_the_User_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Approved",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Verified",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: -1,
                columns: new[] { "Approved", "DateOfBirth", "UserType" },
                values: new object[] { true, "1995-05-13", "admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approved",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Verified",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: -1,
                columns: new[] { "DateOfBirth", "UserType" },
                values: new object[] { "1995 - 05 - 13", "Admin" });
        }
    }
}
