using BethanysPieShopHRM.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.ServerApp.Services.Data
{
  public class InMemoryEmployeeDataService : IEmployeeDataService
  {
    private List<Employee> _employees;

    public InMemoryEmployeeDataService()
    {
      _employees = new List<Employee>
      {
        new Employee{EmployeeId=1, FirstName="Bethany",LastName="Smith",Email="bethany@bethanyspieshop.com",Latitude = 50.8503,Longitude = 4.3517},
        new Employee{EmployeeId=2, FirstName="Julia",LastName="Developer",Email="julia@bethanyspieshop.com",Latitude = 50.8503,Longitude = 4.3517},
        new Employee{EmployeeId=3, FirstName="Thomas Claudius",LastName="Huber",Email="thomas@thomasclaudiushuber.com",Latitude=47.9959, Longitude=7.85222},
        new Employee{EmployeeId=4, FirstName="Alex",LastName="Wolf",Email="alex@bethanyspieshop.com", Latitude = 50.11552, Longitude = 8.68417},
        new Employee{EmployeeId=5, FirstName="Barry",LastName="Luijbregts",Email="barry@bethanyspieshop.com", Latitude = 52.52437, Longitude = 13.41053},
        new Employee{EmployeeId=6, FirstName="Gill",LastName="Cleeren",Email="gill@bethanyspieshop.com", Latitude = 48.13743, Longitude = 11.57549},
        new Employee{EmployeeId=7, FirstName="Kevin",LastName="Dockx",Email="kevin@bethanyspieshop.com", Latitude = 47.55839, Longitude = 7.57327},
        new Employee{EmployeeId=8, FirstName="Roland",LastName="Guijt",Email="roland@bethanyspieshop.com", Latitude = 47.36667, Longitude = 8.55}
      };
    }

    public Task<Employee> AddEmployee(Employee employee)
    {
      var maxId = _employees.Max(emp => emp.EmployeeId);
      employee.EmployeeId = maxId++;
      _employees.Add(employee);
      return Task.FromResult(employee);
    }

    public Task DeleteEmployee(int employeeId)
    {
      var employee = _employees.FirstOrDefault(emp => emp.EmployeeId == employeeId);
      if (employee != null)
      {
        _employees.Remove(employee);
      }

      return Task.CompletedTask;
    }

    public Task<IEnumerable<Employee>> GetAllEmployees()
    {
      return Task.FromResult<IEnumerable<Employee>>(_employees);
    }

    public Task<Employee> GetEmployeeDetails(int employeeId)
    {
      var employee = _employees.FirstOrDefault(emp => emp.EmployeeId == employeeId);
      return Task.FromResult(employee);
    }

    public Task UpdateEmployee(Employee employee)
    {
      var employeeToUpdate = _employees.FirstOrDefault(emp => emp.EmployeeId == employee.EmployeeId);
      employeeToUpdate.FirstName = employee.FirstName;
      employeeToUpdate.LastName = employee.LastName;
      employeeToUpdate.Email = employee.Email;
      employeeToUpdate.Latitude = employee.Latitude;
      employeeToUpdate.Longitude = employee.Longitude;

      return Task.CompletedTask;
    }
  }
}
