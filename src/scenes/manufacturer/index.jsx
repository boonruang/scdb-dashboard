import React, { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import { mockDataBusiness } from "../../data/mockDataBusiness"
import { getManufacturer,deleteManufacturer } from '../../actions/manufacturer.action'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from '../../constants'
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const Manufacturer = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)

    useEffect(() => {
        dispatch(getManufacturer())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.manufacturerReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)   
    
    const handleClick = () => {
        //
    }

    const DeleteFunction = () => {
        // dispatch(deleteManufacturer(Id))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        // console.log('state',state)
        // console.log('row.id',state.row.id)
        setRowId(state.row.id)
        setOpen(true)
        // dispatch(deleteFarmer(state.row.id))
        dispatch(deleteManufacturer(state.row.id))
    }

    const handleAddButton = () => {
        navigate('/manufacturer/add')
        };

    const ExportExcelButton = () => {
    // console.log('Data to export: ',result)
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(result)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "oursource.xlsx")

    };    

    const columns = [
        { field: 'id', 
            headerName: 'ลำดับ',  
            headerAlign: 'center', 
            flex: 0.3,
            align: 'center',
            cellClassName: "name-column--cell"
        },
        {
            field: 'name',
            headerName: 'กลุ่ม',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { field: 'hno', 
            headerName: 'เลขที่', 
            flex: 0.3, 
            cellClassName: "name-column--cell" },
        { field: 'baan', 
            headerName: 'หมู่บ้าน', 
            flex: 0.5, 
            cellClassName: "name-column--cell" },
        { field: 'tambon', 
            headerName: 'ตำบล', 
            flex: 0.5, 
            cellClassName: "name-column--cell" },
        {
            field: 'amphoe',
            headerName: 'อำเภอ',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },
        {
            field: 'province',
            headerName: 'จังหวัด',
            flex: 0.5,
            cellClassName: "name-column--cell"
        },              
        {
            field: 'services',
            headerName: 'บริการ',
            flex: 0.6,
            cellClassName: "name-column--cell"
        },
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.2, renderCell: (params) => {
            return (
              <Box>
                <Button
                  onClick={() => (navigate('/manufacturer/detail',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>
                
            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                onClick={() => (navigate('/manufacturer/edit',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="info"
                  sx={{ ml: 1 }}            
                >
                  แก้ไข
                </Button> : undefined  }                  

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                onClick={() => handleDeleteClick({ state: { row: params.row }})}
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }} 
                >
                  ลบ
                </Button> : undefined  } 
                    
              </Box>
            );
          } }         
    ]

    return (
        <Box m="20px">
            <Header title="โรงงานผู้ผลิตผลิตภัณฑ์สมุนไพร" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    // border: "none"
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
                    <Box display="flex" justifyContent="end">
                        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) 
                        ? <Box display="flex" justifyContent="end" onClick={handleAddButton}>
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
                                    '&:hover': {backgroundColor: colors.greenAccent[800]}
                                }}
                            >
                                <AddIcon sx={{ mr: "10px" }} />
                                เพิ่มข้อมูล
                            </Button>
                        </Box> : undefined }

                        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) 
                        ? <Box display="flex" justifyContent="end" onClick={ExportExcelButton}>
                            <Button  
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    // backgroundColor: colors.greenAccent[600],
                                    color: colors.grey[100],
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    mr: "10px",
                                    mb: "10px",
                                    '&:hover': {backgroundColor: colors.blueAccent[800]}
                                }}
                            >
                                <IosShareIcon sx={{ mr: "10px" }} />
                                ส่งออกไฟล์ Excel
                            </Button>
                        </Box> : undefined }                
                    </Box>

                { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                { result ?
                    <DataGrid
                        rows={result}
                        columns={columns}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                              csvOptions: { disableToolbarButton: true },
                              printOptions: {
                                disableToolbarButton: false,
                                hideFooter: true,
                                hideToolbar: true, // ซ่อน headers column, filters, exports ตอนพิมพ์
                                fields: [
                                    'id',
                                    'name',
                                    'hno',
                                    'moo',
                                    'baan',
                                    'tambon',
                                    'amphoe',
                                    'province',
                                    'postcode',
                                ],
                                fileName: 'oursource', 
                                },
                            },
                          }} 
                    /> : undefined}                               
            </Box>
            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                deleteFunction={() => DeleteFunction()}
                message={"กรุณายืนยันการลบข้อมูล"}
                title={rowId}
            />             
        </Box>
    )
}

export default Manufacturer