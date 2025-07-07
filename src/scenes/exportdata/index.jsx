    import React, { useEffect } from 'react'
import { Box, useTheme,Button } from "@mui/material"
import Header from "../../components/Header"
import { mockExportData } from "../../data/mockExportData"
import Cardexportdata from 'components/Cardexportdata'

const Exportdata = () => {

    return (
        <Box m="20px">
            <Header title="รายการแฟ้มข้อมูล" subtitle="รายการส่งออกข้อมูลไฟล์"/>
            <Box m="40px 0 0 0" height="100vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', overflow:'scroll', overflowX: 'hidden'}}>
                <Cardexportdata mockExportData={mockExportData} />
            </Box>
        </Box>
    )
}

export default Exportdata