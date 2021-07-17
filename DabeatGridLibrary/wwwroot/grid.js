(function () {

    window.ag_Grid = {
        gridOptionsByComponentId: {},
        initialize: function (componentId, gridDiv, dotNetObjRef, isRowDragable) {

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
            function onRowDragEnd(data) {
                var objectToMove = data.node.data;
                var indexToMoveTo = data.overIndex;

                //delete id when no Guid
                //delete objectToMove.id;
                
                var retuenEnt = dotNetObjRef.invokeMethodAsync("RaiseOnRowDrag", objectToMove, indexToMoveTo);
                console.log("retuenEnd", retuenEnt);
                if (retuenEnt == null) {
                    alert("your drag position was not affected.");
                    
                }

                
            }
            function onRowDragEnter(data) {
                var objectToMove = data.node.data;
                var indexToMoveTo = data.overIndex;
                //delete objectToMove.id;
               
                // dotNetObjRef.invokeMethodAsync("SetInitDragProp", objectToMove, indexToMoveTo);
                
            };

            function getDetailRowData(data) {
                console.log("getDetailRowData = ", data);
            };

            var gridOptions;
            if (isRowDragable) {
                gridOptions = {
                    //suppressMoveWhenRowDragging: true,
                    immutableData: true,
                    rowDragManaged: true,
                    animateRows: true,
                    rowSelection: 'single',
                    onSelectionChanged: onSelectionChanged,
                    onRowDragEnd: onRowDragEnd,
                    onRowDragEnter: onRowDragEnter,
                    getDetailRowData: getDetailRowData
                };
            } else {
                gridOptions = {
                    //columnDefs: columnDefs,
                    //rowData: rowData,  
                    animateRows: true,
                    rowSelection: 'single',
                    onSelectionChanged: onSelectionChanged,
                    pagination: true,
                    paginationAutoPageSize: true,
                    getDetailRowData: getDetailRowData
                    //suppressCellSelection: true,
                    //onRowDragEnd: onRowDragEnd,
                    //onRowDragEnter: onRowDragEnter
                };
            }           
           
            new agGrid.Grid(gridDiv, gridOptions);
            this.gridOptionsByComponentId[componentId] = gridOptions;
        },
        setRows: function (componentId, rowData) {
            //rowData.forEach((dataObj, indexObj) => { dataObj.id = indexObj });
            console.log("RowData = ", rowData);

            this.gridOptionsByComponentId[componentId].api.setRowData(rowData);
        },
        setColumnDefs: function (componentId, ColumnDefs, isRowDragable) {
            isRowDragable ? (ColumnDefs[0].rowDrag = true) : null;
           
            this.gridOptionsByComponentId[componentId].api.setColumnDefs(ColumnDefs);
            console.log( "1st = ",ColumnDefs[0]);
            //ColumnDefs[0].rowDrag = true;
            //console.log("2st = ", ColumnDefs[0]);
            //console.dir(ColumnDefs[0]);
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