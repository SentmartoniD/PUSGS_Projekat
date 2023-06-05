using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplicationPUSGS.Migrations
{
    public partial class ImageChange2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Articles",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
