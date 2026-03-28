import React from 'react'
import { Box, useTheme, Button, Typography, Grid, Paper } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useNavigate, useLocation } from 'react-router-dom'

var AcademicResearchDetail = function(props) {
  var basePath = props.basePath || '/academicresearch/master'
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var navigate = useNavigate()
  var location = useLocation()
  var row = (location.state && location.state.row) ? location.state.row : {}

  var fields = [
    { label: 'รหัสนิสิต', key: 'student_code' },
    { label: 'คำนำหน้า', key: 'prefix' },
    { label: 'ชื่อ', key: 'firstname' },
    { label: 'นามสกุล', key: 'lastname' },
    { label: 'ระดับ', key: 'degree_level' },
    { label: 'คณะ', key: 'faculty' },
    { label: 'สาขา', key: 'major_name' },
    { label: 'หัวข้อวิทยานิพนธ์ (TH)', key: 'thesis_th' },
    { label: 'หัวข้อวิทยานิพนธ์ (EN)', key: 'thesis_en' },
    { label: 'สถานะตีพิมพ์', key: 'research_status' },
    { label: 'ชื่อวารสาร', key: 'journal_name' },
    { label: 'ประเภท', key: 'publish_type' },
  ]

  return (
    <Box m="20px">
      <Header title="รายละเอียดข้อมูลวิจัย" subtitle="" />
      <Paper sx={{ p: 3, mt: 3, backgroundColor: colors.primary[400] }}>
        <Grid container spacing={2}>
          {fields.map(function(f) {
            return (
              <Grid item xs={12} sm={6} key={f.key}>
                <Typography variant="caption" color={colors.grey[400]}>{f.label}</Typography>
                <Typography variant="body1" color={colors.grey[100]}>{row[f.key] || '-'}</Typography>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
      <Box mt={3} display="flex" gap={2}>
        <Button variant="outlined" color="info"
          onClick={function() { navigate(basePath + '/edit', { state: { row: row } }) }}>
          แก้ไข
        </Button>
        <Button variant="outlined" onClick={function() { navigate(-1) }}>ย้อนกลับ</Button>
      </Box>
    </Box>
  )
}

export default AcademicResearchDetail
