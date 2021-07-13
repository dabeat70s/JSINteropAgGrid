using System;

namespace BethanysPieShopHRM.ServerApp.Services.Settings
{
  public interface IUserSettingsService
  {
    UserSettings UserSettings { get; set; }

    event EventHandler<UserSettingsChangedEventArgs> UserSettingsChanged;

    void RaiseSettingsChanged();
  }
}