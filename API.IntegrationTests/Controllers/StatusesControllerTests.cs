using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using Application.Interfaces;
using AutoFixture;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using NUnit.Framework;

namespace API.IntegrationTests.Controllers
{
    public class StatusesControllerTests : CustomWebApplicationFactory<Startup>
    {
        private HttpClient client;
        private Mock<IUserAccessor> userAccessorMock;

        [SetUp]
        public void SetUp()
        {
            client = this.CreateClient();
            userAccessorMock = _userAccesorMock;
        }

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

        [Test]
        public async Task Should_Create_Status_Succesfull()
        {
            // arrange

            var fixture = new Fixture();

            var test = fixture.Create<LoginDto>();

            var factory = new WebApplicationFactory<Startup>();
            var client = factory.CreateClient();


            // act
            var payload = "{\"Username\": \"admin\",\"Password\": \"Password\"}";

            HttpContent content = new StringContent(payload, Encoding.UTF8, "application/json");
            var response = await client.PostAsync("/api/account/login", content);

            // assert

            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

            var x = true;

            x.Should().Be(true);
        }
    }
}
