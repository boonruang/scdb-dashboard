import React, { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getStaffeducation, deleteStaffeducation } from '../../actions/staffeducation.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'
import Avatar from '@mui/material/Avatar'; 

const imagesUrl = process.env.REACT_APP_POSTS_IMAGES_URL

const Staffeducations = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)

    const message = 'กรุณายืนยันการลบข้อมูล'    

    useEffect(() => {
        dispatch(getStaffeducation())
    },[dispatch])

    const { result, isFetching } = useSelector((state) => state.app.staffeducationReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    const DeleteFunction = () => {
        dispatch(deleteStaffeducation(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.staffeducation_id)
        setOpen(true)
    }

    const handleAddButton = () => {
        navigate('/staffeducation/add')
      };

    const ExportExcelButton = () => {
    // console.log('Data to export: ',result)
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(result)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "staffeducation.xlsx")

    };
      
    
    const handleButtonDetail = (p) => {
        // console.log('params',params)
        console.log('params',p)
    };

    const handleRowClick = (params,event,details) => {
        console.log('params',params)
        // console.log('event',event)
        // console.log('details',details)
    };


    const columns = [
    {
      field: 'id', 
      headerName: 'ID',
      flex: 0.3,
      cellClassName: "name-column--cell"
    },
    {
      field: 'name',
      headerName: 'ชื่อบุคคากร',
      flex: 1,
      renderCell: (params) => {
        return params.row.Staff?.name || 'N/A';
      }
    },
    {
      field: 'degree',
      headerName: 'การศึกษา',
      flex: 1.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'university',
      headerName: 'สถานศึกษา',
      flex: 1.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'year',
      headerName: 'ปีศึกษา',
      flex: 1.5,
      cellClassName: "name-column--cell"
    },    
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={() => (navigate('/staffeducation/detail',  { state: { row: params.row }} ))}
              variant="outlined"
              color="success"
            >
              รายละเอียด
            </Button>
            
        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
            ? <Button
            onClick={() => (navigate('/staffeducation/edit',  { state: { row: params.row }} ))}
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
            <Header title="ข้อมูลการศึกษาของบุคลากร" subtitle="รายการข้อมูลการศึกษาของบุคลากร" />
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
                <Box display="flex" justifyContent="end">
                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
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

                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
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
                                    'staffeducation_id',
                                    'name',
                                    'position',
                                    'staffeducation_type',
                                    'email',                                    
                                    'office_location',
                                ],
                                fileName: 'staffeducations', 
                                },
                            },
                          }}  
                    /> : undefined}
            </Box>
            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                deleteFunction={() => DeleteFunction()}
                message={message}
                title={rowId}
            />            
        </Box>
    )
}

export default Staffeducations