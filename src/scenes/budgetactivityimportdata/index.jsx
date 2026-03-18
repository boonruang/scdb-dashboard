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
import { bulkImportBudgetActivity, validateBudgetCodes } from '../../actions/budgetActivity.action'

const excelSerialToDate = (serial) => {
  if (!serial || isNaN(serial)) return null
  return new Date((serial - 25569) * 86400 * 1000).toISOString().split('T')[0]
}

const num = (v) => Number(v) || 0
const str = (v) => String(v || '').trim()

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
      // row[0]=merged header, row[1]=header จริง, row[2]+= ข้อมูล
      const allRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
      const dataRows = allRows.slice(2).filter(r => r[0] !== '')

      const mapped = dataRows
        .filter(r => str(r[2]) !== '') // col[2] = activity_name ต้องมีค่า
        .map((r, i) => {
          const bc = str(r[0]) // col[0] = budget_code
          return {
            id: i + 1,
            budget_code:          bc,
            activity_code:        str(r[1]),  // เก็บตามไฟล์ — อาจว่าง
            activity_name:        str(r[2]),
            budget_requested:     num(r[3]),
            start_date:           excelSerialToDate(r[18]),
            end_date:             excelSerialToDate(r[19]),
            target_student_y1:    num(r[4]),
            target_student_y2:    num(r[5]),
            target_student_y3:    num(r[6]),
            target_student_y4:    num(r[7]),
            target_admin:         num(r[8]),
            target_academic:      num(r[9]),
            target_support:       num(r[10]),
            target_student_ext:   num(r[11]),
            target_public:        num(r[12]),
            strategy:             str(r[13]),
            student_dev_standard: str(r[14]),
            sdgs:                 str(r[15]),
            bcg:                  str(r[16]),
            smart_university:     str(r[17]),
            venue:                str(r[20]),
            output_text:          str(r[21]),
            target_value:         str(r[22]),
            outcome:              str(r[23]),
            impact:               str(r[24]),
            note:                 str(r[25]),
          }
        })
      setData(mapped)
      clearInterval(interval); setProgress(100)
      setTimeout(() => { setShowProgress(false); setProgress(0) }, 500)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = () => { clearInterval(interval); setShowProgress(false) }
  }

  const handleImport = async () => {
    if (!data.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }

    const uniqueBudgetCodes = [...new Set(data.map(r => r.budget_code))]
    const validateRes = await dispatch(validateBudgetCodes(uniqueBudgetCodes))
    const missingCodes = (validateRes && validateRes.missing) || []
    const maxCodes     = (validateRes && validateRes.maxCodes) || {}

    // แจ้งเตือน rows ที่ activity_code ว่าง
    const emptyCodeRows = data.filter(r => r.activity_code === '')
    if (emptyCodeRows.length > 0) {
      const confirmMsg = 'พบ ' + emptyCodeRows.length + ' รายการที่ไม่ระบุรหัสกิจกรรม\nระบบจะสร้างรหัสกิจกรรมให้อัตโนมัติ (ต่อจากรหัสล่าสุดใน DB)\nต้องการดำเนินการต่อหรือไม่?'
      if (!window.confirm(confirmMsg)) return
    }

    // auto-generate activity_code สำหรับ row ที่ว่าง ต่อจาก max ใน DB
    const autoCounters = {}
    const withCodes = data.map(r => {
      if (r.activity_code !== '') return r
      const bc = r.budget_code
      if (!autoCounters[bc]) {
        const maxInDb = maxCodes[bc] || ''
        const suffix = maxInDb ? parseInt(maxInDb.slice(-3), 10) : 0
        autoCounters[bc] = suffix
      }
      autoCounters[bc] += 1
      const newCode = bc + String(autoCounters[bc]).padStart(3, '0')
      return Object.assign({}, r, { activity_code: newCode })
    })

    const toImport = withCodes.map(({ id, ...rest }) => rest)

    const dupCodes = withCodes
      .filter((r, i, arr) => arr.findIndex(x => x.activity_code === r.activity_code) !== i)
      .map(r => r.activity_code)

    let msg = 'จะนำเข้า ' + toImport.length + ' รายการ\n'
    msg += '• รหัสกิจกรรมซ้ำในไฟล์: ' + (dupCodes.length > 0 ? dupCodes.join(', ') : 'ไม่มี') + '\n'

    if (missingCodes.length > 0) {
      const validImport = toImport.filter(r => !missingCodes.includes(r.budget_code))
      msg += '\n⚠️ รหัสงบประมาณต่อไปนี้ไม่มีในระบบ:\n  ' + missingCodes.join(', ') + '\n'
      msg += '\nต้องการ import เฉพาะ ' + validImport.length + ' รายการที่ถูกต้อง หรือยกเลิก?'
      if (!window.confirm(msg)) return
      if (!validImport.length) { alert('ไม่มีรายการที่สามารถนำเข้าได้'); return }
      const res = await dispatch(bulkImportBudgetActivity(validImport))
      if (res && res.success) {
        alert('นำเข้าสำเร็จ\n• เพิ่มใหม่: ' + res.data.inserted + ' รายการ\n• อัปเดต: ' + res.data.updated + ' รายการ\n• ข้าม: ' + (toImport.length - validImport.length) + ' รายการ')
        setData([])
      } else alert('เกิดข้อผิดพลาด: ' + ((res && res.error) || ''))
    } else {
      msg += '\n(รหัสกิจกรรมซ้ำใน DB จะถูก update อัตโนมัติ)\n\nยืนยันการนำเข้า?'
      if (!window.confirm(msg)) return
      const res = await dispatch(bulkImportBudgetActivity(toImport))
      if (res && res.success) {
        alert('นำเข้าสำเร็จ\n• เพิ่มใหม่: ' + res.data.inserted + ' รายการ\n• อัปเดต: ' + res.data.updated + ' รายการ')
        setData([])
      } else alert('เกิดข้อผิดพลาด: ' + ((res && res.error) || ''))
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
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` }
  }

  const columns = [
    { field: 'id',                  headerName: 'ลำดับ',          flex: 0.3, headerAlign: 'center', align: 'center' },
    { field: 'budget_code',         headerName: 'รหัสงบประมาณ',   flex: 0.7, cellClassName: 'name-column--cell' },
    { field: 'activity_code',       headerName: 'รหัสกิจกรรม',    flex: 0.9, cellClassName: 'name-column--cell' },
    { field: 'activity_name',       headerName: 'ชื่อกิจกรรม',    flex: 2 },
    { field: 'budget_requested',    headerName: 'งบที่ขอ (บาท)',  flex: 0.7, type: 'number' },
    { field: 'start_date',          headerName: 'เริ่มต้น',        flex: 0.6 },
    { field: 'end_date',            headerName: 'สิ้นสุด',         flex: 0.6 },
    { field: 'venue',               headerName: 'สถานที่',          flex: 0.8 },
    { field: 'sdgs',                headerName: 'SDGs',            flex: 0.5 },
    { field: 'strategy',            headerName: 'ยุทธศาสตร์',      flex: 0.5 },
  ]

  const btnStyle = (bg, hover) => ({ backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover } })
  const canEdit = loginReducer?.result?.roles?.find((r) => [ROLES.Admin, ROLES.Editor].includes(r))

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลกิจกรรมโครงการ" subtitle="นำเข้าจากไฟล์ Excel (Sheet: ขออนุมัติจัดโครงการ)" />
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
