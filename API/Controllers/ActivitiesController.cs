using System.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController
    {



        [HttpGet]
        public async Task<ActionResult<List<Domain.Activity>>> GetAll()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Activity>> GetById(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> Create(Domain.Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command{Activity=activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id,Domain.Activity activity)
        {
            activity.Id=id;

            return Ok(await Mediator.Send(new Edit.Command{Activity=activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}