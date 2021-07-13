using System;

namespace BethanysPieShopHRM.ServerApp.Services.Settings
{
  public class UserSettingsChangedEventArgs : EventArgs
  {
    public UserSettingsChangedEventArgs(UserSettings userSettings)
    {
      UserSettings = userSettings;
    }

    public UserSettings UserSettings { get; }
  }
}
