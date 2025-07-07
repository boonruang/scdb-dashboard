import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"

import Header from "../../components/Header"
import { mockDataResearchers } from "../../data/mockDataResearchers"

const Researchers = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'username', headerName: 'Username' },
        {
            field: 'firstname',
            headerName: 'ชื่อ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'lastname',
            headerName: 'นามสกุล',
            flex: 1,
            cellClassName: "name-column--cell"
        },              
        {
            field: 'hno',
            headerName: 'บ้านเลขที่',
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: 'moo',
            headerName: 'หมู่',
            type: "number",
            headerAlign: "left",
            align: "left",
        },        
        {
            field: 'thumbol',
            headerName: 'ตำบล',
            flex: 1,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphur',
            headerName: 'อำเภอ',
            flex: 1,
            cellClassName: "name-column--cell"
        },          
        {
            field: 'province',
            headerName: 'จังหวัด',
            flex: 1,
            cellClassName: "name-column--cell"
        },                  
        {
            field: 'tel',
            headerName: 'เบอร์ติดต่อ',
            flex: 1,
        },
        {
            field: 'cert',
            headerName: 'รหัสใบรับรอง',
            flex: 1,
        },
        {
            field: 'cert_date',
            headerName: 'วันได้รับ',
            flex: 1,
        },
        {
            field: 'cert_expire_date',
            headerName: 'วันหมดอายุ',
            flex: 1,
        },

    ]

    return (
        <Box m="20px">
            <Header title="ข้อมูลนักวิจัย" subtitle="รายการข้อมูลนักวิจัย" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    boderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <DataGrid
                    rows={mockDataResearchers}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Researchers