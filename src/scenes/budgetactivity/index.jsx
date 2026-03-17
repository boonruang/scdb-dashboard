import React, { useEffect, useState } from 'react'
import { Box, useTheme, Button, TextField } from '@mui/material'
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
import { getBudgetActivity, deleteBudgetActivity } from '../../actions/budgetActivity.action'

const BudgetActivityList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [rowId, setRowId] = useState(null)
  const [filterCode, setFilterCode] = useState('')

  useEffect(() => { dispatch(getBudgetActivity()) }, [dispatch])

  const { result, isFetching } = useSelector((state) => state.app.budgetActivityReducer)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  const rows = result ? result.map((r) => ({ ...r, id: r.activity_id })) : []

  const handleSearch = () => dispatch(getBudgetActivity(filterCode || undefined))

  const ExportExcelButton = () => {
    if (!result) return
    const ws = XLSX.utils.json_to_sheet(result)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'กิจกรรม')
    XLSX.writeFile(wb, 'budget_activity.xlsx')
  }

  const dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .name-column--cell': { color: colors.greenAccent[300] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` }
  }

  const columns = [
    { field: 'activity_id',         headerName: 'ID',                    width: 60 },
    { field: 'budget_code',         headerName: 'รหัสงบประมาณ',           width: 130, cellClassName: 'name-column--cell' },
    { field: 'activity_code',       headerName: 'รหัสกิจกรรม',            width: 150, cellClassName: 'name-column--cell' },
    { field: 'activity_name',       headerName: 'โครงการ/กิจกรรม (ย่อย)', width: 300 },
    { field: 'budget_requested',    headerName: 'งบที่ขอ (บาท)',          width: 130, type: 'number' },
    { field: 'start_date',          headerName: 'เริ่มต้น',               width: 110 },
    { field: 'end_date',            headerName: 'สิ้นสุด',                width: 110 },
    { field: 'target_student_y1',   headerName: 'นิสิต ปี1',              width: 90,  type: 'number' },
    { field: 'target_student_y2',   headerName: 'นิสิต ปี2',              width: 90,  type: 'number' },
    { field: 'target_student_y3',   headerName: 'นิสิต ปี3',              width: 90,  type: 'number' },
    { field: 'target_student_y4',   headerName: 'นิสิต ปี4',              width: 90,  type: 'number' },
    { field: 'target_admin',        headerName: 'ผู้บริหาร',              width: 90,  type: 'number' },
    { field: 'target_academic',     headerName: 'วิชาการ',                width: 90,  type: 'number' },
    { field: 'target_support',      headerName: 'สนับสนุน',               width: 90,  type: 'number' },
    { field: 'target_student_ext',  headerName: 'นักเรียน',               width: 90,  type: 'number' },
    { field: 'target_public',       headerName: 'บุคคลทั่วไป',            width: 100, type: 'number' },
    { field: 'strategy',            headerName: 'ยุทธศาสตร์',             width: 120 },
    { field: 'student_dev_standard',headerName: 'มาตรฐานนิสิต',           width: 120 },
    { field: 'sdgs',                headerName: 'SDGs',                   width: 100 },
    { field: 'bcg',                 headerName: 'BCG',                    width: 70 },
    { field: 'smart_university',    headerName: 'Smart Univ.',            width: 100 },
    { field: 'venue',               headerName: 'สถานที่',                 width: 160 },
    { field: 'output_text',         headerName: 'ผลผลิต (output)',        width: 200 },
    { field: 'target_value',        headerName: 'ค่าเป้าหมาย',            width: 150 },
    { field: 'outcome',             headerName: 'ผลลัพธ์ (outcome)',       width: 200 },
    { field: 'impact',              headerName: 'ผลกระทบ (Impact)',        width: 200 },
    { field: 'note',                headerName: 'หมายเหตุ',               width: 150 },
    {
      field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', width: 280,
      renderCell: (params) => (
        <Box>
          <Button onClick={() => navigate('/budgetactivity/detail', { state: { row: params.row } })}
            variant="outlined" color="success" sx={{ mr: 1 }}>รายละเอียด</Button>
          {loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r)) &&
            <Button onClick={() => navigate('/budgetactivity/edit', { state: { row: params.row } })}
              variant="outlined" color="info" sx={{ mr: 1 }}>แก้ไข</Button>}
          {loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r)) &&
            <Button onClick={() => { setRowId(params.row.activity_id); setOpen(true) }}
              variant="outlined" color="error">ลบ</Button>}
        </Box>
      )
    }
  ]

  const btnStyle = (bg, hover) => ({ backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover } })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  return (
    <Box m="20px">
      <Header title="ข้อมูลกิจกรรมโครงการ" subtitle="รายการกิจกรรม/โครงการย่อย" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="10px" flexWrap="wrap">
          <Box display="flex" alignItems="center" gap="10px">
            <TextField size="small" label="กรองตามรหัสงบประมาณ" value={filterCode}
              onChange={(e) => setFilterCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()} sx={{ width: 260 }} />
            <Button variant="outlined" onClick={handleSearch}>ค้นหา</Button>
          </Box>
          <Box display="flex">
            {canEdit && result && <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={() => navigate('/budgetactivity/add')}><AddIcon sx={{ mr: '10px' }} />เพิ่มข้อมูล</Button>}
            {canEdit && result && <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={ExportExcelButton}><IosShareIcon sx={{ mr: '10px' }} />ส่งออกไฟล์ Excel</Button>}
          </Box>
        </Box>
        {isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}
        {result && <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />}
      </Box>
      <ConfirmBox open={open} closeDialog={() => setOpen(false)}
        deleteFunction={() => { dispatch(deleteBudgetActivity(rowId)); setOpen(false) }}
        message="กรุณายืนยันการลบข้อมูล" title={rowId} />
    </Box>
  )
}

export default BudgetActivityList
