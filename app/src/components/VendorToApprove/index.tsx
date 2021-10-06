import React, { useState, useEffect } from 'react'
// import styles from './VendorToApprove.module.css'

import Card from '../Card'
import VendorGrid from '../Grid/VendorGrid'

import APIGetVendors from '../../api/APIGetVendors'
const Index: React.FC = () => {

    const [rowData, setRowData] = useState([])

    // OPEN VENDOR
    var status = "open"
    useEffect(() => {
        APIGetVendors(true, status)
            .then((data) => {
                console.log(data)
                setRowData(data.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <Card maxHeight={'400px'}>
            <h3>Vendor bills to approve</h3>
            <VendorGrid  rowData = {rowData}/>
        </Card>
    )
}

export default Index;