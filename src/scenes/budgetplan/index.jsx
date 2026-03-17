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
import * as XLSX from 'xlsx'
import ConfirmBox from 'components/ConfirmBox'
import { getBudgetPlan, deleteBudgetPlan } from '../../actions/budgetPlan.action'

const BudgetPlanList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [rowId, setRowId] = useState(null)

  useEffect(() => { dispatch(getBudgetPlan()) }, [dispatch])

  const { result, isFetching } = useSelector((state) => state.app.budgetPlanReducer)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  const rows = result ? result.map((r) => ({ ...r, id: r.plan_id })) : []

  const handleDeleteClick = ({ state }) => {
    setRowId(state.row.plan_id)
    setOpen(true)
  }

  const ExportExcelButton = () => {
    if (!result) return
    const ws = XLSX.utils.json_to_sheet(result)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'แผนโครงการ')
    XLSX.writeFile(wb, 'budget_plan.xlsx')
  }

  const dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .MuiDataGrid-cell': { borderBottom: 'none' },
    '& .name-column--cell': { color: colors.greenAccent[300] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` }
  }

  const columns = [
    { field: 'plan_id', headerName: 'ID', flex: 0.3 },
    { field: 'budget_code', headerName: 'รหัสงบประมาณ', flex: 0.8, cellClassName: 'name-column--cell' },
    { field: 'project_name', headerName: 'โครงการ/กิจกรรม', flex: 2, cellClassName: 'name-column--cell' },
    { field: 'budget_type', headerName: 'หมวดงบ', flex: 0.8 },
    { field: 'budget_amount', headerName: 'งบประมาณ (บาท)', flex: 0.8, type: 'number' },
    { field: 'plan_q1', headerName: 'ไตรมาส 1', flex: 0.6, type: 'number' },
    { field: 'plan_q2', headerName: 'ไตรมาส 2', flex: 0.6, type: 'number' },
    { field: 'plan_q3', headerName: 'ไตรมาส 3', flex: 0.6, type: 'number' },
    { field: 'plan_q4', headerName: 'ไตรมาส 4', flex: 0.6, type: 'number' },
    { field: 'fiscal_year', headerName: 'ปีงบประมาณ (ค.ศ.)', flex: 0.7 },
    {
      field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.2,
      renderCell: (params) => (
        <Box>
          <Button onClick={() => navigate('/budgetplan/detail', { state: { row: params.row } })}
            variant="outlined" color="success" sx={{ mr: 1 }}>รายละเอียด</Button>
          {loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r)) &&
            <Button onClick={() => navigate('/budgetplan/edit', { state: { row: params.row } })}
              variant="outlined" color="info" sx={{ mr: 1 }}>แก้ไข</Button>}
          {loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r)) &&
            <Button onClick={() => handleDeleteClick({ state: { row: params.row } })}
              variant="outlined" color="error">ลบ</Button>}
        </Box>
      )
    }
  ]

  const btnStyle = (bg, hover) => ({
    backgroundColor: bg, color: colors.grey[100],
    fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px',
    '&:hover': { backgroundColor: hover }
  })

  return (
    <Box m="20px">
      <Header title="ข้อมูลแผนโครงการ/งบประมาณ" subtitle="รายการข้อมูลแผนโครงการและงบประมาณ" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="end">
          {loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r)) && result &&
            <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])}
              onClick={() => navigate('/budgetplan/add')}>
              <AddIcon sx={{ mr: '10px' }} />เพิ่มข้อมูล
            </Button>}
          {loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r)) && result &&
            <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={ExportExcelButton}>
              <IosShareIcon sx={{ mr: '10px' }} />ส่งออกไฟล์ Excel
            </Button>}
        </Box>
        {isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}
        {result && <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />}
      </Box>
      <ConfirmBox open={open} closeDialog={() => setOpen(false)}
        deleteFunction={() => { dispatch(deleteBudgetPlan(rowId)); setOpen(false) }}
        message="กรุณายืนยันการลบข้อมูล" title={rowId} />
    </Box>
  )
}

export default BudgetPlanList
