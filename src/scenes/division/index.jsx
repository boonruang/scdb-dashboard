import React, { useEffect, useState } from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import AddIcon from '@mui/icons-material/Add'
import { getDivision, deleteDivision } from '../../actions/division.action'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import ConfirmBox from 'components/ConfirmBox'

const Divisions = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [rowId, setRowId] = useState(null)

  useEffect(function() { dispatch(getDivision()) }, [dispatch])

  const { result, isFetching } = useSelector(function(s) { return s.app.divisionReducer })
  const loginReducer = useSelector(function(s) { return s.app.loginReducer })
  const canEdit = (loginReducer.result || {}).roles &&
    loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })

  const columns = [
    { field: 'division_id', headerName: 'ID', flex: 0.4 },
    { field: 'division_name', headerName: 'ชื่อสังกัด', flex: 2, cellClassName: 'name-column--cell' },
    {
      field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.2,
      renderCell: function(params) {
        return (
          <Box>
            { canEdit && <Button onClick={function() { navigate('/division/edit', { state: { row: params.row } }) }}
              variant="outlined" color="info" sx={{ mr: 1 }}>แก้ไข</Button> }
            { canEdit && <Button onClick={function() { setRowId(params.row.division_id); setOpen(true) }}
              variant="outlined" color="error">ลบ</Button> }
          </Box>
        )
      }
    }
  ]

  return (
    <Box m="20px">
      <Header title="ข้อมูลสังกัด" subtitle="รายการสังกัด/หน่วยงานของบุคลากร" />
      <Box m="40px 0 0 0" height="75vh" sx={{
        '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
        '& .MuiDataGrid-cell': { borderBottom: 'none' },
        '& .name-column--cell': { color: colors.greenAccent[300] },
        '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
        '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: colors.grey[100] + ' !important' }
      }}>
        { canEdit && result &&
          <Box display="flex" justifyContent="end">
            <Button onClick={function() { navigate('/division/add') }}
              sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100],
                fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mb: '10px',
                '&:hover': { backgroundColor: colors.greenAccent[800] } }}>
              <AddIcon sx={{ mr: '10px' }} />เพิ่มข้อมูล
            </Button>
          </Box> }
        { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box> }
        { result && <DataGrid rows={result} columns={columns} getRowId={function(r) { return r.division_id }}
            slots={{ toolbar: GridToolbar }} /> }
      </Box>
      <ConfirmBox open={open} closeDialog={function() { setOpen(false) }}
        deleteFunction={function() { dispatch(deleteDivision(rowId)); setOpen(false) }}
        message="กรุณายืนยันการลบข้อมูล" title={rowId} />
    </Box>
  )
}

export default Divisions
