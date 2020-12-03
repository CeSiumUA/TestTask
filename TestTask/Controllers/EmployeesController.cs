using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private DatabaseContext databaseContext;
        public EmployeesController(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public async Task<IActionResult> AddEmployee([FromBody] EmployeePosition EmployeePosition)
        {
            var existingEmployeePosition = await databaseContext.EmployeePositions.Include(x => x.Position)
                .FirstOrDefaultAsync(x =>
                    x.AssignDate == EmployeePosition.AssignDate && x.FiredDate == EmployeePosition.FiredDate &&
                    x.Salary == EmployeePosition.Salary);
        }
    }
}
