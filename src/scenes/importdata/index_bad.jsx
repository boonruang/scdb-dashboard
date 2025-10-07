    import React, { useEffect } from 'react'
import { Box, useTheme,Button } from "@mui/material"
import Header from "../../components/Header"
import { mockImportData } from "../../data/mockImportData"
// import Cardimportdata from 'components/Cardimportdata'
import UploadExcelFormik from "components/UploadExcelFormik"
const Importdata = () => {

    return (
        <Box m="20px">
            <Header title="รายการแฟ้มข้อมูล" subtitle="รายการนำเข้าข้อมูล"/>
            <Box m="10px 0 0 0" height="100vh" sx={{ display: 'flex', justifyContent: "center", overflow:'scroll', overflowX: 'hidden'}}>
                {/* <Cardimportdata mockImportData={mockImportData} /> */}
                <UploadExcelFormik />
            </Box>
        </Box>
    )
}

export default Importdata
