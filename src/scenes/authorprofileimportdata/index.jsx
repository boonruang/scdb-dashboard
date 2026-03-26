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
import { bulkImportAuthorProfile } from '../../actions/authorProfile.action'

// Map department name → department_id (รองรับทั้งภาษาไทยและอังกฤษ)
const DEPT_MAP = {
  'ชีววิทยา': 1, 'Biology': 1,
  'คณิตศาสตร์': 2, 'Mathematics': 2, 'Math': 2,
  'เคมี': 3, 'Chemistry': 3,
  'ฟิสิกส์': 4, 'Physics': 4,
}

const AuthorProfileImportData = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  const [data, setData] = useState([])
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)
  // SheetNames: [0]=dashboard design, [1]=Author profile, [2]=Author profile สายสนับสนุน, [3]=Paper
  // which sheet to read: 1 = สายวิชาการ, 2 = สายสนับสนุน
  const [sheetIndex, setSheetIndex] = useState(1)

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
      const ws = wb.Sheets[wb.SheetNames[sheetIndex]]
      const raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
      const mapped = raw
        .filter((r) => r['ID(A)'] || r['รายชื่ออาจารย์'])
        .map((r, i) => ({
          id: i + 1,
          spreadsheet_id: String(r['ID(A)'] || ''),
          title_th: String(r['ตำแหน่งวิชาการ'] || ''),
          firstname_th: String((r['รายชื่ออาจารย์'] || '').trim().split(' ')[0] || ''),
          lastname_th: String((r['รายชื่ออาจารย์'] || '').trim().split(' ').slice(1).join(' ') || ''),
          firstname: String(r['First Name'] || ''),
          lastname: String(r['Last Name'] || ''),
          position: String(r['ตำแหน่งวิชาการ'] || ''),
          department_id: DEPT_MAP[String(r['ภาควิชา'] || '')] || null,
          citations_total: Number(r['Citations Total'] || 0),
          publications_count: Number(r['Publications'] || 0),
          h_index: Number(r['H-index'] || 0),
          docs_current_year: Number(r['Documents 2025'] || r['Documents 2024'] || 0),
          citations_current_year: Number(r['Citations 2025'] || r['Citations 2024'] || 0),
          scopus_url: String(r['Scopus ลิ้งค์ข้อมูล Author profile'] || ''),
          scholar_url: String(r['scholar ลิ้งค์ข้อมูล Author profile'] || ''),
          photo_url: String(r['URL รูป'] || ''),
          expertise: String(r['ความเชี่ยวชาญ'] || ''),
          interests: String(r['ความสนใจ'] || ''),
          email: String(r['E-mail'] || ''),
          phone_no: String(r['โทรศัพท์'] || ''),
          research_fund: String(r['แหล่งทุนวิจัยที่ได้รับ'] || ''),
          ethics_license: String(r['จริยธรรมการวิจัย (เลขที่ใบอนุญาต)'] || ''),
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
    if (!window.confirm(`อัปเดต Author Profile ${toImport.length} รายการ?`)) return
    const BATCH = 5
    var totalInserted = 0, totalUpdated = 0
    for (var i = 0; i < toImport.length; i += BATCH) {
      var chunk = toImport.slice(i, i + BATCH)
      var res = await dispatch(bulkImportAuthorProfile(chunk))
      if (!res || res.status !== 'ok') {
        alert('เกิดข้อผิดพลาด batch ' + (i / BATCH + 1) + ': ' + (res && res.result || ''))
        return
      }
      totalInserted += res.inserted || 0
      totalUpdated += res.updated || 0
    }
    alert(`อัปเดตสำเร็จ: ${totalUpdated} รายการ, เพิ่มใหม่: ${totalInserted} รายการ`)
    setData([])
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
    { field: 'spreadsheet_id', headerName: 'ID(A)', flex: 0.4, cellClassName: 'name-column--cell' },
    { field: 'title_th', headerName: 'ตำแหน่ง', flex: 0.8 },
    { field: 'firstname_th', headerName: 'ชื่อ (TH)', flex: 0.8, cellClassName: 'name-column--cell' },
    { field: 'lastname_th', headerName: 'นามสกุล (TH)', flex: 0.8 },
    { field: 'firstname', headerName: 'First Name', flex: 0.8 },
    { field: 'lastname', headerName: 'Last Name', flex: 0.8 },
    { field: 'citations_total', headerName: 'Citations', flex: 0.6, type: 'number' },
    { field: 'h_index', headerName: 'H-Index', flex: 0.5, type: 'number' },
    { field: 'email', headerName: 'Email', flex: 1 },
  ]

  const btnStyle = (bg, hover) => ({
    backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
    padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover },
  })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))
  const sheetLabel = sheetIndex === 1 ? 'สายวิชาการ' : 'สายสนับสนุน'

  return (
    <Box m="20px">
      <Header title="นำเข้า Author Profile" subtitle={`นำเข้าจากไฟล์ Excel — ${sheetLabel}`} />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="end" mb="10px">
          <form>
            <input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          </form>
          {canEdit && (
            <Button
              sx={btnStyle(sheetIndex === 1 ? colors.greenAccent[700] : colors.blueAccent[600], colors.greenAccent[900])}
              onClick={() => setSheetIndex(sheetIndex === 1 ? 2 : 1)}
            >
              {sheetLabel}
            </Button>
          )}
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

export default AuthorProfileImportData
