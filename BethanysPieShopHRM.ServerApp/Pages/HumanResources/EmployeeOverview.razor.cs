using BethanysPieShopHRM.ServerApp.Services.Data;
using BethanysPieShopHRM.Shared;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.ServerApp.Pages.HumanResources
{
    public partial class EmployeeOverview : ComponentBase
    {
        [Inject]
        public IEmployeeDataService EmployeeDataService { get; set; }

        public List<Employee> Employees { get; set; }

        public Employee SelectedEmployee { get; set; }
        protected override async Task OnInitializedAsync()
        {
            Employees = (await EmployeeDataService.GetAllEmployees()).ToList();
        }

        private void GridSelectionChanged(Employee employee)
        {
            SelectedEmployee = employee;
        }

        private void RowDragEnded(List<Employee> employees)
        {
            Employees = employees;
        }
    }
}
