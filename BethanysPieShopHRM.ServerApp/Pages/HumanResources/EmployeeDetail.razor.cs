using BethanysPieShopHRM.ComponentsLibrary.Map;
using BethanysPieShopHRM.ServerApp.Services.Data;
using BethanysPieShopHRM.Shared;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.ServerApp.Pages.HumanResources
{
  public partial class EmployeeDetail : ComponentBase
  {
    [Inject]
    public IEmployeeDataService EmployeeDataService { get; set; }

    [Parameter]
    public string EmployeeId { get; set; }

    public List<Marker> MapMarkers { get; set; } = new List<Marker>();

    public Employee Employee { get; set; } = new Employee();

    protected override async Task OnInitializedAsync()
    {
      Employee = await EmployeeDataService.GetEmployeeDetails(int.Parse(EmployeeId));

      MapMarkers = new List<Marker>
            {
                new Marker{Description = $"{Employee.FirstName} {Employee.LastName}",  ShowPopup = false, X = Employee.Longitude, Y = Employee.Latitude}
            };
    }
  }
}
