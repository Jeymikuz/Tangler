using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Orders.Create
{
    public class CreateOrderCommandValidation : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderCommandValidation()
        {
            RuleFor(x => x.orderDto.email).EmailAddress();
            RuleFor(x => x.orderDto.statusId).NotEmpty();
        }
    }
}
