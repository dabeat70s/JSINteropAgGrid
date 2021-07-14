(function () {

    window.ag_Grid = {
        gridOptionsByComponentId: {},
        initialize: function (componentId, gridDiv, dotNetObjRef) {

            var columnDefs = [
                { headerName: "Employee ID", field: "employeeId", sortable: true, filter: true },
                { headerName: "Firstname", field: "firstName", sortable: true, filter: true },
                { headerName: "Lastname", field: "lastName", sortable: true, filter: true },
                { headerName: "Email", field: "email", sortable: true, filter: true }
            ];

            var rowData = [
                { employeeId: 1, firstName: "Bethany", lastName: "Ried", email: "bethany@SoundLEJ.com" },
                { employeeId: 2, firstName: "Julia", lastName: "Developer", email: "julia@MusicLEJ.com" },
                { employeeId: 3, firstName: "Tony Sean", lastName: "Smith", email: "tony@MusicLEJ.com" }
            ];

            function onSelectionChanged() {
                var selectedRows = gridOptions.api.getSelectedRows();
                if (selectedRows.length === 1) {
                    //console.log(selectedRows[0].firstName);
                    dotNetObjRef.invokeMethodAsync("RaiseSelectionChangedAsync", selectedRows[0]);
                }
            };

            var gridOptions = {
                //columnDefs: columnDefs,
                //rowData: rowData,
                rowSelection: 'single',
                onSelectionChanged: onSelectionChanged,
                pagination: true,
                paginationAutoPageSize: true,
                suppressCellSelection: true
            };
            
           
            new agGrid.Grid(gridDiv, gridOptions);
            this.gridOptionsByComponentId[componentId] = gridOptions;
        },
        setRows: function (componentId, rowData) {
            this.gridOptionsByComponentId[componentId].api.setRowData(rowData);
        },
        setColumnDefs: function (componentId, ColumnDefs) {
            this.gridOptionsByComponentId[componentId].api.setColumnDefs(ColumnDefs);
        },
        dispose: function (componentId) {
            delete this.gridOptionsByComponentId[componentId];

        }

        // set up the ag-grid after the page has finished loading
        //document.addEventListener('DOMContentLoaded', function () {
        //    var gridDiv = document.querySelector('#myGrid');
        //    initialize(gridDiv);
        //});
    };

})();