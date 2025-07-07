import { useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
// import { mockDataFarmers } from "../../data/mockDataFarmers"
import AddIcon from '@mui/icons-material/Add';
import { getFarmersRegisterReject } from '../../actions/register.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Farmersreject = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getFarmersRegisterReject())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.registerReducer)

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
            field: 'status',
            headerName: 'สถานะ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                console.log('params',params.row.reject);
                if (params.row.reject == true) {
                    return (<Box>รอการตรวจสอบอีกครั้ง</Box>);
                } else {
                    return (<Box sx={{ color: colors.blueAccent[500] }}>พร้อมดำเนินการ</Box>);
                }
              },
        },        
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
              <Box>

            <Button
                  onClick={() => (navigate('/farmers/rejectdetail',  { state: { row: params.row }} ))}
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

export default Farmersreject