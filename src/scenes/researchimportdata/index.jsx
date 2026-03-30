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
import { bulkImportAuthorProfile, bulkImportPublication } from '../../actions/authorProfile.action'
import { bulkImportAuthorProfileSupport } from '../../actions/authorProfileSupport.action'


var TABS = ['Author Profile (สายวิชาการ)', 'Author Profile (สายสนับสนุน)', 'ผลงานวิจัย (Paper)']

var ResearchImportData = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var fileInputRef = useRef(null)
  var loginReducer = useSelector(function(s) { return s.app.loginReducer })

  var [activeTab, setActiveTab] = useState(0)
  var [dataAcademic, setDataAcademic] = useState([])
  var [dataSupport, setDataSupport] = useState([])
  var [dataPaper, setDataPaper] = useState([])
  var [authorLinks, setAuthorLinks] = useState([])
  var [showProgress, setShowProgress] = useState(false)
  var [importing, setImporting] = useState(false)

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var activeData = [dataAcademic, dataSupport, dataPaper][activeTab]

  var parseAuthorSheet = function(ws) {
    var raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
    return raw
      .filter(function(r) { return r['ID(A)'] || r['รายชื่ออาจารย์'] })
      .map(function(r, i) {
        return {
          id: i + 1,
          position_no: String(r['เลขประจำตำแหน่ง'] || ''),
          spreadsheet_id: String(r['ID(A)'] || ''),
          title_th: String(r['ตำแหน่งวิชาการ'] || ''),
          firstname_th: String((r['รายชื่ออาจารย์'] || '').trim().split(' ')[0] || ''),
          lastname_th: String((r['รายชื่ออาจารย์'] || '').trim().split(' ').slice(1).join(' ') || ''),
          firstname: String(r['First Name'] || ''),
          lastname: String(r['Last Name'] || ''),
          position: String(r['ตำแหน่งวิชาการ'] || ''),
          dept_name: String(r['ภาควิชา'] || ''),
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
          email: String(r['E-mail '] || r['E-mail'] || ''),
          phone_no: String(r['โทรศัพท์'] || ''),
          research_fund: String(r['แหล่งทุนวิจัยที่ได้รับ'] || ''),
          ethics_license: String(r['จริยธรรมการวิจัย (เลขที่ใบอนุญาต)'] || ''),
        }
      })
  }

  var parsePaperSheet = function(ws) {
    var raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
    var papersMap = {}
    var links = []
    raw.forEach(function(r) {
      var paperId = String(r['ID(P)'] || '')
      var authorId = String(r['ID(A)'] || '')
      if (!r['ชื่อเรื่อง'] || !paperId) return
      if (!papersMap[paperId]) {
        papersMap[paperId] = {
          spreadsheet_id: paperId,
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
          is_tier1: r['Tier1'] === 1 || r['Tier1'] === '1',
          is_q1: r['Q1'] === 1 || r['Q1'] === '1',
          collab_type: String(r['ร่วมกับ'] || 'ไทย'),
          is_international: r['ต่างปนะเทศ'] === 1 || r['ต่างปนะเทศ'] === '1',
          foreign_org: String(r['หน่วยงานต่างประเทศ'] || ''),
          innovation: String(r['นวัตกรรม / อนุสิทธิบัตร'] || ''),
          database_source: r['Scopus'] ? 'Scopus' : (r['ISI'] ? 'ISI' : 'Other'),
          photo_url: String(r['URL รูป (ตีพิมพ์)'] || ''),
          dept_name: String(r['สังกัด'] || ''),
        }
      }
      if (authorId) {
        links.push({ pub_spreadsheet_id: paperId, author_spreadsheet_id: authorId })
      }
    })
    return { papers: Object.values(papersMap), links: links }
  }

  var handleFileChange = function(e) {
    var file = e.target.files[0]
    if (!file) return
    setShowProgress(true)
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
      var wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })
      // SheetNames: [0]=dashboard design, [1]=Author profile, [2]=Author profile สายสนับสนุน, [3]=Paper
      var ws1 = wb.Sheets[wb.SheetNames[1]]
      var ws2 = wb.Sheets[wb.SheetNames[2]]
      var ws3 = wb.Sheets[wb.SheetNames[3]]

      var academic = ws1 ? parseAuthorSheet(ws1) : []
      var support = ws2 ? parseAuthorSheet(ws2) : []
      var paperResult = ws3 ? parsePaperSheet(ws3) : { papers: [], links: [] }

      setDataAcademic(academic)
      setDataSupport(support)
      setDataPaper(paperResult.papers.map(function(p, i) { return Object.assign({ id: i + 1 }, p) }))
      setAuthorLinks(paperResult.links)
      setShowProgress(false)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = function() { setShowProgress(false) }
  }

  var handleImport = async function() {
    if (!activeData.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }
    if (!window.confirm('นำเข้า ' + TABS[activeTab] + ' ' + activeData.length + ' รายการ?')) return
    setImporting(true)

    if (activeTab === 0 || activeTab === 1) {
      var toImport = activeData.map(function(r) { var c = Object.assign({}, r); delete c.id; return c })
      var BATCH = 5
      var totalInserted = 0
      for (var i = 0; i < toImport.length; i += BATCH) {
        var chunk = toImport.slice(i, i + BATCH)
        var res = activeTab === 0
          ? await dispatch(bulkImportAuthorProfile(chunk))
          : await dispatch(bulkImportAuthorProfileSupport(chunk))
        if (!res || res.status !== 'ok') {
          alert('เกิดข้อผิดพลาด batch ' + (Math.floor(i / BATCH) + 1) + ': ' + ((res && res.result) || ''))
          setImporting(false)
          return
        }
        totalInserted += res.count || 0
      }
      alert('นำเข้าสำเร็จ: ' + totalInserted + ' รายการ')
      if (activeTab === 0) setDataAcademic([])
      else setDataSupport([])
    } else {
      var toImportPaper = activeData.map(function(r) { var c = Object.assign({}, r); delete c.id; return c })
      var payload = { publications: toImportPaper, author_links: authorLinks }
      var resP = await dispatch(bulkImportPublication(payload))
      if (resP && resP.status === 'ok') {
        alert('นำเข้าสำเร็จ ' + resP.count + ' รายการ, author links: ' + resP.links_count)
        setDataPaper([])
        setAuthorLinks([])
      } else {
        alert('เกิดข้อผิดพลาด: ' + ((resP && resP.result) || ''))
      }
    }
    setImporting(false)
  }

  var handleClear = function() {
    setDataAcademic([]); setDataSupport([]); setDataPaper([]); setAuthorLinks([])
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

  var colsAuthor = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'spreadsheet_id', headerName: 'ID(A)', flex: 0.4 },
    { field: 'title_th', headerName: 'ตำแหน่ง', flex: 0.8 },
    { field: 'firstname_th', headerName: 'ชื่อ (TH)', flex: 0.8 },
    { field: 'lastname_th', headerName: 'นามสกุล (TH)', flex: 0.8 },
    { field: 'firstname', headerName: 'First Name', flex: 0.8 },
    { field: 'lastname', headerName: 'Last Name', flex: 0.8 },
    { field: 'citations_total', headerName: 'Citations', flex: 0.6 },
    { field: 'h_index', headerName: 'H-Index', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ]

  var colsPaper = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'spreadsheet_id', headerName: 'ID(P)', flex: 0.4 },
    { field: 'title', headerName: 'ชื่อเรื่อง', flex: 2.5 },
    { field: 'journal_name', headerName: 'วารสาร', flex: 1.2 },
    { field: 'publication_year', headerName: 'ค.ศ.', flex: 0.5 },
    { field: 'quartile', headerName: 'Q (Scopus)', flex: 0.6 },
    { field: 'q_scie', headerName: 'Q (SCIE)', flex: 0.6 },
    { field: 'impact_factor', headerName: 'IF', flex: 0.5 },
    { field: 'database_source', headerName: 'ฐานข้อมูล', flex: 0.7 },
    { field: 'collab_type', headerName: 'ความร่วมมือ', flex: 0.7 },
  ]

  var colsMap = [colsAuthor, colsAuthor, colsPaper]

  return (
    <Box m="20px">
      <Header title="นำเข้าข้อมูลวิจัย" subtitle="นำเข้าจากไฟล์ Excel (2.ข้อมูลฝ่ายวิจัย.xlsx)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" mb="10px" flexWrap="wrap">
          <Box display="flex" flexWrap="wrap">
            {TABS.map(function(tab, idx) {
              var count = [dataAcademic, dataSupport, dataPaper][idx].length
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
        {activeTab === 2 && dataPaper.length > 0 && (
          <Typography variant="body2" sx={{ color: colors.grey[400], mb: '6px' }}>
            Paper: {dataPaper.length} รายการ | Author links: {authorLinks.length} รายการ
          </Typography>
        )}
        {showProgress && <UploadProgresBar />}
        <DataGrid rows={activeData} columns={colsMap[activeTab]} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default ResearchImportData
