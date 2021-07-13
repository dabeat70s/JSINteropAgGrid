using System;

namespace BethanysPieShopHRM.ServerApp.Services.Settings
{
  public class UserSettingsService : IUserSettingsService
  {
    public event EventHandler<UserSettingsChangedEventArgs> UserSettingsChanged;

    public UserSettings UserSettings { get; set; } = new UserSettings
    {
      AppTitle = "Bethany's Pie Shop HRM",
      UserPictureUrl = "images/bethany.jpg",
      ShowOnlineIndicator = true
    };

    public void RaiseSettingsChanged()
    {
      UserSettingsChanged?.Invoke(this, new UserSettingsChangedEventArgs(UserSettings));
    }
  }
}
