using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class UpdateOrderTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DateOfOrder",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfOrder",
                table: "Orders");
        }
    }
}
