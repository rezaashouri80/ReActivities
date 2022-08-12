using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query:IRequest<List<Activity>>{}

        public class Command : IRequestHandler<Query, List<Activity>>
        {

            private readonly DataContext _context;

            public Command(DataContext context){

                _context=context;
            }



            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}