import React, { useEffect, useState } from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import AddIcon from '@mui/icons-material/Add'
import IosShareIcon from '@mui/icons-material/IosShare'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import ConfirmBox from 'components/ConfirmBox'
import * as XLSX from 'xlsx'
import { getAcademicGrantList, deleteAcademicGrant } from '../../actions/academicGrant.action'

var AcademicGrantList = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var navigate = useNavigate()

  var [open, setOpen] = useState(false)
  var [rowId, setRowId] = useState(null)

  useEffect(function() {
    dispatch(getAcademicGrantList())
  }, [dispatch])

  var { result, isFetching } = useSelector(function(state) { return state.app.academicGrantReducer })
  var loginReducer = useSelector(function(state) { return state.app.loginReducer })

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var columns = [
    { field: 'id', headerName: 'ID', flex: 0.4 },
    { field: 'student_code', headerName: 'รหัสนิสิต', flex: 0.7, cellClassName: 'name-column--cell' },
    { field: 'firstname', headerName: 'ชื่อ', flex: 0.7, cellClassName: 'name-column--cell' },
    { field: 'lastname', headerName: 'นามสกุล', flex: 0.8 },
    { field: 'program', headerName: 'หลักสูตร', flex: 0.6 },
    { field: 'major_name', headerName: 'สาขา', flex: 0.8 },
    { field: 'degree_level', headerName: 'ระดับ', flex: 0.6 },
    { field: 'topic', headerName: 'หัวข้อที่นำเสนอ', flex: 1.5 },
    { field: 'conference_name', headerName: 'งานประชุม', flex: 1.2 },
    { field: 'amount', headerName: 'งบ (บาท)', flex: 0.6 },
    { field: 'grant_type', headerName: 'ประเภท', flex: 0.7 },
    { field: 'fiscal_year', headerName: 'ปีงบประมาณ', flex: 0.6 },
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5,
      renderCell: function(params) {
        return (
          <Box>
            <Button onClick={function() { navigate('/academicgrant/detail', { state: { row: params.row } }) }}
              variant="outlined" color="success">รายละเอียด</Button>
            {canEdit && (
              <Button onClick={function() { navigate('/academicgrant/edit', { state: { row: params.row } }) }}
                variant="outlined" color="info" sx={{ ml: 1 }}>แก้ไข</Button>
            )}
            {canEdit && (
              <Button onClick={function() { setRowId(params.row.grant_id); setOpen(true) }}
                variant="outlined" color="error" sx={{ ml: 1 }}>ลบ</Button>
            )}
          </Box>
        )
      }
    }
  ]

  return (
    <Box m="20px">
      <Header title="ทุนนำเสนอ" subtitle="รายการทุนนำเสนอนิสิต" />
      <Box m="40px 0 0 0" height="75vh" sx={{
        '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
        '& .name-column--cell': { color: colors.greenAccent[300] },
        '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: colors.grey[100] + ' !important' },
      }}>
        <Box display="flex" justifyContent="end" mb="10px">
          {canEdit && (
            <Button onClick={function() { navigate('/academicgrant/add') }}
              sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px',
                fontWeight: 'bold', padding: '10px 20px', mr: '10px', '&:hover': { backgroundColor: colors.greenAccent[800] } }}>
              <AddIcon sx={{ mr: '10px' }} />เพิ่มข้อมูล
            </Button>
          )}
          <Button onClick={function() {
            var rows = (result || []).map(function(r) {
              return {
                'ID': r.id,
                'รหัสนิสิต': r.student_code,
                'ชื่อ': r.firstname,
                'นามสกุล': r.lastname,
                'สาขา': r.major_name,
                'หัวข้อที่นำเสนอ': r.topic,
                'หัวข้อที่นำเสนอ': r.topic,
                'งานประชุม': r.conference_name,
                'รูปแบบการนำเสนอ': r.present_type,
                'งบ (บาท)': r.amount,
                'ประเภท': r.grant_type,
                'ระดับ': r.degree_level,
                'ปีงบประมาณ': r.fiscal_year,
              }
            })
            var wb = XLSX.utils.book_new()
            var ws = XLSX.utils.json_to_sheet(rows)
            XLSX.utils.book_append_sheet(wb, ws, 'AcademicGrant')
            XLSX.writeFile(wb, 'academic_grant.xlsx')
          }} sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: '14px',
            fontWeight: 'bold', padding: '10px 20px', mr: '10px', '&:hover': { backgroundColor: colors.blueAccent[800] } }}>
            <IosShareIcon sx={{ mr: '10px' }} />ส่งออกข้อมูล EXCEL
          </Button>
        </Box>
        {isFetching && (
          <Box height="65vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {result && (
          <DataGrid rows={result} columns={columns} slots={{ toolbar: GridToolbar }} />
        )}
      </Box>
      <ConfirmBox open={open} closeDialog={function() { setOpen(false) }}
        deleteFunction={function() { dispatch(deleteAcademicGrant(rowId)); setOpen(false) }}
        message="กรุณายืนยันการลบข้อมูล" title={rowId} />
    </Box>
  )
}

export default AcademicGrantList
