using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class CreateOrdersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    UserBuyerId = table.Column<int>(type: "int", nullable: false),
                    ArticleIds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmountOfArticles = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserBuyerId",
                        column: x => x.UserBuyerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserBuyerId",
                table: "Orders",
                column: "UserBuyerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
