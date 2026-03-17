import React, { useRef, useState } from 'react'
import { Box, useTheme, Button } from '@mui/material'
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
import { bulkImportBudgetActivity } from '../../actions/budgetActivity.action'

const excelSerialToDate = (serial) => {
  if (!serial || isNaN(serial)) return null
  const date = new Date((serial - 25569) * 86400 * 1000)
  return date.toISOString().split('T')[0]
}

const BudgetActivityImportData = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  const [data, setData] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)

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
      const ws = wb.Sheets[wb.SheetNames[2]] // Sheet "ขออนุมัติจัดโครงการ"
      const raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
      const mapped = raw
        .filter((r) => r['รหัสงบประมาณ'] && r['โครงการ/กิจกรรม (ย่อย)'])
        .map((r, i) => ({
          id: i + 1,
          budget_code: String(r['รหัสงบประมาณ'] || ''),
          activity_code: String(r['รหัสโครงการ/กิจกรรม (ย่อย)'] || ''),
          activity_name: String(r['โครงการ/กิจกรรม (ย่อย)'] || ''),
          budget_requested: Number(r['งบประมาณที่ขอ\n(บาท)'] || r['งบประมาณที่ขอ'] || 0),
          start_date: excelSerialToDate(r['ระยะเวลาเริ่มต้นโครงการ\n(ว/ด/ป)'] || r['ระยะเวลาเริ่มต้นโครงการ']),
          end_date: excelSerialToDate(r['ระยะเวลาสิ้นสุดโครงการ\n(ว/ด/ป)'] || r['ระยะเวลาสิ้นสุดโครงการ']),
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
    const toImport = data.map(({ id, ...rest }) => rest)
    if (!window.confirm(`นำเข้าข้อมูลกิจกรรม ${toImport.length} รายการ?`)) return
    const res = await dispatch(bulkImportBudgetActivity(toImport))
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
    { field: 'activity_code', headerName: 'รหัสกิจกรรม', flex: 0.8 },
    { field: 'activity_name', headerName: 'ชื่อกิจกรรม', flex: 2 },
    { field: 'budget_requested', headerName: 'งบที่ขอ (บาท)', flex: 0.7, type: 'number' },
    { field: 'start_date', headerName: 'เริ่มต้น', flex: 0.6 },
    { field: 'end_date', headerName: 'สิ้นสุด', flex: 0.6 },
  ]

  const btnStyle = (bg, hover) => ({ backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover } })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลกิจกรรมโครงการ" subtitle="นำเข้าจากไฟล์ Excel (Sheet: เข้ากิจกรรม)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="end" mb="10px">
          <form><input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} /></form>
          {canEdit && <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={() => fileInputRef.current.click()}><SpellcheckIcon sx={{ mr: '10px' }} />เลือกไฟล์</Button>}
          {canEdit && <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={handleImport}><BrowserUpdatedIcon sx={{ mr: '10px' }} />นำเข้าทั้งหมด</Button>}
          {canEdit && <Button sx={btnStyle(colors.redAccent[700], colors.redAccent[800])} onClick={handleClear}><HighlightOffIcon sx={{ mr: '10px' }} />ล้างข้อมูล</Button>}
        </Box>
        {showProgress && <UploadProgresBar />}
        <DataGrid rows={data} columns={columns} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default BudgetActivityImportData
