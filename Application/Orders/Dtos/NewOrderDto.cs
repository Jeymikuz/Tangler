using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DTOs
{
    public record NewOrderDto
    (
        string clientLogin,
        string firstName,
        string lastName,
        string phoneNumber,
        string email,
        int statusId
    );
}
