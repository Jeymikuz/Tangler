using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Companies.Create;
using AutoFixture;
using Domain;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Persistence;

namespace API.UnitTests.Commands
{
    public class ComapniesHandlers
    {
        [Test]
        public async Task Should_Create_New_Company()
        {
            var options = new DbContextOptionsBuilder<DataContext>().UseInMemoryDatabase(databaseName: "DB").Options;

            var dbContext = new DataContext(options);

            var users = new List<AppUser>();

            var userManager = MockUserManager(users).Object;

            var mediator = new Mock<IMediator>();

            var fixture = new Fixture();


            var createDto = fixture.Create<CreateCompanyDto>();

            var command = new CreateCompanyCommand()
            {
                CompanyDto = createDto
            };

            var handler = new CreateCompanyHandler(dbContext, userManager);

            //act 

            var x = await handler.Handle(command, CancellationToken.None);

            x.IsSuccess.Should().Be(true);
;        }

        public static Mock<UserManager<TUser>> MockUserManager<TUser>(List<TUser> ls) where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var mgr = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);
            mgr.Object.UserValidators.Add(new UserValidator<TUser>());
            mgr.Object.PasswordValidators.Add(new PasswordValidator<TUser>());

            mgr.Setup(x => x.DeleteAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);
            mgr.Setup(x => x.CreateAsync(It.IsAny<TUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Callback<TUser, string>((x, y) => ls.Add(x));
            mgr.Setup(x => x.UpdateAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);

            return mgr;
        }
    }
}
