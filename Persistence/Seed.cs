using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser()
                {
                    DisplayName = "Peter Parker",
                    UserName = "admin",
                    Email = "admin@tangler.com",
                };

                await userManager.CreateAsync(user, "Password");
                await userManager.AddClaimAsync(user, new Claim("IsMain", "true"));

                var status = new Status
                {
                    Name = "Nowe Zamówienia",
                    Color = "#FFFFFF"
                };

                var company = new Company
                {
                    Name = "Guardians of the Galaxy",
                    NIP = "1234567890",
                    IsDeleted = false
                };

                company.Statuses.Add(status);
                company.Users.Add(user);

                context.Companies.Add(company);
                context.SaveChanges();

                status = company.Statuses.FirstOrDefault();

                var address = new Address
                {
                    City = "Wrocław",
                    Street = "Legnicka 1234",
                    ZipCode = "99-999"
                };

                var products = new List<OrderProduct>
                {
                    new OrderProduct
                    {
                        Name="Benatar",
                        Description= "",
                        EAN = "5982714743285",
                        Quantity = 1,
                        SKU="S01"
                    }
                };

                var order = new Order
                {
                    FirstName = "Peter",
                    LastName = "Quill",
                    PhoneNumber = "+48 997 998 999",
                    Email = "gotg@gmail.com",
                    PaymentMethod = "Przelew Bankowy",
                    DeliveryMethod = "Kurier Inpost",
                    DeliveryAddress = address,
                    InvoiceAddress = address,
                    ClientMessage = "Proszę o szybką wysyłkę :)",
                    Status = status,
                    Products = products
                    
                };

                company.Orders.Add(order);
                context.SaveChanges();
            }


        }
    }
}
