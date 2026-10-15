import React, { useEffect, useState } from "react";
import { Box, useTheme, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getPublication, deletePublication } from '../../actions/publication.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'
import BulkDeleteButton from 'components/BulkDeleteButton'
import Avatar from '@mui/material/Avatar'; 

const imagesUrl = process.env.REACT_APP_POSTS_IMAGES_URL

const Publications = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null)
    const [selection, setSelection] = useState([])
    const [yearBE, setYearBE] = useState('')   // กรองปีเผยแพร่ (พ.ศ.) ว่าง = ทุกปี

    const message = 'กรุณายืนยันการลบข้อมูล'    

    useEffect(() => {
        dispatch(getPublication())
    },[dispatch])

    const { result, isFetching } = useSelector((state) => state.app.publicationReducer)

    // publication_year เก็บเป็น ค.ศ. แสดงและกรองเป็น พ.ศ.
    const toBE = (y) => (y ? Number(y) + 543 : '')
    const yearOptions = [...new Set((result || []).map((r) => r.publication_year).filter(Boolean))]
      .sort((a, b) => b - a).map(toBE)
    const rows = result ? result.filter((r) => !yearBE || toBE(r.publication_year) === yearBE) : result

    const loginReducer = useSelector((state) => state.app.loginReducer)
    const canEdit = loginReducer?.result?.roles?.find((role) => [ROLES.Admin, ROLES.Editor, ROLES.Research].includes(role))

    const DeleteFunction = () => {
        dispatch(deletePublication(rowId))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        setRowId(state.row.pub_id)
        setOpen(true)
    }

    const handleAddButton = () => {
        navigate('/publication/add')
      };

    const ExportExcelButton = () => {
      var exportRows = (rows || []).map(function(r) {
        var authors = (r.ResearchAuthors || []).map(function(a) {
          return (a.firstname_th || a.firstname || '') + ' ' + (a.lastname_th || a.lastname || '')
        }).join(', ')
        return {
          'รหัส': r.pub_id,
          'ชื่อเรื่อง': r.title,
          'วารสาร': r.journal_name,
          'ปีที่เผยแพร่ (พ.ศ.)': toBE(r.publication_year),
          'Quartile': r.quartile,
          'ฐานข้อมูล': r.database_source,
          'ผู้แต่ง': authors,
        }
      })
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(exportRows)
      XLSX.utils.book_append_sheet(wb, ws, 'Publication')
      XLSX.writeFile(wb, 'publication.xlsx')
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
      field: 'id', // ใช้ 'id' ที่เราสร้าง alias ไว้
      headerName: 'ID',
      flex: 0.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'title',
      headerName: 'ชื่อเรื่อง',
      flex: 1.5,
      cellClassName: "name-column--cell"
    },
    {
      field: 'journal_name',
      headerName: 'วารสาร',
      flex: 1,
      cellClassName: "name-column--cell"
    },
    {
      field: 'publication_year',
      headerName: 'ปีเผยแพร่ (พ.ศ.)',
      flex: 0.8,
      renderCell: (params) => toBE(params.row.publication_year),
      cellClassName: "name-column--cell"
    },
    {
      field: 'quartile',
      headerName: 'คลอไทล์',
      flex: 0.8,
      cellClassName: "name-column--cell"
    },
    {
      field: 'database_source',
      headerName: 'ฐานข้อมูล',
      flex: 0.8,
      cellClassName: "name-column--cell"
    },
    {
      field: 'ResearchAuthors',
      headerName: 'ผู้แต่ง',
      flex: 1.2,
      renderCell: (params) => {
        const authors = params.row.ResearchAuthors;
        if (authors && authors.length > 0) {
          return authors.map(function(a) {
            return (a.firstname_th && a.lastname_th)
              ? a.firstname_th + ' ' + a.lastname_th
              : (a.firstname || '') + ' ' + (a.lastname || '')
          }).join(', ');
        }
        return '-';
      }
    },   
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
        return (
          <Box>
            <Button
              onClick={() => (navigate('/publication/detail',  { state: { row: params.row }} ))}
              variant="outlined"
              color="success"
            >
              รายละเอียด
            </Button>
            
        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin, ROLES.Editor, ROLES.Research].includes(role))
            ? <Button
            onClick={() => (navigate('/publication/edit',  { state: { row: params.row }} ))}
              variant="outlined"
              color="info"
              sx={{ ml: 1 }}            
            >
              แก้ไข
            </Button> : undefined  }                  

        { loginReducer?.result?.roles?.find((role) => [ROLES.Admin, ROLES.Editor, ROLES.Research].includes(role))
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
            <Header title="ข้อมูลงานวิจัย" subtitle="รายการข้อมูลงานวิจัย" />
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
                    <FormControl size="small" sx={{ minWidth: 160, mr: '10px', mb: '10px' }}>
                        <InputLabel>ปีเผยแพร่ (พ.ศ.)</InputLabel>
                        <Select value={yearBE} label="ปีเผยแพร่ (พ.ศ.)" onChange={(e) => setYearBE(e.target.value)}>
                            <MenuItem value="">ทุกปี</MenuItem>
                            {yearOptions.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                        </Select>
                    </FormControl>
                    { canEdit && <BulkDeleteButton entity="publication" selected={selection}
                        onDone={() => { setSelection([]); dispatch(getPublication()) }} sx={{ backgroundColor: colors.redAccent[700], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: colors.redAccent[800] } }} /> }
                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin, ROLES.Editor, ROLES.Research].includes(role)) && result
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

                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin, ROLES.Editor, ROLES.Research].includes(role)) && result
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
                        rows={rows}
                        columns={columns}
                        checkboxSelection={!!canEdit} disableRowSelectionOnClick
                        rowSelectionModel={selection} onRowSelectionModelChange={setSelection}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                              csvOptions: { disableToolbarButton: true },
                              printOptions: {
                                disableToolbarButton: false,
                                hideFooter: true,
                                hideToolbar: true, // ซ่อน headers column, filters, exports ตอนพิมพ์
                                fields: [
                                    'publication_id',
                                    'name',
                                    'position',
                                    'publication_type',
                                    'email',                                    
                                    'office_location',
                                ],
                                fileName: 'publications', 
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

export default Publications