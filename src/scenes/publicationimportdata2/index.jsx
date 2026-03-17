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
import { bulkImportPublication } from '../../actions/authorProfile.action'

const PublicationImportData2 = () => {
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
      // SheetNames: [0]=dashboard design, [1]=Author profile, [2]=Author profile สายสนับสนุน, [3]=Paper
      const ws = wb.Sheets[wb.SheetNames[3]] // Sheet "Paper"
      const raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
      // Paper sheet columns: คอลัมน์ 1=paper ID (P1,P2..), ID(A)=author ID, ชื่อเรื่อง, ค.ศ., ฯลฯ
      // unique papers only (deduplicate by คอลัมน์ 1)
      const seenPapers = new Set()
      const mapped = raw
        .filter((r) => r['ชื่อเรื่อง'] && !seenPapers.has(r['คอลัมน์ 1']) && seenPapers.add(r['คอลัมน์ 1']))
        .map((r, i) => ({
          id: i + 1,
          spreadsheet_id: String(r['คอลัมน์ 1'] || ''),
          title: String(r['ชื่อเรื่อง'] || '').trim(),
          journal_name: String(r['ชื่อวารสาร'] || ''),
          publication_year: Number(r['ค.ศ.'] || 0),
          issn: String(r['ISSN'] || ''),
          doi: String(r['DOI '] || r['DOI'] || '').trim(),
          quartile: String(r['Q (Scopus)'] || ''),
          q_scie: String(r['Q (SCIE)'] || ''),
          impact_factor: Number(r['IF'] || 0) || null,
          is_scopus: r['Scopus'] === 1 || r['Scopus'] === '1',
          is_isi: r['ISI'] === 1 || r['ISI'] === '1',
          collab_type: String(r['ร่วมกับ'] || 'ไทย'),
          is_international: r['ต่างปนะเทศ'] === 1 || r['ต่างปนะเทศ'] === '1',
          database_source: r['Scopus'] ? 'Scopus' : r['ISI'] ? 'ISI' : 'Other',
          photo_url: String(r['URL รูป (ตีพิมพ์)'] || ''),
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
    if (!window.confirm(`นำเข้าผลงานวิจัย ${toImport.length} รายการ?`)) return
    const res = await dispatch(bulkImportPublication(toImport))
    if (res?.status === 'ok') {
      alert(`นำเข้าสำเร็จ ${res.count} รายการ`)
      setData([])
    } else {
      alert('เกิดข้อผิดพลาด: ' + (res?.result || ''))
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
    { field: 'spreadsheet_id', headerName: 'ID(A)', flex: 0.4, cellClassName: 'name-column--cell' },
    { field: 'title', headerName: 'ชื่อเรื่อง', flex: 2.5 },
    { field: 'journal_name', headerName: 'วารสาร', flex: 1.2 },
    { field: 'publication_year', headerName: 'ค.ศ.', flex: 0.5, type: 'number' },
    { field: 'quartile', headerName: 'Q (Scopus)', flex: 0.6 },
    { field: 'q_scie', headerName: 'Q (SCIE)', flex: 0.6 },
    { field: 'impact_factor', headerName: 'IF', flex: 0.5, type: 'number' },
    { field: 'database_source', headerName: 'ฐานข้อมูล', flex: 0.7 },
    { field: 'collab_type', headerName: 'ความร่วมมือ', flex: 0.7 },
  ]

  const btnStyle = (bg, hover) => ({
    backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
    padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover },
  })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  return (
    <Box m="20px">
      <Header title="นำเข้าผลงานวิจัยตีพิมพ์" subtitle="นำเข้าจากไฟล์ Excel (Sheet: Paper)" />
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

export default PublicationImportData2
