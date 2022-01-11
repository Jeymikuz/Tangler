using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Integrations.Woocommerce;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Services.HostedServices
{
    public class IntegrationOrderScheduler : IHostedService
    {
        private readonly ILogger<IntegrationOrderScheduler> _logger;
        private Timer _timer;
        private readonly IMediator _mediator;

        public IntegrationOrderScheduler(ILogger<IntegrationOrderScheduler> logger, IServiceScopeFactory serviceScopeFactory)
        {
            _logger = logger;

            var scope = serviceScopeFactory.CreateScope();

            _mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(
                DownloadOrdersFromIntegrations,
                null,
                TimeSpan.Zero,
                TimeSpan.FromMinutes(15)
            );

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        private void DownloadOrdersFromIntegrations(object state)
        {
            var getLatestOrdersCommand = new GetLatestOrdersCommand();
            _mediator.Send(getLatestOrdersCommand);
        }
    }
}
