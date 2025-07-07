import { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
// import { mockDataFarmers } from "../../data/mockDataFarmers"
import AddIcon from '@mui/icons-material/Add';
import { getFarmersRegisterStatus } from '../../actions/register.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { ConstructionOutlined } from "@mui/icons-material";

const Farmerspending = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getFarmersRegisterStatus())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.registerReducer)


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
            field: 'postcode',
            headerName: 'รหัสไปรษณีย์',
            flex: 1,
            cellClassName: "name-column--cell"
        },                        
        {
            field: 'tel',
            headerName: 'เบอร์ติดต่อ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'register_type',
            headerName: 'ประเภทการลงทะเบียน',
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => {
                // console.log('params',params.row.status);
                if (params.row.register_type == 1) {
                    return (<Box>เกษตรกร</Box>);
                } if (params.row.register_type == 2) {
                    return (<Box>ปราชญ์สมุนไพร</Box>);
                } if (params.row.register_type == 3) {
                    return (<Box>ผู้ประกอบการ</Box>);
                } if (params.row.register_type == 4) {
                    return (<Box>นักวิชาการ</Box>);
                } else {
                    return (<Box sx={{ color: colors.blueAccent[500] }}>อื่่นๆ</Box>);
                }
              },
        },         
        {
            field: 'status',
            headerName: 'สถานะ',
            flex: 1,
            cellClassName: "name-column--cell",
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log('params',params.row.status);
                if (params.row.status == true) {
                    return (<Box>อนุมัติแล้ว</Box>);
                } else {
                    return (<Box sx={{ color: colors.blueAccent[500] }}>รอการตรวจสอบ</Box>);
                }
              },
        },        
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
              <Box>

                <Button
                  onClick={() => (navigate('/farmers/approvedetail',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="success"
                  sx={{ ml: 1 }} 
                >
                  ตรวจสอบข้อมูล
                </Button>
                   
              </Box>
            );
          } }         

    ]

    return (
        <Box m="20px">
            <Header title="ข้อมูลเกษตรกร" subtitle="รายการข้อมูลเกษตรกร" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: 1,
                    borderColor: colors.greenAccent[500],
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
                        sx={{
                            "& .MuiDataGrid-root": {
                                fontsize: 2.25,
                            }
                        }}
                        // onSelectionModelChange={(idx) => {
                        //     let [id] = idx
                        //     console.log('idx => ', id)
                        //     setRowId(id)
                        // }}

                        // onSelectionModelChange={(ids) => {
                        //     const selectedIDs = new Set(ids)
                        //     const selectedRowData = result.filter((row) => 
                        //         selectedIDs.has(row.id.toString())
                        //     )
                        //     console.log('ids ',ids)
                        //     console.log('selectedIDs ',selectedIDs)
                        //     console.log('selectedRowData ',selectedRowData)
                        // }}
                        // onRowClick={handleRowClick}
                    /> : undefined}
            </Box>
        </Box>
    )
}

export default Farmerspending