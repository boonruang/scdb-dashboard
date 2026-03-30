import React, { useRef, useState } from 'react'
import { Box, useTheme, Button, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import * as XLSX from 'xlsx'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import UploadProgresBar from 'components/UploadProgresBar'
import { httpClient } from '../../utils/HttpClient'
import { excelDateToISO } from '../../utils/dateUtils'

var TABS = ['บุคลากร', 'สถิติการลา']

var StaffImportData = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var fileInputRef = useRef(null)
  var loginReducer = useSelector(function(s) { return s.app.loginReducer })

  var [activeTab, setActiveTab] = useState(0)
  var [dataStaff, setDataStaff] = useState([])
  var [dataLeave, setDataLeave] = useState([])
  var [showProgress, setShowProgress] = useState(false)

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var activeData = activeTab === 0 ? dataStaff : dataLeave

  var handleFileChange = function(e) {
    var file = e.target.files[0]
    if (!file) return
    setShowProgress(true)
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
      var wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })

      // Sheet index 1: ข้อมูลบุคคลากร (row 0=hints, row 1=headers → range:1)
      var ws1 = wb.Sheets[wb.SheetNames[1]]
      var raw1 = ws1 ? XLSX.utils.sheet_to_json(ws1, { defval: '', range: 1 }) : []
      var mapped1 = raw1
        .filter(function(r) { return r['เลขประจำตำแหน่ง'] || r['ชื่อภาษาไทย'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            position_no: r['เลขประจำตำแหน่ง'] ? String(Math.round(r['เลขประจำตำแหน่ง'])) : '',
            status: String(r['สถานะ'] || ''),
            title: String(r['คำนำหน้า'] || ''),
            firstname_th: String(r['ชื่อภาษาไทย'] || ''),
            lastname_th: String(r['สกุลภาษาไทย'] || ''),
            firstname: String(r['ชื่อภาษาอังกฤษ'] || ''),
            lastname: String(r['สกุลภาษาอังกฤษ'] || ''),
            position: String(r['ตำแหน่ง'] || ''),
            education: String(r['วุฒิการศึกษาสูงสุด'] || ''),
            startdate: excelDateToISO(r['ว/ด/ป/ บรรจุ']),
            birthday: excelDateToISO(r['ว/ด/ป/ เกิด']),
            dept: String(r['สังกัด'] || ''),
            email: String(r['E-mail'] || ''),
            phone_no: String(r['โทรศัพท์'] || ''),
          }
        })
      setDataStaff(mapped1)

      // Sheet index 2: สถิติการลา (row 0=hints, row 1=headers → range:1)
      var ws2 = wb.Sheets[wb.SheetNames[2]]
      var raw2 = ws2 ? XLSX.utils.sheet_to_json(ws2, { defval: '', range: 1, raw: false }) : []
      var mapped2 = raw2
        .filter(function(r) { return r['เลขประจำตำแหน่ง'] || r['ประเภทการลา'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            position_no: r['เลขประจำตำแหน่ง'] ? String(Math.round(r['เลขประจำตำแหน่ง'])) : '',
            leave_type: String(r['ประเภทการลา'] || ''),
            start_date: excelDateToISO(r['วันที่เริ่มต้น']),
            end_date: excelDateToISO(r['วันที่สิ้นสุด']),
          }
        })
      setDataLeave(mapped2)

      setShowProgress(false)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = function() { setShowProgress(false) }
  }

  var handleImport = async function() {
    var toImport = activeData
      .filter(function(r) {
        if (activeTab === 0) return r.status && r.firstname_th  // บุคลากร: ต้องมีสถานะและชื่อ
        return r.position_no && r.leave_type                    // การลา: ต้องมีเลขตำแหน่งและประเภทการลา
      })
      .map(function(r) { var copy = Object.assign({}, r); delete copy.id; return copy })

    if (!toImport.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }

    // สรุปจำนวนแยกตามสถานะ (tab บุคลากร)
    var summary = ''
    if (activeTab === 0) {
      var statusCount = {}
      toImport.forEach(function(r) { statusCount[r.status] = (statusCount[r.status] || 0) + 1 })
      summary = Object.keys(statusCount).map(function(k) { return k + ' ' + statusCount[k] + ' คน' }).join(', ')
      summary = '\n(' + summary + ')'
    }

    if (!window.confirm('นำเข้า ' + TABS[activeTab] + ' ' + toImport.length + ' รายการ?' + summary)) return
    try {
      var url = activeTab === 0 ? 'staff/bulk' : 'leaverecord/bulk'
      var res = await httpClient.post(url, toImport)
      if (res.data && res.data.status === 'ok') {
        alert('นำเข้าสำเร็จ ' + (res.data.count || toImport.length) + ' รายการ' + summary)
        if (activeTab === 0) setDataStaff([])
        else setDataLeave([])
      } else {
        alert('เกิดข้อผิดพลาด: ' + ((res.data && res.data.result) || ''))
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + String(err))
    }
  }

  var handleClear = function() {
    setDataStaff([]); setDataLeave([]); setShowProgress(false)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  var dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: colors.grey[100] + ' !important' },
  }

  var btnStyle = function(bg, hover) {
    return {
      backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
      padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover },
    }
  }

  var colsStaff = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'position_no', headerName: 'เลขประจำตำแหน่ง', flex: 0.7 },
    { field: 'status', headerName: 'สถานะ', flex: 0.6 },
    { field: 'firstname_th', headerName: 'ชื่อ', flex: 0.7 },
    { field: 'lastname_th', headerName: 'สกุล', flex: 0.7 },
    { field: 'position', headerName: 'ตำแหน่ง', flex: 1 },
    { field: 'education', headerName: 'วุฒิ', flex: 0.6 },
    { field: 'dept', headerName: 'สังกัด', flex: 0.8 },
    { field: 'startdate', headerName: 'วันบรรจุ', flex: 0.6 },
  ]

  var colsLeave = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'position_no', headerName: 'เลขประจำตำแหน่ง', flex: 0.7 },
    { field: 'leave_type', headerName: 'ประเภทการลา', flex: 0.8 },
    { field: 'start_date', headerName: 'วันที่เริ่มต้น', flex: 0.7 },
    { field: 'end_date', headerName: 'วันที่สิ้นสุด', flex: 0.7 },
  ]

  var activeCols = activeTab === 0 ? colsStaff : colsLeave

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลบุคลากร" subtitle="นำเข้าจากไฟล์ Excel (ข้อมูลฝ่ายบุคลากรและวิเทศสัมพันธ์)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>

        <Box display="flex" justifyContent="space-between" mb="10px" flexWrap="wrap">
          <Box display="flex" flexWrap="wrap">
            {TABS.map(function(tab, idx) {
              return (
                <Button key={idx}
                  sx={btnStyle(
                    activeTab === idx ? colors.greenAccent[600] : colors.primary[400],
                    colors.greenAccent[800]
                  )}
                  onClick={function() { setActiveTab(idx) }}
                >
                  {tab} {activeTab === idx && activeData.length > 0 ? '(' + activeData.length + ')' : ''}
                </Button>
              )
            })}
          </Box>
          <Box display="flex" flexWrap="wrap">
            <form>
              <input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </form>
            {canEdit && (
              <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={function() { return fileInputRef.current.click() }}>
                <SpellcheckIcon sx={{ mr: '10px' }} />เลือกไฟล์
              </Button>
            )}
            {canEdit && activeData.length > 0 && (
              <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={handleImport}>
                <BrowserUpdatedIcon sx={{ mr: '10px' }} />นำเข้า{TABS[activeTab]}
              </Button>
            )}
            {canEdit && (
              <Button sx={btnStyle(colors.redAccent[700], colors.redAccent[800])} onClick={handleClear}>
                <HighlightOffIcon sx={{ mr: '10px' }} />ล้างข้อมูล
              </Button>
            )}
          </Box>
        </Box>

        {showProgress && <UploadProgresBar />}
        <DataGrid rows={activeData} columns={activeCols} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default StaffImportData
