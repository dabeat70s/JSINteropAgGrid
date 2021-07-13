using System.Threading.Tasks;

namespace BethanysPieShopHRM.ServerApp.Services.LocalStorage
{
  public interface ILocalStorageService
  {
    Task SetItemAsync<T>(string key, T item);

    Task<T> GetItemAsync<T>(string key);
  }
}