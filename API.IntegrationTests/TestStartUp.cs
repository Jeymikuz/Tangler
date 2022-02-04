using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace API.IntegrationTests
{
    public class TestStartUp : Startup
    {
        private readonly Mock<IUserAccessor> _userAccessorMock;

        public TestStartUp(IConfiguration configuration) : base(configuration)
        {
            this._userAccessorMock = new Mock<IUserAccessor>(MockBehavior.Strict);
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(this._userAccessorMock);

            base.ConfigureServices(services);

            services.AddSingleton(this._userAccessorMock.Object);
        }
    }
}
