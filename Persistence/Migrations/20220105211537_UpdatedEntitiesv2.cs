using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdatedEntitiesv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "PickUpPoint");

            migrationBuilder.DropColumn(
                name: "City",
                table: "PickUpPoint");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "PickUpPoint");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Invoice");

            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "PickUpPoint",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AddressId",
                table: "Invoice",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PickUpPoint_AddressId",
                table: "PickUpPoint",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_AddressId",
                table: "Invoice",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Address_AddressId",
                table: "Invoice",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PickUpPoint_Address_AddressId",
                table: "PickUpPoint",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Address_AddressId",
                table: "Invoice");

            migrationBuilder.DropForeignKey(
                name: "FK_PickUpPoint_Address_AddressId",
                table: "PickUpPoint");

            migrationBuilder.DropIndex(
                name: "IX_PickUpPoint_AddressId",
                table: "PickUpPoint");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_AddressId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "PickUpPoint");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Invoice");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "PickUpPoint",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "PickUpPoint",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "PickUpPoint",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Invoice",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Invoice",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Invoice",
                type: "text",
                nullable: true);
        }
    }
}
