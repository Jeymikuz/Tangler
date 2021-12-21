﻿using Application.Core;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Statuses.EditIndex
{
    public class EditIndexCommand : IRequest<Result<Unit>>
    {
        public int GroupId { get; set; }
        public EditIndexDto Status1{ get; set; }
        public EditIndexDto Status2{ get; set; }
    }
}
