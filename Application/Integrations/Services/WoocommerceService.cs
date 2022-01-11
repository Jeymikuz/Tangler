using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using WooCommerceNET;
using WooCommerceNET.WooCommerce.v3;
using WooCommerceNET.WooCommerce.v3.Extension;
using Order = Domain.Order;

namespace Application.Integrations.Services
{
    public class WoocommerceService : IManageOrders<WoocommerceService>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly ILogger<WoocommerceService> _logger;

        public WoocommerceService(DataContext context, IUserAccessor userAccessor, ILogger<WoocommerceService> logger)
        {
            _context = context;
            _userAccessor = userAccessor;
            _logger = logger;
        }
        public async Task DownloadLatestOrders()
        {
            var companies = await _context.Companies.Include(x => x.Integrations).ThenInclude(x => x.ClientKeys)
                .ToListAsync();

            if (companies is null) throw new NullReferenceException("Problem with retrieving companies from database");

            foreach (var company in companies)
            {
                foreach (var integration in company.Integrations.Where(x=>x.IntegrationType == IntegrationType.Woocommerce))
                {
                    var clientKey = integration
                        ?.ClientKeys.FirstOrDefault(x => x.Key == "client_key")
                        ?.Value;

                    var privateKey = integration
                        ?.ClientKeys.FirstOrDefault(x => x.Key == "private_key")
                        ?.Value;

                    if (string.IsNullOrEmpty(clientKey) || string.IsNullOrEmpty(privateKey))
                        throw new NullReferenceException("Problem with api keys");

                    var rest = new RestAPI(integration.SiteUrl + "/wp-json/wc/v3/", clientKey, privateKey);
                    var wc = new WCObject(rest);

                    var orders = new List<WooCommerceNET.WooCommerce.v3.Order>();

                    try
                    {
                        orders = await wc.Order.GetAll();
                        integration.ConnectionProblem = false;
                    }
                    catch (Exception e)
                    {
                        _logger.LogError($"Problem while downloading orders from integration: Integration Id: {integration.Id} , Error message: {e.Message}");
                        integration.ConnectionProblem = true;
                    }

                    var domainOrders = new List<Order>();

                    foreach (var order in orders)
                    {

                        var newOrder = new Order()
                        {
                            ClientLogin = "",
                            ExternalId = order.id.ToString(),
                            FirstName = order.billing.first_name,
                            LastName = order.billing.last_name,
                            ClientMessage = order.customer_note,
                            CreatedAt = DateTime.Now,
                            OrderedAt = (DateTime)order.date_created,
                            DeliveryAddress = new Address()
                            {
                                City = order.shipping.city,
                                Street = order.shipping.address_1,
                                ZipCode = order.shipping.postcode
                            },
                            DeliveryMethod = order.shipping.company,
                            DeliveryPrice = order.shipping_total,
                            Email = order.billing.email,
                            Invoice = new Invoice(),
                            InvoiceAddress = new Address(),
                            PhoneNumber = order.billing.phone,
                            Status = company.Statuses.FirstOrDefault(),
                            PaymentMethod = order.payment_method,
                            PickUpPoint = new PickUpPoint(),
                            Products = new List<OrderProduct>(),
                        };

                        foreach (var product in order.line_items)
                        {
                            newOrder.Products.Add(new OrderProduct()
                            {
                                Name = product.name,
                                Price = product.price,
                                SKU = product.sku,
                                ExternalId = product.product_id,
                                Quantity = product.quantity,
                            });
                        }

                        domainOrders.Add(newOrder);


                    }

                    domainOrders.RemoveAll(item =>
                        _context.Orders.Any(item2 => item2.ExternalId == item.ExternalId));

                    domainOrders.ForEach(x => company.Orders.Add(x));
                }
            }

            await _context.SaveChangesAsync();
        }

        public Task<Order> UpdateOrder(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
