const actionCellRenderer = (params: any) => {
    let eGui = document.createElement("div");   

    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell: any) => {
        return cell.rowIndex === params.node.rowIndex;
    });

    if (isCurrentRowEditing) {
        eGui.innerHTML = `
    <i class="fa fa-check" data-action="update" style="color:green"></i>
    <i class="fa fa-times" data-action="cancel"></i>
  `;
    } else {
        eGui.innerHTML = `
    <i class="fa fa-edit" data-action="edit" style="color:blue"></i>
  `;
    }

    return eGui;
}

const onCellClicked = (params: any) => {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
        let action = params.event.target.dataset.action;

        if (action === "edit") {
            console.log(params.data)

            params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                // gets the first columnKey
                colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
                
            });
        }

        // if (action === "delete") {
        //     console.log(params.data)
        //     const { name } = params.data
        //     swal({
        //         title: "Are you sure to delete this row?"+" Name: " +name,
        //         text: "Once deleted, you will not be able to recover this key!",
        //         icon: "warning",
        //         // @ts-ignore
        //         buttons: true,
        //         dangerMode: true,
        //     })
        //         .then(willDelete => {
        //             if (willDelete) {
        //                 swal("Deleted!", "Your key has been deleted!", "success");
        //                 params.api.applyTransaction({
        //                     remove: [params.node.data]
        //                 });
        //             }
        //         });
        // }

        if (action === "update") {
            params.api.stopEditing(false);
        }

        if (action === "cancel") {
            params.api.stopEditing(true);
        }
    }
}

const onRowEditingStarted = (params: any) => {
    params.api.refreshCells({
        columns: ["action"],
        rowNodes: [params.node],
        force: true
    });
}

const onRowEditingStopped = (params: any) => {
    params.api.refreshCells({
        columns: ["action"],
        rowNodes: [params.node],
        force: true
    });
}

const onClickEdit: any = () => {
    function CellRenderer() { }
    CellRenderer.prototype.createGui = function () {
        var template =
            // should be a pencil icon 
            '<span><span id="theValue" style="padding-left: 4px;"></span><button style="float:right" id="theButton"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>';
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = template;
        this.eGui = tempDiv.firstElementChild;
    };
    CellRenderer.prototype.init = function (params: any) {
        this.createGui();
        this.params = params;
        var eValue = this.eGui.querySelector("#theValue");
        eValue.innerHTML = params.value;
        this.eButton = this.eGui.querySelector("#theButton");
        this.buttonClickListener = this.onButtonClicked.bind(this);
        this.eButton.addEventListener("click", this.buttonClickListener);
    };
    CellRenderer.prototype.onButtonClicked = function () {
        var startEditingParams = {
            rowIndex: this.params.rowIndex,
            colKey: this.params.column.getId()
        };
        this.params.api.startEditingCell(startEditingParams);
    };
    CellRenderer.prototype.getGui = function () {
        return this.eGui;
    };
    CellRenderer.prototype.destroy = function () {
        this.eButton.removeEventListener("click", this.buttonClickListener);
    };
    return CellRenderer;
}

  

export {
    actionCellRenderer,
    onCellClicked,
    onRowEditingStarted,
    onRowEditingStopped,
    onClickEdit
}