using Microsoft.JSInterop;
using System.Text.Json;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.ServerApp.Services.LocalStorage
{   
    public class LocalStorageService : ILocalStorageService
  {
        private readonly IJSRuntime _jsRuntime;

        public LocalStorageService(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }
        public async Task SetItemAsync<T>(string key, T item)
    {
            // TODO: Store item in local storage
            await _jsRuntime.InvokeVoidAsync("localStorage.setItem",
            key, JsonSerializer.Serialize(item));
        }

    public async Task<T> GetItemAsync<T>(string key)
    {
            // TODO: Get item from local storage
            //return default;
            var json = await _jsRuntime.InvokeAsync<string>("localStorage.getItem", key);
            return string.IsNullOrEmpty(json)
              ? default
              : JsonSerializer.Deserialize<T>(json);
        }
  }
}
