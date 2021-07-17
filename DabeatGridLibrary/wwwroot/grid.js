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
                    rowClass:'my-grid2',
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
                    rowClass: 'my-grid2',
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
            ColumnDefs.push({ field: "src", cellRenderer: AddImage, cellClass: 'img-cells' });
            ColumnDefs.forEach((def) => {
                console.log("def.field = ", def.field);
            });
           
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
    function AddImage(data) {
        console.log("adding imagessss = ", data);
        var content = "";
        var srcs = "data:image/jpeg;base64,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"
        content += `<img src='${srcs}'/>`;
        return content;
    }
    
})();