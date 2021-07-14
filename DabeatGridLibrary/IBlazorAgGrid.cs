using System.Collections.Generic;

namespace DabeatGridLibrary
{
    public interface IBlazorAgGrid
    {
        IList<ColumnDefinition> ColumnDefs { get; }
    }
}