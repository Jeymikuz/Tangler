using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InvoicesFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Invoice",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCreated",
                table: "Invoice",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "IsCreated",
                table: "Invoice");
        }
    }
}
