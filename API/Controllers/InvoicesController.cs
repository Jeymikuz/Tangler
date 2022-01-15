using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Application.Documents.Invoices.GenerateInvoice;
using Application.Documents.Invoices.Get;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InvoicesController : BaseApiController
    {
        [HttpPost("{orderId}")]
        public async Task<IActionResult> GenerateInvoice([FromRoute] string orderId)
        {
            return HandleResult(await Mediator.Send(new CreateInvoiceCommand() {OrderId = orderId}));
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetInvoice([FromRoute] string orderId)
        {
            var data = await Mediator.Send(new GetInvoiceQuery() {OrderId = orderId , Context = HttpContext});

            if (data is null) return BadRequest("Invoice not found");

            var cd = new System.Net.Mime.ContentDisposition
            {
                // for example foo.bak
                FileName = "Invoice.pdf",

                // always prompt the user for downloading, set to true if you want 
                // the browser to try to show the file inline
                Inline = false,
            };
            Response.ContentType = "application/pdf";
            //Response.Headers.Add("Content-Disposition", cd.ToString());

            return File(data, "application/pdf");
        }
    }
}
