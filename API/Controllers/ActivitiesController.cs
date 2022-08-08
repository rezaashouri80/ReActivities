using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context=context;
        }


    }
}