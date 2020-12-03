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
        [HttpPost("employeecreate")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeePosition EmployeePosition)
        {
            var existingEmployeePosition = await databaseContext.EmployeePositions.Include(x => x.Position).Include(x => x.Employee)
                .FirstOrDefaultAsync(x =>
                    x.AssignDate == EmployeePosition.AssignDate && x.FiredDate == EmployeePosition.FiredDate &&
                    x.Salary == EmployeePosition.Salary && x.Position.PositionName == EmployeePosition.Position.PositionName && x.Employee.FirstName == EmployeePosition.Employee.FirstName && x.Employee.LastName == EmployeePosition.Employee.LastName);
            if (existingEmployeePosition != null)
            {
                return Conflict();
            }

            var employee = await databaseContext.Employees.FirstOrDefaultAsync(x =>
                x.LastName == EmployeePosition.Employee.LastName && x.FirstName == EmployeePosition.Employee.FirstName);
            if (employee == null)
            {
                employee = new Employee()
                {
                    FirstName = EmployeePosition.Employee.FirstName,
                    LastName = EmployeePosition.Employee.LastName
                };
                await databaseContext.Employees.AddAsync(employee);
            }

            EmployeePosition.FiredDate = (EmployeePosition.FiredDate.HasValue)
                ? (EmployeePosition.FiredDate.Value.Year == 1) ? null : EmployeePosition.FiredDate
                : null;
            EmployeePosition.Employee = employee;
            EmployeePosition.Position =
                await databaseContext.Positions.FirstOrDefaultAsync(x => x.Id == EmployeePosition.Position.Id);
            await databaseContext.EmployeePositions.AddAsync(EmployeePosition);
            await databaseContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("firstnames/{firstname}")]
        public async Task<IActionResult> GetFirstName([FromRoute]string firstname)
        {
            return new JsonResult(await databaseContext.Employees.Select(x => x.FirstName).Where(x => x.ToLower().Contains(firstname.ToLower())).ToListAsync());
        }
        [HttpGet("lastnames/{lastname}")]
        public async Task<IActionResult> GetLastName([FromRoute] string lastname)
        {
            return new JsonResult(await databaseContext.Employees.Select(x => x.LastName).Where(x => x.ToLower().Contains(lastname.ToLower())).ToListAsync());
        }
        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployees([FromQuery] int skip, [FromQuery] int take)
        {
            List<EmployeePosition> employees = null;
            if (take > 0)
            {
                employees = await databaseContext.EmployeePositions.Include(x => x.Employee).Include(x => x.Position)
                    .OrderBy(x => x.Id).Skip(skip).Take(take).ToListAsync();
            }

            var totalAmount = await databaseContext.EmployeePositions.CountAsync();
            var result = new
            {
                employees = employees,
                totalAmount = totalAmount
            };
            return new JsonResult(result);
        }
        [HttpGet("workingemployees")]
        public async Task<IActionResult> GetWorkingEmployees([FromQuery] int skip, [FromQuery] int take)
        {
            List<EmployeePosition> employees = null;
            if (take > 0)
            {
                employees = await databaseContext.EmployeePositions.Include(x => x.Employee).Include(x => x.Position)
                    .OrderBy(x => x.Id).Where(x => x.FiredDate == null).Skip(skip).Take(take).ToListAsync();
            }

            var totalAmount = await databaseContext.EmployeePositions.Where(x => x.FiredDate == null).CountAsync();
            var result = new
            {
                employees = employees,
                totalAmount = totalAmount
            };
            return new JsonResult(result);
        }
    }
}
