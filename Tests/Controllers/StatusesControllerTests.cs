using API.Controllers;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Controllers
{
    public class StatusesControllerTests
    {
        [Fact]
        public void StatusesController_GetStatusesFromDatabase()
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseInMemoryDatabase(MethodBase.GetCurrentMethod().Name);

            var listQuery = new Application.Statuses.List.ListQuery();

            var userAccessorMock = new Mock<IUserAccessor>();
            userAccessorMock.Setup(x => x.GetUsername()).Returns("admin");

            using (var ctx = new DataContext(optionsBuilder.Options))
            {
                //Seed.SeedDataTests(ctx).GetAwaiter().GetResult();
                //var result = new Application.Statuses.List.ListHandler(userAccessorMock.Object, ctx).Handle(listQuery, new System.Threading.CancellationToken()).Result;
                //Assert.NotNull(result);
            }
        }
    }
}
