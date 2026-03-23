import React, { useRef, useState } from 'react'
import {
  Box, useTheme, Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Chip, Paper,
  Select, MenuItem, FormControl
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ROLES } from '../../constants'
import * as XLSX from 'xlsx'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UploadProgresBar from 'components/UploadProgresBar'
import { bulkImportStudentAward } from '../../actions/studentAward.action'
import { bulkImportStudentActivity } from '../../actions/studentActivity.action'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'
import { excelDateToISO } from '../../utils/dateUtils'

const TABS = ['นิสิต', 'รางวัล', 'ทุน', 'โครงการ']

// auto-generate department_code จากชื่อภาษาไทย → ใช้ตัวย่อ 4 ตัว
var deptCodeMap = {
  'คณิตศาสตร์': 'MATH', 'เคมี': 'CHEM', 'ฟิสิกส์': 'PHYS', 'ชีววิทยา': 'BIO',
  'จุลชีววิทยา': 'MICRO', 'ชีวเคมี': 'BIOC', 'สถิติ': 'STAT', 'คอมพิวเตอร์': 'CS',
  'วิทยาการคอมพิวเตอร์': 'CS', 'เทคโนโลยีสารสนเทศ': 'IT', 'สิ่งแวดล้อม': 'ENV',
}
function autoCode(name) {
  var s = (name || '').replace('ภาควิชา', '').replace('สาขาวิชา', '').replace('คณะ', '').replace('ฝ่าย', '').trim()
  // ค้นหาจาก map ก่อน
  for (var key in deptCodeMap) {
    if (name.indexOf(key) !== -1) return deptCodeMap[key]
  }
  // fallback: ใช้ชื่อย่อภาษาไทยเต็มคำ (ไม่ตัด)
  return s || 'DEPT'
}

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

  // mapping preview state (tab นิสิต เท่านั้น)
  const [showMapping, setShowMapping] = useState(false)
  const [deptMapping, setDeptMapping] = useState([])   // [{ excel_name, mapped_to, department_code, status, department_id }]
  const [majorMapping, setMajorMapping] = useState([]) // [{ major_name, department_name, status, major_id }]
  const [mappingLoading, setMappingLoading] = useState(false)
  const [masterDepts, setMasterDepts] = useState([])   // master list จาก DB

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var activeData = [dataStudent, dataAward, dataGrant, dataActivity][activeTab]

  const handleFileChange = function(e) {
    var file = e.target.files[0]
    if (!file) return
    setShowProgress(true)
    setShowMapping(false)
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
      var wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })

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

  // ขั้นตอนที่ 1: กด "ตรวจสอบการ Mapping" → ดึง master + distinct จาก Excel
  const handlePreviewMapping = async function() {
    if (!dataStudent.length) { alert('กรุณาเลือกไฟล์ก่อน'); return }
    setMappingLoading(true)
    try {
      // ดึง master departments จาก DB
      var masterRes = await httpClient.get('department/list')
      var master = (masterRes.data && masterRes.data.result) ? masterRes.data.result : []
      setMasterDepts(master)

      // distinct department_name จาก Excel
      var excelDeptNames = []
      dataStudent.forEach(function(r) {
        var dn = (r.department_name || '').trim()
        if (dn && excelDeptNames.indexOf(dn) === -1) excelDeptNames.push(dn)
      })

      // distinct major pairs จาก Excel
      var excelMajorPairs = []
      dataStudent.forEach(function(r) {
        var dn = (r.department_name || '').trim()
        var mn = (r.major_name || '').trim()
        if (mn && !excelMajorPairs.find(function(x) { return x.major_name === mn && x.department_name === dn })) {
          excelMajorPairs.push({ major_name: mn, department_name: dn })
        }
      })

      // auto-match: ถ้าชื่อใน Excel ตรงกับ master → mapped_to = master นั้น
      var deptRows = excelDeptNames.map(function(excelName) {
        var exact = master.find(function(m) { return (m.department_name || m.dept_name) === excelName })
        var partial = !exact ? master.find(function(m) {
          var mn = m.department_name || m.dept_name || ''
          return mn.indexOf(excelName) !== -1 || excelName.indexOf(mn) !== -1
        }) : null
        var matched = exact || partial
        return {
          excel_name: excelName,
          mapped_to: matched ? (matched.department_name || matched.dept_name) : '__NEW__',
          department_id: matched ? matched.department_id : null,
          department_code: matched ? (matched.department_code || autoCode(excelName)) : autoCode(excelName),
          status: matched ? 'exists' : 'new',
        }
      })
      setDeptMapping(deptRows)

      // major rows — mapped_to ภาควิชาจาก deptRows
      var majorRows = excelMajorPairs.map(function(p) {
        return { major_name: p.major_name, department_name: p.department_name }
      })
      setMajorMapping(majorRows)
      setShowMapping(true)
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + String(err))
    }
    setMappingLoading(false)
  }

  // ขั้นตอนที่ 2: user แก้ mapping แล้วกด "ยืนยัน Mapping และนำเข้า"
  const handleConfirmAndImport = async function() {
    setMappingLoading(true)
    try {
      // สร้าง excel_name → resolved_name map (skip แถวที่ user mark ข้าม)
      var deptResolveMap = {}
      deptMapping.forEach(function(d) {
        if (!d.skip) {
          deptResolveMap[d.excel_name] = d.excel_name
        }
        // skip → ไม่ใส่ใน map (students ที่มี dept นี้จะถูก import โดยไม่มี dept mapping)
      })

      // ส่งเฉพาะ departments ที่ไม่ skip
      var deptPayload = deptMapping.filter(function(d) { return !d.skip }).map(function(d) {
        return {
          department_name: d.excel_name,
          department_code: d.department_code,
          department_id: d.department_id || null,
        }
      })

      // majors — ข้าม major ที่ dept ถูก skip ด้วย
      var majorPayload = majorMapping.filter(function(m) {
        return !deptMapping.find(function(d) { return d.excel_name === m.department_name && d.skip })
      }).map(function(m) {
        return { major_name: m.major_name, department_name: m.department_name }
      })

      var confirmRes = await httpClient.post('major/confirm-mapping', {
        departments: deptPayload,
        majors: majorPayload,
      })
      if (!confirmRes.data || confirmRes.data.status !== 'ok') {
        alert('mapping ล้มเหลว: ' + ((confirmRes.data && confirmRes.data.result) || ''))
        setMappingLoading(false)
        return
      }

      // import นิสิต — แปลง department_name ให้ใช้ resolved name
      var toImport = dataStudent.map(function(r) {
        var copy = Object.assign({}, r)
        delete copy.id
        copy.department_name = deptResolveMap[copy.department_name] || copy.department_name
        return copy
      })
      var r = await httpClient.post(server.STUDENT_URL + '/bulk', toImport)
      if (r.data && r.data.status === 'ok') {
        alert('นำเข้าสำเร็จ ' + (r.data.count || toImport.length) + ' รายการ\nภาควิชา/สาขาวิชาถูก mapping แล้ว')
        setDataStudent([])
        setShowMapping(false)
      } else {
        alert('เกิดข้อผิดพลาด: ' + ((r.data && r.data.result) || ''))
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + String(err))
    }
    setMappingLoading(false)
  }

  // import tabs อื่น (รางวัล, ทุน, โครงการ) — ไม่ต้อง mapping
  const handleImportOther = async function() {
    var toImport = activeData.map(function(r) { var copy = Object.assign({}, r); delete copy.id; return copy })
    if (!toImport.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }
    if (!window.confirm('นำเข้า ' + TABS[activeTab] + ' ' + toImport.length + ' รายการ?')) return

    var res
    if (activeTab === 1) {
      res = await dispatch(bulkImportStudentAward(toImport))
    } else if (activeTab === 2) {
      try {
        var r2 = await httpClient.post(server.STUDENTGRANT_URL + '/bulk', { records: toImport })
        res = r2.data
      } catch (err2) { res = { status: 'nok', result: String(err2) } }
    } else if (activeTab === 3) {
      res = await dispatch(bulkImportStudentActivity(toImport))
    }

    if (res && res.status === 'ok') {
      alert('นำเข้าสำเร็จ ' + (res.count || '') + ' รายการ')
      if (activeTab === 1) setDataAward([])
      else if (activeTab === 2) setDataGrant([])
      else setDataActivity([])
    } else {
      alert('เกิดข้อผิดพลาด: ' + ((res && res.result) || ''))
    }
  }

  const handleClear = function() {
    setDataStudent([]); setDataAward([]); setDataGrant([]); setDataActivity([])
    setShowProgress(false); setShowMapping(false)
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const dgStyles = {
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

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลกิจการนิสิต" subtitle="นำเข้าจากไฟล์ Excel (4 sheets)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>

        {/* Tab + Action Buttons */}
        <Box display="flex" justifyContent="space-between" mb="10px" flexWrap="wrap">
          <Box display="flex" flexWrap="wrap">
            {TABS.map(function(tab, idx) {
              return (
                <Button key={idx}
                  sx={btnStyle(
                    activeTab === idx ? colors.greenAccent[600] : colors.primary[400],
                    colors.greenAccent[800]
                  )}
                  onClick={function() { setActiveTab(idx); setShowMapping(false) }}
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
            {/* tab นิสิต: ต้องผ่าน mapping ก่อน */}
            {canEdit && activeTab === 0 && !showMapping && dataStudent.length > 0 && (
              <Button sx={btnStyle(colors.blueAccent[500], colors.blueAccent[700])} onClick={handlePreviewMapping} disabled={mappingLoading}>
                <CheckCircleOutlineIcon sx={{ mr: '10px' }} />ตรวจสอบ Mapping ภาควิชา/สาขา
              </Button>
            )}
            {canEdit && activeTab === 0 && showMapping && (
              <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={handleConfirmAndImport} disabled={mappingLoading}>
                <BrowserUpdatedIcon sx={{ mr: '10px' }} />ยืนยัน Mapping และนำเข้านิสิต
              </Button>
            )}
            {/* tab อื่น: import ตรงได้เลย */}
            {canEdit && activeTab > 0 && (
              <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={handleImportOther}>
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

        {/* Mapping Preview (เฉพาะ tab นิสิต) */}
        {activeTab === 0 && showMapping && (
          <Box mb="16px">
            <Typography variant="h5" fontWeight="bold" sx={{ color: colors.greenAccent[400], mb: '8px' }}>
              ตรวจสอบ Mapping ภาควิชา/สาขาวิชา — กด "ยืนยัน" เพื่อนำเข้า
            </Typography>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap="16px">
              {/* Departments */}
              <Box>
                <Typography variant="h6" sx={{ color: colors.grey[300], mb: '6px' }}>ภาควิชา ({deptMapping.length} รายการ)</Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400], maxHeight: 300 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold', backgroundColor: colors.primary[400] }}>ชื่อภาควิชา (จาก Excel)</TableCell>
                        <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold', backgroundColor: colors.primary[400] }}>Code (แก้ได้)</TableCell>
                        <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold', backgroundColor: colors.primary[400] }}>สถานะ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deptMapping.map(function(d, i) {
                        var isNew = d.status === 'new'
                        var isSkip = d.skip === true
                        return (
                          <TableRow key={i} sx={{ opacity: isSkip ? 0.4 : 1 }}>
                            <TableCell sx={{ color: colors.grey[100], fontSize: 13 }}>
                              <span style={{ textDecoration: isSkip ? 'line-through' : 'none' }}>{d.excel_name}</span>
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small" variant="outlined"
                                value={d.department_code || ''}
                                disabled={isSkip}
                                onChange={function(e) {
                                  var updated = deptMapping.map(function(x, xi) {
                                    return xi === i ? Object.assign({}, x, { department_code: e.target.value }) : x
                                  })
                                  setDeptMapping(updated)
                                }}
                                inputProps={{ style: { color: colors.grey[100], fontSize: 13, padding: '4px 8px' } }}
                                sx={{ width: 90 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={isSkip ? 'ข้าม' : isNew ? 'สร้างใหม่' : 'มีอยู่แล้ว'}
                                size="small"
                                onClick={function() {
                                  var updated = deptMapping.map(function(x, xi) {
                                    return xi === i ? Object.assign({}, x, { skip: !x.skip }) : x
                                  })
                                  setDeptMapping(updated)
                                }}
                                sx={{
                                  cursor: 'pointer',
                                  backgroundColor: isSkip ? colors.redAccent[700] : isNew ? colors.blueAccent[700] : colors.greenAccent[700],
                                  color: colors.grey[100],
                                  '&:hover': { opacity: 0.8 }
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Majors */}
              <Box>
                <Typography variant="h6" sx={{ color: colors.grey[300], mb: '6px' }}>สาขาวิชา ({majorMapping.length} รายการ)</Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400], maxHeight: 240 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>สาขาวิชา</TableCell>
                        <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>ภาควิชา</TableCell>
                        <TableCell sx={{ color: colors.greenAccent[400], fontWeight: 'bold' }}>สถานะ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {majorMapping.map(function(m, i) {
                        return (
                          <TableRow key={i}>
                            <TableCell sx={{ color: colors.grey[100] }}>{m.major_name}</TableCell>
                            <TableCell sx={{ color: colors.grey[300], fontSize: 12 }}>{m.department_name}</TableCell>
                            <TableCell>
                              <Chip
                                label={m.status === 'exists' ? 'มีอยู่แล้ว' : 'สร้างใหม่'}
                                size="small"
                                sx={{
                                  backgroundColor: m.status === 'exists' ? colors.greenAccent[700] : colors.blueAccent[700],
                                  color: colors.grey[100]
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        )}

        {/* Data Preview Grid */}
        {(!showMapping || activeTab !== 0) && (
          <DataGrid rows={activeData} columns={activeCols} slots={{ toolbar: GridToolbar }} />
        )}
        {activeTab === 0 && showMapping && (
          <Box mt="8px">
            <Typography variant="caption" sx={{ color: colors.grey[400] }}>
              Preview ข้อมูลนิสิต {dataStudent.length} รายการ — กด "ยืนยัน Mapping และนำเข้า" ด้านบนเพื่อดำเนินการ
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default StudentAffairsImportData
