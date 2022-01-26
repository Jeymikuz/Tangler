using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using Application.Integrations.Services;
using Application.Integrations.Woocommerce;
using Application.Integrations.Woocommerce.Create;
using Application.Integrations.Woocommerce.Delete;
using Application.Integrations.Woocommerce.List;
using Application.Interfaces;
using Domain.Enums;
using Infrastructure.Intergrations.Woocommerce;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class IntegrationsController : BaseApiController
    {

        //[HttpGet("{type}/{id}")]
        //public async Task<IActionResult> GetLatestOrders([FromRoute] string id,[FromRoute] IntegrationType integration)
        //{
        //    if (integration == IntegrationType.Woocommerce)
        //    {
        //        return HandleResult(await Mediator.Send(new GetLatestOrdersCommand() {IntegrationId = id}));
        //    }

        //    return BadRequest();
        //}

        [HttpPost]
        public async Task<IActionResult> AddIntegration(NewIntegrationDto dto)
        {
            if (dto.type == IntegrationType.Woocommerce)
            {
                return HandleResult(await Mediator.Send(new CreateWoocommerceCommand()
                    {SiteUrl = dto.siteUrl, ClientKey = dto.clientKey, PrivateKey = dto.privateKey, PrivateName = dto.privateName}));
            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetListOfIntegrations()
        {
            return HandleResult(await Mediator.Send(new GetIntegrationsListQuery()));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntegration([FromRoute] string id)
        {
            return HandleResult(await Mediator.Send(new DeleteIntegrationCommand(){Id = id}));
        }
    }
}
