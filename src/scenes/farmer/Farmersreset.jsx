import { useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { getFarmersPasswordHistoryReset } from '../../actions/farmer.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Farmersreset = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getFarmersPasswordHistoryReset())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.farmerReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    const columns = [
        { field: 'id', headerName: 'ลำดับ', headerAlign: 'center', align: 'center'},
        {
            field: 'username',
            headerName: 'ชื่อเข้าระบบ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
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
            field: 'tambon',
            headerName: 'ตำบล',
            flex: 1,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphoe',
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
            field: 'passwordupdate',
            headerName: 'วันที่ขอดำเนินการ',
            flex: 1,
            cellClassName: "name-column--cell"
        },              

    ]

    return (
        <Box m="20px">
            <Header title="ประวัติการขอรีเซ็ตรหัสผ่าน" subtitle="รายการประวัติการขอรีเซ็ตรหัสผ่านของเกษตรกร" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: 1,
                    borderColor: colors.greenAccent[500]
                },
                "& .MuiDataGrid-cell": {
                    boderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-virtualScroller": {
                    // backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    // backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                {/* { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Box display="flex" justifyContent="end">
                    <Button  
                        sx={{
                            // backgroundColor: colors.blueAccent[600],
                            backgroundColor: colors.greenAccent[600],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            mr: "10px",
                            mb: "10px",
                            '&:hover': {backgroundColor: colors.blueAccent[700]}
                        }}
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        เพิ่มข้อมูล
                    </Button>
                </Box> : undefined } */}
                
                    { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                    { result ?
                    <DataGrid
                        rows={result}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                            toolbar: {
                              csvOptions: { disableToolbarButton: true },
                              printOptions: {
                                disableToolbarButton: false,
                                hideFooter: true,
                                hideToolbar: true, // ซ่อน headers column, filters, exports ตอนพิมพ์
                                fields: [
                                    'id',
                                    'username',
                                    'firstname',
                                    'lastname',
                                    'cid',
                                    'hno',                                    
                                    'moo',
                                    'tambon',
                                    'amphoe',
                                    'province',
                                    'postcode',
                                    'tel',
                                    'status',
                                ],
                              },
                            },
                        }} 
                        // onSelectionModelChange={(ids) => {
                        //     const selectedIDs = new Set(ids)
                        //     const selectedRowData = result.filter((row) => 
                        //         selectedIDs.has(row.id.toString())
                        //     )
                        //     console.log(selectedRowData)
                        // }}
                        // onRowClick={handleRowClick}
                    /> : undefined}
            </Box>
        </Box>
    )
}

export default Farmersreset