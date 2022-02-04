using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;

namespace API.IntegrationTests
{
    public class CustomWebApplicationFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint>
    where TEntryPoint : class
    {
        public CustomWebApplicationFactory()
        {
            this.ClientOptions.AllowAutoRedirect = false;
            this.ClientOptions.BaseAddress = new Uri("https://localhost");
        }

        public Mock<IUserAccessor> _userAccesorMock { get; private set; }

        public void VerifyAllMocks() => Mock.VerifyAll(_userAccesorMock);

        protected override void ConfigureClient(HttpClient client)
        {
            using (var serviceScope = this.Services.CreateScope())
            {
                var serviceProvider = serviceScope.ServiceProvider;
                _userAccesorMock = serviceProvider.GetRequiredService<Mock<IUserAccessor>>();
            }

            base.ConfigureClient(client);
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder) =>
            builder
                .UseEnvironment("Testing")
                .UseStartup<TestStartUp>();

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.VerifyAllMocks();
            }

            base.Dispose(disposing);
        }
    }
}
