import React, { useRef, useState } from 'react'
import { Box, useTheme, Button, Typography } from '@mui/material'
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
import { bulkImportStudentAward } from '../../actions/studentAward.action'
import { bulkImportStudentActivity } from '../../actions/studentActivity.action'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'

// แปลงวันที่จาก Excel — รองรับทั้ง serial number และ string พ.ศ. "DD/MM/YYYY"
function excelDateToISO(val) {
  if (!val && val !== 0) return null
  // กรณีเป็น string เช่น "12/01/2569" หรือ "2569-01-12"
  if (typeof val === 'string' && val.trim()) {
    var s = val.trim()
    // format DD/MM/YYYY (พ.ศ.)
    var m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (m) {
      var day = m[1].padStart(2, '0')
      var mon = m[2].padStart(2, '0')
      var yearBE = parseInt(m[3])
      var yearCE = yearBE > 2400 ? yearBE - 543 : yearBE  // ถ้า > 2400 ถือว่าเป็นพ.ศ.
      return yearCE + '-' + mon + '-' + day
    }
    // format YYYY-MM-DD ที่อาจเป็นพ.ศ. อยู่แล้ว
    var m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (m2) {
      var y = parseInt(m2[1])
      if (y > 2400) return (y - 543) + '-' + m2[2] + '-' + m2[3]
      return s
    }
    return null
  }
  // กรณีเป็น serial number (ตัวเลข)
  if (typeof val === 'number') {
    var d = new Date(Math.round((val - 25569) * 86400 * 1000))
    return d.toISOString().split('T')[0]
  }
  return null
}

const TABS = ['นิสิต', 'รางวัล', 'ทุน', 'โครงการ']

