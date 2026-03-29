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
import { getAcademicResearchList, deleteAcademicResearch } from '../../actions/academicResearch.action'

var AcademicResearchList = function(props) {
  var degree = props.degree || null
  var basePath = props.basePath || '/academicresearch/master'
  var title = props.title || 'วิจัย ป.โท'

  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var navigate = useNavigate()

  var [open, setOpen] = useState(false)
  var [rowId, setRowId] = useState(null)

  useEffect(function() {
    dispatch(getAcademicResearchList(degree))
  }, [dispatch, degree])

  var { result, isFetching } = useSelector(function(state) { return state.app.academicResearchReducer })
  var loginReducer = useSelector(function(state) { return state.app.loginReducer })

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var columns = [
    { field: 'id', headerName: 'ID', flex: 0.4 },
    { field: 'student_code', headerName: 'รหัสนิสิต', flex: 0.7, cellClassName: 'name-column--cell' },
    { field: 'prefix', headerName: 'คำนำหน้า', flex: 0.5 },
    { field: 'firstname', headerName: 'ชื่อ', flex: 0.8, cellClassName: 'name-column--cell' },
    { field: 'lastname', headerName: 'นามสกุล', flex: 0.8, cellClassName: 'name-column--cell' },
    { field: 'degree_level', headerName: 'ระดับ', flex: 0.6 },
    { field: 'major_name', headerName: 'สาขา', flex: 1 },
    { field: 'thesis_th', headerName: 'หัวข้อวิทยานิพนธ์', flex: 2 },
    { field: 'research_status', headerName: 'สถานะ', flex: 0.7 },
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5,
      renderCell: function(params) {
        return (
          <Box>
            <Button onClick={function() { navigate(basePath + '/detail', { state: { row: params.row } }) }}
              variant="outlined" color="success">รายละเอียด</Button>
            {canEdit && (
              <Button onClick={function() { navigate(basePath + '/edit', { state: { row: params.row } }) }}
                variant="outlined" color="info" sx={{ ml: 1 }}>แก้ไข</Button>
            )}
            {canEdit && (
              <Button onClick={function() { setRowId(params.row.research_id); setOpen(true) }}
                variant="outlined" color="error" sx={{ ml: 1 }}>ลบ</Button>
            )}
          </Box>
        )
      }
    }
  ]

  return (
    <Box m="20px">
      <Header title={title} subtitle={'รายการ' + title} />
      <Box m="40px 0 0 0" height="75vh" sx={{
        '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
        '& .name-column--cell': { color: colors.greenAccent[300] },
        '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: colors.grey[100] + ' !important' },
      }}>
        <Box display="flex" justifyContent="end" mb="10px">
          {canEdit && (
            <Button onClick={function() { navigate(basePath + '/add') }}
              sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px',
                fontWeight: 'bold', padding: '10px 20px', mr: '10px', '&:hover': { backgroundColor: colors.greenAccent[800] } }}>
              <AddIcon sx={{ mr: '10px' }} />เพิ่มข้อมูล
            </Button>
          )}
          <Button onClick={function() {
            var rows = (result || []).map(function(r) {
              return {
                'รหัสนิสิต': r.student_code,
                'คำนำหน้า': r.prefix,
                'ชื่อ': r.firstname,
                'นามสกุล': r.lastname,
                'ระดับ': r.degree_level,
                'สาขา': r.major_name,
                'คณะ': r.faculty,
                'หัวข้อวิทยานิพนธ์ (TH)': r.thesis_th,
                'หัวข้อวิทยานิพนธ์ (EN)': r.thesis_en,
                'สถานะตีพิมพ์': r.research_status,
                'ชื่อวารสาร': r.journal_name,
                'ประเภท': r.publish_type,
              }
            })
            var wb = XLSX.utils.book_new()
            var ws = XLSX.utils.json_to_sheet(rows)
            XLSX.utils.book_append_sheet(wb, ws, 'AcademicResearch')
            XLSX.writeFile(wb, 'academic_research.xlsx')
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
        deleteFunction={function() { dispatch(deleteAcademicResearch(rowId, degree)); setOpen(false) }}
        message="กรุณายืนยันการลบข้อมูล" title={rowId} />
    </Box>
  )
}

export default AcademicResearchList
