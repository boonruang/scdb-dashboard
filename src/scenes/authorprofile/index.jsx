import React, { useEffect } from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import { getAuthorProfiles } from '../../actions/authorProfile.action'
import CircularProgress from '@mui/material/CircularProgress'
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare'

const AuthorProfileList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getAuthorProfiles()) }, [dispatch])

  const { result, isFetching } = useSelector((state) => state.app.authorProfileReducer)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  const handleExport = () => {
    if (!result) return
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(result)
    XLSX.utils.book_append_sheet(wb, ws, 'AuthorProfile')
    XLSX.writeFile(wb, 'author_profile.xlsx')
  }

  const dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .name-column--cell': { color: colors.greenAccent[300] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` },
  }

  const columns = [
    { field: 'staff_id', headerName: 'ID', flex: 0.4, headerAlign: 'center', align: 'center' },
    { field: 'spreadsheet_id', headerName: 'ID(A)', flex: 0.4, cellClassName: 'name-column--cell' },
    { field: 'position', headerName: 'ตำแหน่ง', flex: 1 },
    { field: 'firstname_th', headerName: 'ชื่อ (TH)', flex: 0.8, cellClassName: 'name-column--cell' },
    { field: 'lastname_th', headerName: 'นามสกุล (TH)', flex: 0.8 },
    { field: 'firstname', headerName: 'First Name', flex: 0.8 },
    { field: 'lastname', headerName: 'Last Name', flex: 0.8 },
    { field: 'citations_total', headerName: 'Citations', flex: 0.6, type: 'number' },
    { field: 'publications_count', headerName: 'Publications', flex: 0.7, type: 'number' },
    { field: 'h_index', headerName: 'H-Index', flex: 0.6, type: 'number' },
    { field: 'docs_current_year', headerName: 'Docs (ปีปัจจุบัน)', flex: 0.7, type: 'number' },
    { field: 'citations_current_year', headerName: 'Citations (ปีปัจจุบัน)', flex: 0.8, type: 'number' },
    { field: 'email', headerName: 'Email', flex: 1 },
  ]

  return (
    <Box m="20px">
      <Header title="ข้อมูล Author Profile" subtitle="รายการข้อมูลนักวิจัย (citations, h-index)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="end" mb="10px">
          {canEdit && result && (
            <Button
              sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', '&:hover': { backgroundColor: colors.blueAccent[800] } }}
              onClick={handleExport}
            >
              <IosShareIcon sx={{ mr: '10px' }} />
              ส่งออกไฟล์ Excel
            </Button>
          )}
        </Box>
        {isFetching && (
          <Box height="65vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {result && (
          <DataGrid
            rows={result}
            getRowId={(row) => row.staff_id}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  )
}

export default AuthorProfileList