const StudentAffairsImportData = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const loginReducer = useSelector(function(state) { return state.app.loginReducer })

  const [activeTab, setActiveTab] = useState(0)
  const [dataStudent, setDataStudent] = useState([])
  const [dataAward, setDataAward] = useState([])
  const [dataGrant, setDataGrant] = useState([])
  const [dataActivity, setDataActivity] = useState([])
  const [showProgress, setShowProgress] = useState(false)

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var activeData = [dataStudent, dataAward, dataGrant, dataActivity][activeTab]

  const handleFileChange = function(e) {
    var file = e.target.files[0]
    if (!file) return
    setShowProgress(true)
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
      var wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })
      // SheetNames: [0]=dashboard design, [1]=ข้อมูลนิสิต, [2]=นิสิตได้รับรางวัล, [3]=ทุนการศึกษา, [4]=โครงการ
      // Row 0 = notes/hints, Row 1 = real headers → use range: 1

      // Sheet 1: นิสิต
      var ws1 = wb.Sheets[wb.SheetNames[1]]
      var raw1 = ws1 ? XLSX.utils.sheet_to_json(ws1, { defval: '', range: 1 }) : []
      var mapped1 = raw1
        .filter(function(r) { return r['รหัสนิสิต'] || r['ชื่อ'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            studentOfficial_id: String(r['รหัสนิสิต'] || ''),
            firstname: String(r['ชื่อ'] || ''),
            lastname: String(r['สกุล'] || ''),
            major_name: String(r['สาขาวิชา'] || ''),
            department_name: String(r['ภาควิชา'] || ''),
            entry_year: Number(r['ปีการศึกษาที่เข้าเรียน'] || 0) || null,
          }
        })
      setDataStudent(mapped1)

      // Sheet 2: รางวัล
      var ws2 = wb.Sheets[wb.SheetNames[2]]
      var raw2 = ws2 ? XLSX.utils.sheet_to_json(ws2, { defval: '', range: 1 }) : []
      var mapped2 = raw2
        .filter(function(r) { return r['รหัสนิสิต'] || r['ผลงาน/รางวัลที่ได้รับ'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            studentOfficial_id: String(r['รหัสนิสิต'] || ''),
            award_name: String(r['ผลงาน/รางวัลที่ได้รับ'] || ''),
            award_level: String(r['ระดับชาติ/นานาชาติ'] || ''),
            venue: String(r['สถานที่'] || ''),
            award_date: excelDateToISO(r['วัน เดือน ปี']),
          }
        })
      setDataAward(mapped2)

      // Sheet 3: ทุน
      var ws3 = wb.Sheets[wb.SheetNames[3]]
      var raw3 = ws3 ? XLSX.utils.sheet_to_json(ws3, { defval: '', range: 1 }) : []
      var mapped3 = raw3
        .filter(function(r) { return r['รหัสนิสิต'] || r['ชื่อทุน/ผู้มอบทุน'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            studentOfficial_id: String(r['รหัสนิสิต'] || ''),
            grant_name: String(r['ชื่อทุน/ผู้มอบทุน'] || ''),
            amount: parseFloat(r['มูลค่า (บาท)']) || 0,
            grant_type: String(r['ประเภททุน'] || ''),
            grant_source: String(r['แหล่งทุน'] || ''),
            loan_status: String(r['การกู้เงิน (กยศ.)'] || ''),
          }
        })
      setDataGrant(mapped3)

      // Sheet 4: โครงการ
      var ws4 = wb.Sheets[wb.SheetNames[4]]
      var raw4 = ws4 ? XLSX.utils.sheet_to_json(ws4, { defval: '', range: 1 }) : []
      var mapped4 = raw4
        .filter(function(r) { return r['รหัสโครงการ'] || r['ชื่อโครงการ'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            activity_code: String(r['รหัสโครงการ'] || ''),
            activity_name: String(r['ชื่อโครงการ'] || ''),
            organizer: String(r['หน่วยงาน'] || ''),
            start_date: excelDateToISO(r['วันที่เริ่มโครงการ']),
            end_date: excelDateToISO(r['วันที่สิ้นสุดโคงการ'] || r['วันที่สิ้นสุดโครงการ']),
            venue: String(r['สถานที่'] || ''),
            participant_count: parseInt(r['คนเข้าร่วม']) || 0,
            hours: parseFloat(r['จำนวนชั่วโมง']) || 0,
            budget_amount: parseFloat(r['จำนวนเงิน']) || 0,
            participant_ids: String(r['นิสิตที่เข้าร่วม'] || ''),
          }
        })
      setDataActivity(mapped4)

      setShowProgress(false)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = function() { setShowProgress(false) }
  }

  const handleImport = async function() {
    var toImport = activeData.map(function(r) { var copy = Object.assign({}, r); delete copy.id; return copy })
    if (!toImport.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }
    if (!window.confirm('นำเข้า ' + TABS[activeTab] + ' ' + toImport.length + ' รายการ?')) return

    var res
    if (activeTab === 0) {
      // นิสิต → POST /student/bulk
      try {
        var r = await httpClient.post(server.STUDENT_URL + '/bulk', toImport)
        res = r.data
      } catch (err) {
        res = { status: 'nok', result: String(err) }
      }
    } else if (activeTab === 1) {
      // รางวัล → studentaward/bulk
      res = await dispatch(bulkImportStudentAward(toImport))
    } else if (activeTab === 2) {
      // ทุน → studentgrant/bulk (resolve studentOfficial_id on backend via direct POST)
      try {
        var r2 = await httpClient.post(server.STUDENTGRANT_URL + '/bulk', { records: toImport })
        res = r2.data
      } catch (err2) {
        res = { status: 'nok', result: String(err2) }
      }
    } else if (activeTab === 3) {
      // โครงการ → studentactivity/bulk
      res = await dispatch(bulkImportStudentActivity(toImport))
    }

    if (res && res.status === 'ok') {
      alert('นำเข้าสำเร็จ ' + (res.count || '') + ' รายการ')
      if (activeTab === 0) setDataStudent([])
      else if (activeTab === 1) setDataAward([])
      else if (activeTab === 2) setDataGrant([])
      else setDataActivity([])
    } else {
      alert('เกิดข้อผิดพลาด: ' + ((res && res.result) || ''))
    }
  }

  const handleClear = function() {
    setDataStudent([]); setDataAward([]); setDataGrant([]); setDataActivity([])
    setShowProgress(false)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const dgStyles = {
    '& .MuiDataGrid-root': { border: 1, borderColor: colors.greenAccent[500] },
    '& .MuiDataGrid-columnHeader': { borderBottom: 'none', backgroundColor: colors.primary[400] },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: colors.grey[100] + ' !important' },
  }

  const colsStudent = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'studentOfficial_id', headerName: 'รหัสนิสิต', flex: 0.8 },
    { field: 'firstname', headerName: 'ชื่อ', flex: 0.7 },
    { field: 'lastname', headerName: 'สกุล', flex: 0.7 },
    { field: 'major_name', headerName: 'สาขา', flex: 0.8 },
    { field: 'department_name', headerName: 'ภาควิชา', flex: 1 },
    { field: 'entry_year', headerName: 'ปีที่เข้า', flex: 0.5 },
  ]
  const colsAward = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'studentOfficial_id', headerName: 'รหัสนิสิต', flex: 0.8 },
    { field: 'award_name', headerName: 'รางวัล', flex: 2 },
    { field: 'award_level', headerName: 'ระดับ', flex: 0.7 },
    { field: 'venue', headerName: 'สถานที่', flex: 0.8 },
    { field: 'award_date', headerName: 'วันที่', flex: 0.7 },
  ]
  const colsGrant = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'studentOfficial_id', headerName: 'รหัสนิสิต', flex: 0.8 },
    { field: 'grant_name', headerName: 'ชื่อทุน', flex: 1.5 },
    { field: 'amount', headerName: 'มูลค่า', flex: 0.6, type: 'number' },
    { field: 'grant_type', headerName: 'ประเภท', flex: 0.8 },
    { field: 'loan_status', headerName: 'กยศ.', flex: 0.7 },
  ]
  const colsActivity = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'activity_code', headerName: 'รหัส', flex: 0.5 },
    { field: 'activity_name', headerName: 'ชื่อโครงการ', flex: 2 },
    { field: 'organizer', headerName: 'หน่วยงาน', flex: 0.8 },
    { field: 'start_date', headerName: 'วันเริ่ม', flex: 0.7 },
    { field: 'participant_count', headerName: 'ผู้เข้าร่วม', flex: 0.6, type: 'number' },
    { field: 'budget_amount', headerName: 'งบประมาณ', flex: 0.7, type: 'number' },
  ]
  var activeCols = [colsStudent, colsAward, colsGrant, colsActivity][activeTab]

  var btnStyle = function(bg, hover) {
    return {
      backgroundColor: bg, color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
      padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: hover },
    }
  }

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลกิจการนิสิต" subtitle="นำเข้าจากไฟล์ Excel (4 sheets)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" mb="10px" flexWrap="wrap">
          <Box display="flex" flexWrap="wrap">
            {TABS.map(function(tab, idx) {
              return (
                <Button
                  key={idx}
                  sx={btnStyle(
                    activeTab === idx ? colors.greenAccent[600] : colors.primary[400],
                    colors.greenAccent[800]
                  )}
                  onClick={function() { return setActiveTab(idx) }}
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
            {canEdit && (
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

export default StudentAffairsImportData
