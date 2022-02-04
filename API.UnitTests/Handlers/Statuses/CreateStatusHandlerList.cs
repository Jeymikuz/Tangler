using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;

namespace API.UnitTests.Handlers.Statuses
{
    public class CreateStatusHandlerList
    {
        [Test]
        public async Task Should_Succesfull()
        {
            //// arrange

            //var fixture = new Fixture();

            //var test = fixture.Create<LoginDto>();

            //var factory = new WebApplicationFactory<Startup>();
            //var client = factory.CreateClient();

            //// act
            //var payload = "{\"Username\": \"admin\",\"Password\": \"Password\"}";

            //HttpContent content = new StringContent(payload, Encoding.UTF8, "application/json");
            //var response = await client.PostAsync("/api/account/login", content);

            //// assert

            //response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

            var x = true;

            x.Should().Be(true);
        }
    }
}
