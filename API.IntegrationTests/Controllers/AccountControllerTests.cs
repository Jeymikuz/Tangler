using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using AutoFixture;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using NUnit.Framework;

namespace API.IntegrationTests.Controllers
{
    public class AccountControllerTests
    {
        [Test]
        public async Task Should_Login_Succesfull()
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
        }
    }
}
