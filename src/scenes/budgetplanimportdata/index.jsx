import React, { useRef, useState } from 'react'
import { Box, useTheme, Button, TextField, MenuItem } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import * as XLSX from 'xlsx'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import UploadProgresBar from 'components/UploadProgresBar'
import { bulkImportBudgetPlan } from '../../actions/budgetPlan.action'

const currentBE = new Date().getFullYear() + 543
const fiscalYearOptions = [currentBE, currentBE - 1, currentBE - 2, currentBE - 3]

const BudgetPlanImportData = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  const [data, setData] = useState([])
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [fiscalYear, setFiscalYear] = useState(String(currentBE - 1))

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setShowProgress(true); setProgress(0)
    let fake = 0
    const interval = setInterval(() => { fake += 10; setProgress(fake < 90 ? fake : 90) }, 100)
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (event) => {
      const wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[1]] // Sheet "แผนโครงการ"
      const raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
      const mapped = raw
        .filter((r) => r['รหัสงบประมาณ'])
        .map((r, i) => ({
          id: i + 1,
          budget_code: String(r['รหัสงบประมาณ'] || ''),
          project_name: String(r['โครงการ/กิจกรรม'] || ''),
          budget_type: String(r['หมวดงบประมาณ'] || ''),
          budget_amount: Number(r['งบประมาณจัดสรร'] || 0),
          plan_q1: Number(r['แผนการใช้จ่ายงบประมาณไตรมาส 1'] || 0),
          plan_q2: Number(r['แผนการใช้จ่ายงบประมาณไตรมาส 2'] || 0),
          plan_q3: Number(r['แผนการใช้จ่ายงบประมาณไตรมาส 3'] || 0),
          plan_q4: Number(r['แผนการใช้จ่ายงบประมาณไตรมาส 4'] || 0),
        }))
      setData(mapped)
      clearInterval(interval); setProgress(100)
      setTimeout(() => { setShowProgress(false); setProgress(0) }, 500)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = () => { clearInterval(interval); setShowProgress(false) }
  }

  const handleImport = async () => {
    if (!data.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }
    const ceYear = Number(fiscalYear) - 543
    const toImport = data.map(({ id, ...rest }) => ({ ...rest, fiscal_year: ceYear }))
    if (!window.confirm(`นำเข้าข้อมูล ${toImport.length} รายการ ปีงบประมาณ ${fiscalYear}?`)) return
    const res = await dispatch(bulkImportBudgetPlan(toImport))
    if (res?.success) { alert('นำเข้าข้อมูลสำเร็จ'); setData([]) }
    else alert('เกิดข้อผิดพลาด: ' + (res?.error || ''))
  }

  const handleClear = () => { setData([]); setShowProgress(false); setProgress(0); if (fileInputRef.current) fileInputRef.current.value = null }

  const dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .name-column--cell': { color: colors.greenAccent[300] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` }
  }

  const columns = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3, headerAlign: 'center', align: 'center' },
    { field: 'budget_code', headerName: 'รหัสงบประมาณ', flex: 0.7, cellClassName: 'name-column--cell' },
    { field: 'project_name', headerName: 'โครงการ/กิจกรรม', flex: 2, cellClassName: 'name-column--cell' },
    { field: 'budget_type', headerName: 'หมวดงบ', flex: 0.8 },
    { field: 'budget_amount', headerName: 'งบประมาณ', flex: 0.7, type: 'number' },
    { field: 'plan_q1', headerName: 'ไตรมาส 1', flex: 0.5, type: 'number' },
    { field: 'plan_q2', headerName: 'ไตรมาส 2', flex: 0.5, type: 'number' },
    { field: 'plan_q3', headerName: 'ไตรมาส 3', flex: 0.5, type: 'number' },
    { field: 'plan_q4', headerName: 'ไตรมาส 4', flex: 0.5, type: 'number' },
  ]

  const btnStyle = (bg, hover) => ({ backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover } })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลแผนโครงการ/งบประมาณ" subtitle="นำเข้าจากไฟล์ Excel (Sheet: แผนโครงการ)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="10px" flexWrap="wrap">
          <TextField size="small" select label="ปีงบประมาณ (พ.ศ.)" value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)} sx={{ minWidth: 180 }}>
            {fiscalYearOptions.map((y) => <MenuItem key={y} value={String(y)}>{y}</MenuItem>)}
          </TextField>
          <Box display="flex">
            <form><input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} /></form>
            {canEdit && <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={() => fileInputRef.current.click()}><SpellcheckIcon sx={{ mr: '10px' }} />เลือกไฟล์</Button>}
            {canEdit && <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={handleImport}><BrowserUpdatedIcon sx={{ mr: '10px' }} />นำเข้าทั้งหมด</Button>}
            {canEdit && <Button sx={btnStyle(colors.redAccent[700], colors.redAccent[800])} onClick={handleClear}><HighlightOffIcon sx={{ mr: '10px' }} />ล้างข้อมูล</Button>}
          </Box>
        </Box>
        {showProgress && <UploadProgresBar />}
        <DataGrid rows={data} columns={columns} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default BudgetPlanImportData
