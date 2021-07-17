using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DabeatGridLibrary
{
    public class ColumnDefinition
    {
        private string _field;

        public string HeaderName { get; set; }
        public string Field { get => _field; set => _field = EnsureCamelCase(value); }
        public bool Sortable { get; set; }
        public bool Filter { get; set; }
       

        private string EnsureCamelCase(string input)
        {
            return !string.IsNullOrWhiteSpace(input)
              ? char.ToLowerInvariant(input[0]) + input.Substring(1)
              : input;
        }
    }
}
