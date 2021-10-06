import React from 'react'
import {
    actionCellRenderer,
    onCellClicked,
    onRowEditingStarted,
    onRowEditingStopped,
} from './Action'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import swal from 'sweetalert';
import APIUpdateStatus from '../../api/APIUpdateStatus'

interface Props {
    rowData: Array<any>
}

const initColumnDefs = [
    { headerName: 'Number', field: 'code', sortable: true, filter: "agTextColumnFilter", floatingFilter: true },
    { headerName: 'Vendor', field: 'vendorName', sortable: true, flex: 1, filter: "agTextColumnFilter", floatingFilter: true },
    { headerName: 'Sum', field: 'sum', sortable: true, filter: true, flex: 1 },
    { headerName: 'Currency', field: 'currency', sortable: true, flex: 1, filter: "agTextColumnFilter", floatingFilter: true },
    {
        headerName: 'Date', field: 'date', sortable: true, filter: true, flex: 1, valueFormatter: (params: any) => {
            var localDateTime = new Date(params.value).toISOString().substring(0, 10);
            return localDateTime
        }
    },
    {
        headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true, flex: 1, valueFormatter: (params: any) => {
            var localDateTime = new Date(params.value).toISOString().substring(0, 10);
            return localDateTime
        }
    },
    {
        headerName: 'Memo', field: 'status', sortable: true, filter: true, flex: 1, editable: true,
        // cell editing ongoing soon
    },
    {
        headerName: "Action",
        minWidth: 150,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action",
        width: 80
    }
]

var colSpan = function (params: any) {
    return params.data === 2 ? 3 : 1;
};

const defaultColDef = {
    editable: false,
    resizable: true,
    colSpan: colSpan,
}

const onRowValueChanged = (event: any) => {
    swal({
        title: "Are you sure to update this row?",
        icon: "warning",
        // @ts-ignore
        buttons: true,
        dangerMode: true,
    })
        .then(willDelete => {
            if (willDelete) {
                const { status, id } = event.data
                console.log(status, id)
                APIUpdateStatus(status, id)
                    .then((res) => {
                        if (res.status === 403) swal("Error!", res.data.message, "warning")
                        else {
                            console.log(res)
                            swal("Updated!", res.statusText, "success")
                        }
                        // @ts-ignore
                        // window.location.reload(false); 
                    })
                    .catch((err) => console.error(err))
            }
        });
}


const KeyTarget: React.FC<Props> = ({
    rowData
}) => {

    return (
        <div className="ag-theme-alpine"
            style={{
                height: '500px',
            }}
        >

            <AgGridReact
                onRowEditingStopped={onRowEditingStopped}
                onRowEditingStarted={onRowEditingStarted}
                onCellClicked={onCellClicked}
                overlayLoadingTemplate={
                    '<span className="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                }
                columnDefs={initColumnDefs}
                rowData={rowData}
                rowSelection="multiple"
                editType="fullRow"
                defaultColDef={defaultColDef}
                suppressClickEdit={true}
                enableRangeSelection={true}
                clipboardDeliminator={","}
                onRowValueChanged={onRowValueChanged}
                suppressCopyRowsToClipboard={true}
                stopEditingWhenCellsLoseFocus={true}
                domLayout="autoHeight"
            />
        </div>
    );
}

export default KeyTarget;