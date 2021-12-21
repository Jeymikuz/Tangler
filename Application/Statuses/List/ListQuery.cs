using Application.Core;
using Domain;
using MediatR;
using System.Collections.Generic;

namespace Application.Statuses.List
{
    public class ListQuery : IRequest<Result<List<StatusGroup>>> { }
}
