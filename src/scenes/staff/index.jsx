import React, { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getStaff, deleteStaff } from '../../actions/staff.action'

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

const Staffs = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)

    const message = 'กรุณายืนยันการลบข้อมูล'    

    useEffect(() => {
        dispatch(getStaff())
    },[dispatch])

    const { result, isFetching } = useSelector((state) => state.app.staffReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    const DeleteFunction = () => {
        dispatch(deleteStaff(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.staff_id)
        setOpen(true)
    }

    const handleAddButton = () => {
        navigate('/staff/add')
      };

    const ExportExcelButton = () => {
      var rows = (result || []).map(function(r) {
        return {
          'รหัส': r.staff_id,
          'เลขประจำตำแหน่ง': r.position_no,
          'คำนำหน้า': r.title_th,
          'ชื่อ (TH)': r.firstname_th,
          'นามสกุล (TH)': r.lastname_th,
          'ชื่อ (EN)': r.firstname,
          'สกุล (EN)': r.lastname,
          'ตำแหน่ง': r.position,
          'ตำแหน่งวิชาการ': r.title_th,
          'ประเภทบุคลากร': (r.Stafftype || {}).name || '',
          'สังกัด': (r.Division || {}).division_name || '',
          'วุฒิการศึกษา': r.education,
          'วันที่บรรจุ': r.startdate,
          'วันเกิด': r.birthday,
          'โทรศัพท์': r.phone_no,
          'ออฟฟิศ': r.office_location,
          'อีเมล': r.email,
        }
      })
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(rows)
      XLSX.utils.book_append_sheet(wb, ws, 'Staff')
      XLSX.writeFile(wb, 'staff.xlsx')
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
      field: 'position_no',
      headerName: 'เลขประจำตำแหน่ง',
      flex: 0.6,
      cellClassName: "name-column--cell"
    },
    {
      field: 'title_th',
      headerName: 'คำนำหน้า',
      flex: 0.4,
      cellClassName: "name-column--cell"
    },
    {
      field: 'firstname_th',
      headerName: 'ชื่อ (TH)',
      flex: 0.7,
      cellClassName: "name-column--cell"
    },
    {
      field: 'lastname_th',
      headerName: 'นามสกุล (TH)',
      flex: 0.7,
      cellClassName: "name-column--cell"
    },
    {
      field: 'firstname',
      headerName: 'ชื่อ (EN)',
      flex: 0.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'lastname',
      headerName: 'สกุล (EN)',
      flex: 0.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'position',
      headerName: 'ตำแหน่ง',
      flex: 0.7,
      cellClassName: "name-column--cell"
    },
    {
      field: 'name',
      headerName: 'ประเภท',
      flex: 0.4,
      renderCell: (params) => {
        return params.row.Stafftype?.name || 'N/A';
      }
    },
    {
      field: 'education',
      headerName: 'วุฒิการศึกษา',
      flex: 0.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'startdate',
      headerName: 'วันที่บรรจุ',
      flex: 0.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'birthday',
      headerName: 'วันเกิด',
      flex: 0.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.7,
      cellClassName: "name-column--cell"
    },
    {
      field: 'phone_no',
      headerName: 'โทรศัพท์',
      flex: 0.4,
      cellClassName: "name-column--cell"
    },
    {
      field: 'division_name',
      headerName: 'สังกัด',
      flex: 0.8,
      renderCell: function(params) {
        return (params.row.Division || {}).division_name || 'N/A'
      }
    },
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={() => (navigate('/staff/detail',  { state: { row: params.row }} ))}
              variant="outlined"
              color="success"
            >
              รายละเอียด
            </Button>
            
        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
            ? <Button
            onClick={() => (navigate('/staff/edit',  { state: { row: params.row }} ))}
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
            <Header title="ข้อมูลบุคลากร" subtitle="รายการข้อมูลบุคลากร" />
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
                                    'staff_id',
                                    'name',
                                    'position',
                                    'staff_type',
                                    'email',                                    
                                    'office_location',
                                ],
                                fileName: 'staffs', 
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

export default Staffs