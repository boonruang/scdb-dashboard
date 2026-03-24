import React, { useEffect, useState } from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import { getAuthorProfiles, deleteAuthorProfile } from '../../actions/authorProfile.action'
import CircularProgress from '@mui/material/CircularProgress'
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import ConfirmBox from 'components/ConfirmBox'

var AuthorProfileList = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var navigate = useNavigate()

  var [open, setOpen] = useState(false)
  var [rowId, setRowId] = useState(null)

  useEffect(function() { dispatch(getAuthorProfiles()) }, [dispatch])

  var result = useSelector(function(s) { return s.app.authorProfileReducer.result })
  var isFetching = useSelector(function(s) { return s.app.authorProfileReducer.isFetching })
  var loginReducer = useSelector(function(s) { return s.app.loginReducer })
  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var handleDelete = function() {
    dispatch(deleteAuthorProfile(rowId))
    setOpen(false)
  }

  var handleExport = function() {
    if (!result) return
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(result)
    XLSX.utils.book_append_sheet(wb, ws, 'AuthorProfile')
    XLSX.writeFile(wb, 'author_profile.xlsx')
  }

  var dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .name-column--cell': { color: colors.greenAccent[300] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: colors.grey[100] + ' !important' },
  }

  var columns = [
    { field: 'author_id', headerName: 'ID', flex: 0.3 },
    { field: 'spreadsheet_id', headerName: 'ID(A)', flex: 0.4, cellClassName: 'name-column--cell' },
    { field: 'position_no', headerName: 'เลขตำแหน่ง', flex: 0.6 },
    { field: 'title_th', headerName: 'คำนำหน้า', flex: 0.4 },
    { field: 'firstname_th', headerName: 'ชื่อ (TH)', flex: 0.8, cellClassName: 'name-column--cell' },
    { field: 'lastname_th', headerName: 'นามสกุล (TH)', flex: 0.8 },
    { field: 'firstname', headerName: 'First Name', flex: 0.7 },
    { field: 'lastname', headerName: 'Last Name', flex: 0.7 },
    { field: 'position', headerName: 'ตำแหน่ง', flex: 0.8 },
    { field: 'dept_name', headerName: 'ภาควิชา', flex: 0.8 },
    { field: 'citations_total', headerName: 'Citations', flex: 0.5, type: 'number' },
    { field: 'publications_count', headerName: 'Pubs', flex: 0.5, type: 'number' },
    { field: 'h_index', headerName: 'H-Index', flex: 0.5, type: 'number' },
    { field: 'scopus_url', headerName: 'Scopus', flex: 0.8 },
    {
      field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5,
      renderCell: function(params) {
        return (
          <Box>
            <Button variant="outlined" color="success" size="small"
              onClick={function() { navigate('/authorprofile/detail', { state: { row: params.row } }) }}
            >รายละเอียด</Button>
            {canEdit && (
              <Button variant="outlined" color="info" size="small" sx={{ ml: 1 }}
                onClick={function() { navigate('/authorprofile/edit', { state: { row: params.row } }) }}
              >แก้ไข</Button>
            )}
            {canEdit && (
              <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }}
                onClick={function() { setRowId(params.row.author_id); setOpen(true) }}
              >ลบ</Button>
            )}
          </Box>
        )
      },
    },
  ]

  return (
    <Box m="20px">
      <Header title="ข้อมูล Author Profile" subtitle="รายการนักวิจัย (citations, h-index)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" mb="10px">
          <Box>
            {canEdit && (
              <Button
                sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', '&:hover': { backgroundColor: colors.greenAccent[800] } }}
                onClick={function() { navigate('/authorprofile/create') }}
              >
                <AddIcon sx={{ mr: '10px' }} />เพิ่มนักวิจัย
              </Button>
            )}
          </Box>
          <Box>
            {canEdit && result && (
              <Button
                sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', '&:hover': { backgroundColor: colors.blueAccent[800] } }}
                onClick={handleExport}
              >
                <IosShareIcon sx={{ mr: '10px' }} />ส่งออก Excel
              </Button>
            )}
          </Box>
        </Box>
        {isFetching ? (
          <Box display="flex" justifyContent="center" mt="40px"><CircularProgress /></Box>
        ) : (
          <DataGrid
            rows={result || []}
            columns={columns}
            getRowId={function(row) { return row.author_id }}
            slots={{ toolbar: GridToolbar }}
          />
        )}
      </Box>
      <ConfirmBox open={open} onClose={function() { setOpen(false) }} onConfirm={handleDelete} />
    </Box>
  )
}

export default AuthorProfileList
