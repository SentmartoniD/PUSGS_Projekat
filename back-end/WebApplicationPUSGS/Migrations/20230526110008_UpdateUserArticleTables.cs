using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class UpdateUserArticleTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserSellerId",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_UserSellerId",
                table: "Articles",
                column: "UserSellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Users_UserSellerId",
                table: "Articles",
                column: "UserSellerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Users_UserSellerId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_UserSellerId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "UserSellerId",
                table: "Articles");
        }
    }
}
