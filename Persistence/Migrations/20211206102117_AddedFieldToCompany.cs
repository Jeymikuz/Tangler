using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class AddedFieldToCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StatusGroupId",
                table: "Status",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StatusGroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StatusGroup_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Status_StatusGroupId",
                table: "Status",
                column: "StatusGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_StatusGroup_CompanyId",
                table: "StatusGroup",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Status_StatusGroup_StatusGroupId",
                table: "Status",
                column: "StatusGroupId",
                principalTable: "StatusGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Status_StatusGroup_StatusGroupId",
                table: "Status");

            migrationBuilder.DropTable(
                name: "StatusGroup");

            migrationBuilder.DropIndex(
                name: "IX_Status_StatusGroupId",
                table: "Status");

            migrationBuilder.DropColumn(
                name: "StatusGroupId",
                table: "Status");
        }
    }
}
