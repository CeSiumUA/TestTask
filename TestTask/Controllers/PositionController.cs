using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private DatabaseContext databaseContext;
        public PositionController(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        [HttpPost("addposition")]
        public async Task<IActionResult> AddPosition([FromBody] Position Position)
        {
            if ((await databaseContext.Positions.FirstOrDefaultAsync(x => x.PositionName.ToLower() == Position.PositionName.ToLower())) != null)
            {
                return Conflict();
            }
            await databaseContext.Positions.AddAsync(Position);
            await databaseContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("positions")]
        public async Task<IActionResult> GetPositions()
        {
            var positions = await databaseContext.Positions.ToListAsync();
            return new JsonResult(positions);
        }
    }
}
