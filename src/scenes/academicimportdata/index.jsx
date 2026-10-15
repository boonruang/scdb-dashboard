import React, { useRef, useState } from 'react'
import TemplateDownloadButton from '../../components/TemplateDownloadButton'
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

var TABS = ['แผนการรับนิสิต', 'วิจัย ม.โท', 'วิจัย ป.เอก', 'ทุนนำเสนอ', 'อาจารย์ประจำหลักสูตร']
var BATCH = 20

var AcademicImportData = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var fileInputRef = useRef(null)
  var loginReducer = useSelector(function(s) { return s.app.loginReducer })

  var [activeTab, setActiveTab] = useState(0)
  var [dataAdmission, setDataAdmission] = useState([])
  var [dataMaster, setDataMaster] = useState([])
  var [dataDoctor, setDataDoctor] = useState([])
  var [dataGrant, setDataGrant] = useState([])
  var [dataProgStaff, setDataProgStaff] = useState([])
  var [showProgress, setShowProgress] = useState(false)
  var [importing, setImporting] = useState(false)

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor, ROLES.Academic].includes(r) })
    : false

  var activeData = [dataAdmission, dataMaster, dataDoctor, dataGrant, dataProgStaff][activeTab]

  var handleFileChange = function(e) {
    var file = e.target.files[0]
    if (!file) return
    setShowProgress(true)
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
      var wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })

      // Sheet 1: แผนการรับนิสิต
      var ws1 = wb.Sheets[wb.SheetNames[1]]
      var raw1 = ws1 ? XLSX.utils.sheet_to_json(ws1, { defval: '' }) : []
      setDataAdmission(raw1.filter(function(r) { return r['สาขา'] || r['ภาควิชา'] }).map(function(r, i) {
        return {
          id: i + 1,
          group: String(r['กลุ่ม'] || ''),
          major_name: String(r['สาขา'] || ''),
          dept_name: String(r['ภาควิชา'] || ''),
          level: String(r['ระดับ'] || ''),
          planned_seats: r['แผนการรับ'] ? parseInt(r['แผนการรับ']) : null,
          eligible: r['ผู้มีสิทธิ์(ยืนยันสิทธิ์)'] ? parseInt(r['ผู้มีสิทธิ์(ยืนยันสิทธิ์)']) : null,
          actual_admitted: r['รายงานตัว'] ? parseInt(r['รายงานตัว']) : null,
          admit_pct: r['ร้อยละ แผนการรับต่อรายงานตัว'] ? parseFloat(r['ร้อยละ แผนการรับต่อรายงานตัว']) : null,
          academic_year: r['ปีการศึกษา'] ? parseInt(r['ปีการศึกษา']) : null,
        }
      }))

      // Sheet 2: วิจัย ม.โท
      var ws2 = wb.Sheets[wb.SheetNames[2]]
      var raw2 = ws2 ? XLSX.utils.sheet_to_json(ws2, { defval: '' }) : []
      setDataMaster(raw2.filter(function(r) { return r['รหัสนิสิต'] }).map(function(r, i) {
        return {
          id: i + 1,
          student_code: String(r['รหัสนิสิต'] || ''),
          prefix: String(r['คำนำหน้า'] || ''),
          firstname: String(r['ชื่อ'] || ''),
          lastname: String(r['นามสกุล'] || ''),
          degree_level: String(r['ระดับ'] || ''),
          faculty: String(r['คณะ'] || ''),
          major_name: String(r['สาขาวิชาแยก'] || ''),
          thesis_th: String(r['ชื่อเรื่องวิทยานิพนธ์ภาษาไทย:'] || ''),
          thesis_en: String(r['ชื่อเรื่องวิทยานิพนธ์ภาษาอังกฤษ:'] || ''),
          research_status: String(r['สถานะตีพิมพ์เผยแพร่'] || ''),
          journal_name: String(r['ชื่อวารสาร'] || ''),
          publish_type: String(r['ประเภท'] || ''),
        }
      }))

      // Sheet 3: วิจัย ป.เอก
      var ws3 = wb.Sheets[wb.SheetNames[3]]
      var raw3 = ws3 ? XLSX.utils.sheet_to_json(ws3, { defval: '' }) : []
      setDataDoctor(raw3.filter(function(r) { return r['รหัสนิสิต'] }).map(function(r, i) {
        return {
          id: i + 1,
          student_code: String(r['รหัสนิสิต'] || ''),
          prefix: String(r['คำนำหน้า'] || ''),
          firstname: String(r['ชื่อ'] || ''),
          lastname: String(r['นามสกุล'] || ''),
          degree_level: String(r['ระดับ'] || ''),
          faculty: String(r['คณะ'] || ''),
          major_name: String(r['สาขาแยก'] || ''),
          thesis_th: String(r['วิทยานิพนธ์'] || ''),
          thesis_en: String(r['วิทยานิพนธ์อังกฤษ'] || ''),
          research_status: String(r['สถานะตีพิมพ์เผยแพร่'] || r['สถานะ'] || ''),
          journal_name: String(r['ชื่อวารสาร'] || ''),
          publish_type: String(r['ประเภท'] || ''),
        }
      }))

      // Sheet 4: ทุนนำเสนอ
      var ws4 = wb.Sheets[wb.SheetNames[4]]
      var raw4 = ws4 ? XLSX.utils.sheet_to_json(ws4, { defval: '' }) : []
      setDataGrant(raw4.filter(function(r) { return r['รหัส'] }).map(function(r, i) {
        var loc = String(r['ใน/ต่างประเทศ'] || r['ใน/ต่า'] || '')
        var amtStr = String(r['งบประมาณที่ได้รับการอนุมัติ'] || '')
        var amtNum = parseFloat(amtStr.replace(/[^0-9.]/g, '')) || null
        return {
          id: i + 1,
          student_code: String(r['รหัส'] || ''),
          prefix: String(r['คำนำหน้า'] || ''),
          firstname: String((r['ชื่อ'] || '')).trim(),
          lastname: String(r['สกุล'] || ''),
          program: String(r['หลักสูตร'] || ''),
          major_name: String(r['สาขา'] || ''),
          topic: String(r['หัวข้อที่นำเสนอ'] || ''),
          conference_name: String(r['ชื่องานประชุม /วันที่จัดประชุม'] || ''),
          present_type: String(r['รูปแบบการนำเสนอ'] || ''),
          amount: amtNum,
          grant_type: loc.includes('ต่าง') ? 'ต่างประเทศ' : 'ในประเทศ',
          degree_level: String(r['ระดับ'] || ''),
          fiscal_year: r['ปีงบประมาณ'] ? parseInt(r['ปีงบประมาณ']) : null,
        }
      }))

      // ชีต อาจารย์ประจำหลักสูตร (มีในไฟล์ _เพิ่มฟิลด์ เท่านั้น หาจากชื่อ) row 0=hint, row 1=headers
      var progName = wb.SheetNames.find(function(n) { return n.trim() === 'อาจารย์ประจำหลักสูตร' })
      var rawPS = progName ? XLSX.utils.sheet_to_json(wb.Sheets[progName], { defval: '', range: 1 }) : []
      setDataProgStaff(rawPS.filter(function(r) { return r['สาขา'] && r['เลขประจำตำแหน่ง'] }).map(function(r, i) {
        return {
          id: i + 1,
          program_name: String(r['สาขา']).trim(),
          degree_level: String(r['ระดับ'] || '').trim(),
          position_no: String(Math.round(Number(r['เลขประจำตำแหน่ง'])) || String(r['เลขประจำตำแหน่ง']).trim()),
          name: String(r['ชื่อ-สกุล'] || ''),
          role: String(r['บทบาท'] || '').trim(),
        }
      }))

      setShowProgress(false)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = function() { setShowProgress(false) }
  }

  var handleImport = async function() {
    if (!activeData.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }
    var toImport = activeData.map(function(r) { var c = Object.assign({}, r); delete c.id; return c })
    if (!window.confirm('นำเข้า ' + TABS[activeTab] + ' ' + toImport.length + ' รายการ?')) return
    setImporting(true)

    var urlMap = ['academic/admission/bulk', 'academic/research/bulk', 'academic/research/bulk', 'academicgrant/bulk', 'staffprofile/program/bulk']
    var url = urlMap[activeTab]

    var totalOk = 0
    var notFound = { staff: [], program: [], role: [] }
    for (var i = 0; i < toImport.length; i += BATCH) {
      var chunk = toImport.slice(i, i + BATCH)
      try {
        var res = await httpClient.post(url, chunk)
        if (!res.data || res.data.status !== 'ok') {
          alert('เกิดข้อผิดพลาด batch ' + (Math.floor(i / BATCH) + 1) + ': ' + ((res.data && res.data.result) || ''))
          setImporting(false)
          return
        }
        totalOk += res.data.count || ((res.data.inserted || 0) + (res.data.updated || 0)) || chunk.length
        notFound.staff = notFound.staff.concat(res.data.staffNotFound || [])
        notFound.program = notFound.program.concat(res.data.programNotFound || [])
        notFound.role = notFound.role.concat(res.data.badRole || [])
      } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + String(err))
        setImporting(false)
        return
      }
    }
    setImporting(false)
    var skipped = [
      notFound.staff.length ? 'ไม่พบเลขประจำตำแหน่ง: ' + notFound.staff.join(', ') : '',
      notFound.program.length ? 'ไม่พบหลักสูตร (import แผนการรับก่อน): ' + notFound.program.join(', ') : '',
      notFound.role.length ? 'บทบาทไม่ถูกต้อง: ' + notFound.role.join(', ') : '',
    ].filter(Boolean)
    alert('นำเข้าสำเร็จ ' + totalOk + ' รายการ' + (skipped.length ? ' (ข้ามบางแถว)' : ''))
    if (skipped.length) alert(skipped.join(' | '))
    if (activeTab === 0) setDataAdmission([])
    else if (activeTab === 1) setDataMaster([])
    else if (activeTab === 2) setDataDoctor([])
    else if (activeTab === 3) setDataGrant([])
    else setDataProgStaff([])
  }

  var handleClear = function() {
    setDataAdmission([]); setDataMaster([]); setDataDoctor([]); setDataGrant([]); setDataProgStaff([])
    setShowProgress(false)
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

  var colsAdmission = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'group', headerName: 'กลุ่ม', flex: 0.5 },
    { field: 'major_name', headerName: 'สาขา', flex: 1 },
    { field: 'dept_name', headerName: 'ภาควิชา', flex: 1 },
    { field: 'level', headerName: 'ระดับ', flex: 0.6 },
    { field: 'planned_seats', headerName: 'แผนรับ', flex: 0.5 },
    { field: 'actual_admitted', headerName: 'รายงานตัว', flex: 0.5 },
    { field: 'academic_year', headerName: 'ปีการศึกษา', flex: 0.6 },
  ]

  var colsResearch = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'student_code', headerName: 'รหัสนิสิต', flex: 0.7 },
    { field: 'firstname', headerName: 'ชื่อ', flex: 0.7 },
    { field: 'lastname', headerName: 'นามสกุล', flex: 0.8 },
    { field: 'major_name', headerName: 'สาขา', flex: 1 },
    { field: 'research_status', headerName: 'สถานะ', flex: 0.7 },
    { field: 'journal_name', headerName: 'วารสาร', flex: 1 },
  ]

  var colsGrant = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'student_code', headerName: 'รหัส', flex: 0.7 },
    { field: 'firstname', headerName: 'ชื่อ', flex: 0.7 },
    { field: 'lastname', headerName: 'นามสกุล', flex: 0.8 },
    { field: 'major_name', headerName: 'สาขา', flex: 0.8 },
    { field: 'conference_name', headerName: 'งานประชุม', flex: 1.5 },
    { field: 'amount', headerName: 'งบ', flex: 0.5 },
    { field: 'grant_type', headerName: 'ประเภท', flex: 0.6 },
  ]

  var colsProgStaff = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'program_name', headerName: 'สาขา', flex: 1 },
    { field: 'degree_level', headerName: 'ระดับ', flex: 0.6 },
    { field: 'position_no', headerName: 'เลขประจำตำแหน่ง', flex: 0.6 },
    { field: 'name', headerName: 'ชื่อ-สกุล', flex: 1 },
    { field: 'role', headerName: 'บทบาท', flex: 0.9 },
  ]
  var colsMap = [colsAdmission, colsResearch, colsResearch, colsGrant, colsProgStaff]

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลวิชาการ" subtitle="นำเข้าจากไฟล์ Excel (ข้อมูลฝ่ายวิชาการ)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" mb="10px" flexWrap="wrap">
          <Box display="flex" flexWrap="wrap">
            {TABS.map(function(tab, idx) {
              var count = [dataAdmission, dataMaster, dataDoctor, dataGrant, dataProgStaff][idx].length
              return (
                <Button key={idx} sx={btnStyle(
                  activeTab === idx ? colors.greenAccent[600] : colors.primary[400],
                  colors.greenAccent[800]
                )} onClick={function() { setActiveTab(idx) }}>
                  {tab}{count > 0 ? ' (' + count + ')' : ''}
                </Button>
              )
            })}
          </Box>
          <Box display="flex" flexWrap="wrap">
            <TemplateDownloadButton file="template_5_ฝ่ายวิชาการ.xlsx" />
            <form>
              <input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </form>
            {canEdit && (
              <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={function() { fileInputRef.current.click() }}>
                <SpellcheckIcon sx={{ mr: '10px' }} />เลือกไฟล์
              </Button>
            )}
            {canEdit && activeData.length > 0 && !importing && (
              <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={handleImport}>
                <BrowserUpdatedIcon sx={{ mr: '10px' }} />นำเข้า{TABS[activeTab]}
              </Button>
            )}
            {importing && (
              <Button disabled sx={btnStyle(colors.grey[600], colors.grey[600])}>กำลังนำเข้า...</Button>
            )}
            {canEdit && (
              <Button sx={btnStyle(colors.redAccent[700], colors.redAccent[800])} onClick={handleClear}>
                <HighlightOffIcon sx={{ mr: '10px' }} />ล้างข้อมูล
              </Button>
            )}
          </Box>
        </Box>
        {showProgress && <UploadProgresBar />}
        <DataGrid rows={activeData} columns={colsMap[activeTab]} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default AcademicImportData
