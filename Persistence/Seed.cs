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
                var userAdmin = new AppUser()
                {
                    DisplayName = "Peter Parker",
                    UserName = "admin",
                    Email = "admin@tangler.com",
                };

                await userManager.CreateAsync(userAdmin, "Password");
                await userManager.AddClaimAsync(userAdmin, new Claim("IsMain", "true"));

                var status1 = new Status
                {
                    Name = "Nowe Zamówienia",
                    Color = "#29D2A6"
                };

                var company1 = new Company
                {
                    Name = "Avengers",
                    NIP = "1234567890",
                    IsDeleted = false
                };

                company1.Statuses.Add(status1);
                company1.Users.Add(userAdmin);

                context.Companies.Add(company1);
                context.SaveChanges();

                status1 = company1.Statuses.FirstOrDefault();

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
                    Status = status1,
                    Products = products
                    
                };

                company1.Orders.Add(order);

                var normalUser = new AppUser()
                {
                    DisplayName = "Peter Quill",
                    UserName = "user",
                    Email = "user@tangler.com",
                };

                await userManager.CreateAsync(normalUser, "Password");
                await userManager.AddClaimAsync(normalUser, new Claim("IsMain", "true"));

                var status2 = new Status
                {
                    Name = "Nowe Zamówienia",
                    Color = "#29BED2"
                };

                var company2 = new Company
                {
                    Name = "Guradians of The Galaxy",
                    NIP = "1234567890",
                    IsDeleted = false
                };

                company2.Statuses.Add(status2);
                company2.Users.Add(normalUser);

                context.Companies.Add(company2);

                context.SaveChanges();
            }


        }
    }
}
