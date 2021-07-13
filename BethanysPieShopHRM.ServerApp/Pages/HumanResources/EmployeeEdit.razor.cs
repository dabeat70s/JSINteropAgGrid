using BethanysPieShopHRM.ServerApp.Services;
using BethanysPieShopHRM.ServerApp.Services.Data;
using BethanysPieShopHRM.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.ServerApp.Pages.HumanResources
{
  public partial class EmployeeEdit : ComponentBase
  {
    [Inject]
    public IEmployeeDataService EmployeeDataService { get; set; }

    [Inject]
    public NavigationManager NavigationManager { get; set; }

    [Inject]
    public IJSRuntime JSRuntime { get; set; }

    [Parameter]
    public string EmployeeId { get; set; }

    public InputText LastNameInputText { get; set; }

    public Employee Employee { get; set; } = new Employee();

    //needed to bind to select to value
    protected string CountryId = string.Empty;
    protected string JobCategoryId = string.Empty;

    //used to store state of screen
    protected string Message = string.Empty;
    protected string StatusClass = string.Empty;
    protected bool Saved;

    protected override async Task OnInitializedAsync()
    {
      Saved = false;

      int.TryParse(EmployeeId, out var employeeId);

      if (employeeId == 0) //new employee is being created
      {
        Employee = new Employee();
      }
      else
      {
        Employee = await EmployeeDataService.GetEmployeeDetails(int.Parse(EmployeeId));
      }

    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
      if (firstRender)
      {
        await JSRuntime.InvokeVoidAsync("blazorInterop.focusElementById", "firstName");
      }
    }

    protected async Task HandleValidSubmit()
    {
      if (Employee.EmployeeId == 0) //new
      {
        var addedEmployee = await EmployeeDataService.AddEmployee(Employee);
        if (addedEmployee != null)
        {
          StatusClass = "alert-success";
          Message = "New employee added successfully.";
          Saved = true;
        }
        else
        {
          StatusClass = "alert-danger";
          Message = "Something went wrong adding the new employee. Please try again.";
          Saved = false;
        }
      }
      else
      {
        await EmployeeDataService.UpdateEmployee(Employee);
        StatusClass = "alert-success";
        Message = "Employee updated successfully.";
        Saved = true;
      }
    }

    protected void HandleInvalidSubmit()
    {
      StatusClass = "alert-danger";
      Message = "There are some validation errors. Please try again.";
    }

    protected async Task DeleteEmployee()
    {
      await EmployeeDataService.DeleteEmployee(Employee.EmployeeId);

      StatusClass = "alert-success";
      Message = "Deleted successfully";

      Saved = true;
    }

    protected void NavigateToOverview()
    {
      NavigationManager.NavigateTo("/employeeoverview");
    }
  }
}
