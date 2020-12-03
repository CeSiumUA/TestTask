using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestTask.Models
{
    public class EmployeePosition
    {
        [Key]
        public int Id { get; set; }
        public Position Position { get; set; }
        public Employee Employee { get; set; }
        public double Salary { get; set; }
        public DateTime AssignDate { get; set; }
        public DateTime FiredDate { get; set; }
    }
}
