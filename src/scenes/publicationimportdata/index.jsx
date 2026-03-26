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
import { bulkImportPublication } from '../../actions/authorProfile.action'

var BATCH = 5

var PublicationImportData = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var fileInputRef = useRef(null)
  var loginReducer = useSelector(function(s) { return s.app.loginReducer })

  var [data, setData] = useState([])
  var [showProgress, setShowProgress] = useState(false)
  var [importing, setImporting] = useState(false)

  var canEdit = loginReducer && loginReducer.result && loginReducer.result.roles
    ? loginReducer.result.roles.find(function(r) { return [ROLES.Admin, ROLES.Editor].includes(r) })
    : false

  var handleFileChange = function(e) {
    var file = e.target.files[0]
    if (!file) return
    setShowProgress(true)
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function(event) {
      var wb = XLSX.read(new Uint8Array(event.target.result), { type: 'array' })
      var sheetName = wb.SheetNames.find(function(s) { return s === 'Paper' }) || wb.SheetNames[0]
      var ws = wb.Sheets[sheetName]
      var raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
      var mapped = raw
        .filter(function(r) { return r['คอลัมน์ 1'] || r['ชื่อเรื่อง'] })
        .map(function(r, i) {
          return {
            id: i + 1,
            spreadsheet_id: String(r['คอลัมน์ 1'] || ''),
            author_spreadsheet_id: String(r['ID(A)'] || ''),
            author_name_th: String(r['ผู้แต่ง (TH)'] || ''),
            title: String(r['ชื่อเรื่อง'] || ''),
            journal_name: String(r['ชื่อวารสาร'] || ''),
            publication_year: r['ค.ศ.'] ? parseInt(r['ค.ศ.']) : null,
            issn: String(r['ISSN'] || ''),
            doi: String(r['DOI '] || r['DOI'] || ''),
            is_scopus: r['Scopus'] === 1 || r['Scopus'] === '1' || r['Scopus'] === true,
            quartile: String(r['Q (Scopus)'] || ''),
            is_isi: r['ISI'] === 1 || r['ISI'] === '1' || r['ISI'] === true,
            q_scie: String(r['Q (SCIE)'] || ''),
            impact_factor: r['IF'] ? parseFloat(r['IF']) : null,
            collab_type: String(r['ร่วมกับ'] || ''),
            is_international: r['ต่างปนะเทศ'] === 1 || r['ต่างปนะเทศ'] === '1',
            photo_url: String(r['URL รูป (ตีพิมพ์)'] || ''),
            database_source: r['Scopus'] === 1 ? 'Scopus' : r['ISI'] === 1 ? 'ISI' : '',
          }
        })
      setData(mapped)
      setShowProgress(false)
      if (fileInputRef.current) fileInputRef.current.value = null
    }
    reader.onerror = function() { setShowProgress(false) }
  }

  var handleImport = async function() {
    if (!data.length) { alert('ไม่มีข้อมูลให้นำเข้า'); return }
    var toImport = data.map(function(r) { var copy = Object.assign({}, r); delete copy.id; return copy })
    if (!window.confirm('นำเข้าผลงานวิจัย ' + toImport.length + ' รายการ?')) return
    setImporting(true)
    var totalOk = 0
    for (var i = 0; i < toImport.length; i += BATCH) {
      var chunk = toImport.slice(i, i + BATCH)
      // แยก publications กับ author_links
      var publications = chunk.map(function(r) {
        return {
          spreadsheet_id: r.spreadsheet_id,
          title: r.title,
          journal_name: r.journal_name,
          publication_year: r.publication_year,
          issn: r.issn,
          doi: r.doi,
          is_scopus: r.is_scopus,
          quartile: r.quartile,
          is_isi: r.is_isi,
          q_scie: r.q_scie,
          impact_factor: r.impact_factor,
          collab_type: r.collab_type,
          is_international: r.is_international,
          photo_url: r.photo_url,
          database_source: r.database_source,
        }
      })
      var author_links = chunk
        .filter(function(r) { return r.spreadsheet_id && r.author_spreadsheet_id })
        .map(function(r) { return { pub_spreadsheet_id: r.spreadsheet_id, author_spreadsheet_id: r.author_spreadsheet_id } })

      var res = await dispatch(bulkImportPublication({ publications: publications, author_links: author_links }))
      if (!res || res.status !== 'ok') {
        alert('เกิดข้อผิดพลาด batch ' + (Math.floor(i / BATCH) + 1) + ': ' + (res && res.result || ''))
        setImporting(false)
        return
      }
      totalOk += publications.length
    }
    setImporting(false)
    alert('นำเข้าสำเร็จ ' + totalOk + ' รายการ')
    setData([])
  }

  var handleClear = function() {
    setData([])
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

  var columns = [
    { field: 'id', headerName: 'ลำดับ', flex: 0.3 },
    { field: 'spreadsheet_id', headerName: 'ID', flex: 0.3 },
    { field: 'author_spreadsheet_id', headerName: 'ID(A)', flex: 0.3 },
    { field: 'author_name_th', headerName: 'ผู้แต่ง', flex: 0.8 },
    { field: 'title', headerName: 'ชื่อเรื่อง', flex: 2 },
    { field: 'journal_name', headerName: 'วารสาร', flex: 1 },
    { field: 'publication_year', headerName: 'ปี', flex: 0.4 },
    { field: 'quartile', headerName: 'Q', flex: 0.3 },
    { field: 'impact_factor', headerName: 'IF', flex: 0.4 },
  ]

  return (
    <Box m="20px">
      <Header title="นำเข้าผลงานวิจัยตีพิมพ์" subtitle="นำเข้าจากไฟล์ Excel (Sheet: Paper)" />
      <Box m="40px 0 0 0" height="75vh" sx={dgStyles}>
        <Box display="flex" justifyContent="space-between" mb="10px" flexWrap="wrap">
          <Typography variant="h6" sx={{ color: colors.grey[300], alignSelf: 'center' }}>
            {data.length > 0 ? 'พบข้อมูล ' + data.length + ' รายการ' : ''}
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <form>
              <input type="file" accept=".xlsx,.xls" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </form>
            {canEdit && (
              <Button sx={btnStyle(colors.blueAccent[700], colors.blueAccent[800])} onClick={function() { fileInputRef.current.click() }}>
                <SpellcheckIcon sx={{ mr: '10px' }} />เลือกไฟล์
              </Button>
            )}
            {canEdit && data.length > 0 && !importing && (
              <Button sx={btnStyle(colors.greenAccent[600], colors.greenAccent[800])} onClick={handleImport}>
                <BrowserUpdatedIcon sx={{ mr: '10px' }} />นำเข้าผลงาน
              </Button>
            )}
            {importing && (
              <Button disabled sx={btnStyle(colors.grey[600], colors.grey[600])}>
                กำลังนำเข้า...
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
        <DataGrid rows={data} columns={columns} slots={{ toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}

export default PublicationImportData
