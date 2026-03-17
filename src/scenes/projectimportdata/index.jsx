import React, { useRef, useState } from 'react'
import { Box, useTheme, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES, server } from '../../constants'
import * as XLSX from 'xlsx'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import UploadProgresBar from 'components/UploadProgresBar'
import { httpClient } from '../../utils/HttpClient'

const excelSerialToDate = (val) => {
  if (!val) return null
  if (typeof val === 'string' && val.includes('/')) {
    // format ว/ด/ป (พ.ศ.) เช่น 1/10/2567
    const parts = val.split('/')
    if (parts.length === 3) {
      const year = Number(parts[2]) > 2400 ? Number(parts[2]) - 543 : Number(parts[2])
      return `${year}-${String(parts[1]).padStart(2,'0')}-${String(parts[0]).padStart(2,'0')}`
    }
  }
  if (typeof val === 'number') {
    return new Date((val - 25569) * 86400 * 1000).toISOString().split('T')[0]
  }
  return String(val)
}

const ProjectImportData = () => {
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

      // หา sheet ที่มีข้อมูลโครงการ (ข้ามถ้า sheet[0] ว่าง)
      let sheetIdx = 0
      for (let i = 0; i < wb.SheetNames.length; i++) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]], { header: 1, defval: '' })
        if (rows.length > 1 && rows[1].some(v => v !== '')) { sheetIdx = i; break }
      }

      const ws = wb.Sheets[wb.SheetNames[sheetIdx]]
      // อ่านแบบ array เพราะ Excel ไฟล์มี merged header row ทำให้ row[0]=merged, row[1]=header จริง
      const allRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })

      // row[1] = header จริง, row[2]+ = ข้อมูล
      // ถ้าไม่มี merged row (ไฟล์ทั่วไป) ให้ใช้ row[0] เป็น header
      const headerRow = allRows[0].some(v => v !== '') && !allRows[0].every(v => v === '' || String(v).includes('\n'))
        ? 0 : 1
      const headers = allRows[headerRow]
      const dataRows = allRows.slice(headerRow + 1).filter(r => r.some(v => v !== ''))

      // map index ของ column ที่สำคัญ
      const idx = (candidates) => candidates.reduce((found, c) => found !== -1 ? found : headers.findIndex(h => String(h).includes(c)), -1)

      const iName     = idx(['โครงการ/กิจกรรม', 'project_name', 'ชื่อโครงการ'])
      const iType     = idx(['หมวดงบประมาณ', 'project_type', 'ประเภทโครงการ'])
      const iBudget   = idx(['งบประมาณจัดสรร', 'budget_amount', 'งบประมาณ'])
      const iSource   = idx(['รหัสงบประมาณ', 'budget_source', 'แหล่งงบประมาณ'])
      const iStart    = idx(['ระยะเวลาเริ่มต้น', 'start_date', 'วันเริ่มต้น'])
      const iEnd      = idx(['ระยะเวลาสิ้นสุด', 'end_date', 'วันสิ้นสุด'])
      const iDept     = idx(['responsible_dept_id', 'ภาควิชา'])
      const iStatus   = idx(['สถานะ', 'status'])

      const mapped = dataRows
        .filter((r) => iName !== -1 && r[iName] !== '')
        .map((r, i) => ({
          id: i + 1,
          project_name:        String(iName   !== -1 ? r[iName]   : ''),
          project_type:        String(iType   !== -1 ? r[iType]   : ''),
          responsible_dept_id: Number(iDept   !== -1 ? r[iDept]   : 1) || 1,
          start_date:          excelSerialToDate(iStart  !== -1 ? r[iStart]  : null),
          end_date:            excelSerialToDate(iEnd    !== -1 ? r[iEnd]    : null),
          budget_source:       String(iSource !== -1 ? r[iSource] : ''),
          budget_amount:       Number(iBudget !== -1 ? r[iBudget] : 0) || 0,
          status:              String(iStatus !== -1 ? r[iStatus] : ''),
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
    if (!window.confirm(`นำเข้าข้อมูลโครงการ ${toImport.length} รายการ?`)) return
    try {
      const res = await httpClient.post(`${server.PROJECT_URL}/bulk`, toImport)
      if (res.data?.status === 'ok') {
        alert(`นำเข้าสำเร็จ ${res.data.count} รายการ`)
        setData([])
      } else {
        alert('เกิดข้อผิดพลาด: ' + (res.data?.result || ''))
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.toString())
    }
  }

  const handleClear = () => {
    setData([]); setShowProgress(false); setProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .name-column--cell': { color: colors.greenAccent[300] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` },
  }

  const columns = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3, headerAlign: 'center', align: 'center' },
    { field: 'project_name', headerName: 'ชื่อโครงการ', flex: 2, cellClassName: 'name-column--cell' },
    { field: 'project_type', headerName: 'ประเภท', flex: 0.8 },
    { field: 'responsible_dept_id', headerName: 'ภาควิชา (ID)', flex: 0.6, type: 'number' },
    { field: 'start_date', headerName: 'เริ่มต้น', flex: 0.7 },
    { field: 'end_date', headerName: 'สิ้นสุด', flex: 0.7 },
    { field: 'budget_source', headerName: 'แหล่งงบ', flex: 0.8 },
    { field: 'budget_amount', headerName: 'งบประมาณ', flex: 0.7, type: 'number' },
    { field: 'status', headerName: 'สถานะ', flex: 0.6 },
  ]

  const btnStyle = (bg, hover) => ({
    backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
    padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover },
  })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลโครงการ" subtitle="นำเข้าจากไฟล์ Excel" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="end" mb="10px">
          <form>
            <input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </form>
          {canEdit && (
            <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={() => fileInputRef.current.click()}>
              <SpellcheckIcon sx={{ mr: '10px' }} />เลือกไฟล์
            </Button>
          )}
          {canEdit && (
            <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={handleImport}>
              <BrowserUpdatedIcon sx={{ mr: '10px' }} />นำเข้าทั้งหมด
            </Button>
          )}
          {canEdit && (
            <Button sx={btnStyle(colors.redAccent[700], colors.redAccent[800])} onClick={handleClear}>
              <HighlightOffIcon sx={{ mr: '10px' }} />ล้างข้อมูล
            </Button>
          )}
        </Box>
        {showProgress && <UploadProgresBar />}
        <DataGrid rows={data} columns={columns} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default ProjectImportData
