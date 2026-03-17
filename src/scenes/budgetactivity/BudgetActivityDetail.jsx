import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery, Typography, Divider } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'

const BudgetActivityDetail = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const row = location.state?.row || {}

  const field = (label, value, span = 1) => (
    <TextField fullWidth variant="filled" label={label} value={value ?? ''} InputProps={{ readOnly: true }}
      InputLabelProps={{ shrink: true }} sx={{ gridColumn: `span ${span}` }} />
  )
  const fieldMulti = (label, value, span = 3) => (
    <TextField fullWidth multiline rows={3} variant="filled" label={label} value={value ?? ''} InputProps={{ readOnly: true }}
      InputLabelProps={{ shrink: true }} sx={{ gridColumn: `span ${span}` }} />
  )

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }
  const sectionStyle = { gridColumn: 'span 3', mt: '10px' }

  return (
    <Box m="20px">
      <Header title="รายละเอียดกิจกรรมโครงการ" />
      <Box mt="40px" display="grid" gap="30px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>

        {field('รหัสงบประมาณ', row.budget_code)}
        {field('รหัสกิจกรรม', row.activity_code)}
        {field('งบที่ขอ (บาท)', row.budget_requested)}
        {field('ชื่อกิจกรรม', row.activity_name, 3)}
        {field('วันเริ่มต้น', row.start_date)}
        {field('วันสิ้นสุด', row.end_date)}
        {field('สถานที่', row.venue)}

        <Box sx={sectionStyle}><Divider /><Typography variant="h6" mt="10px" color={colors.greenAccent[400]}>เป้าหมายผู้เข้าร่วม (คน)</Typography></Box>
        {field('นิสิต ปี 1', row.target_student_y1)}
        {field('นิสิต ปี 2', row.target_student_y2)}
        {field('นิสิต ปี 3', row.target_student_y3)}
        {field('นิสิต ปี 4', row.target_student_y4)}
        {field('ผู้บริหาร', row.target_admin)}
        {field('วิชาการ', row.target_academic)}
        {field('สนับสนุน', row.target_support)}
        {field('นักเรียน', row.target_student_ext)}
        {field('บุคคลทั่วไป', row.target_public)}

        <Box sx={sectionStyle}><Divider /><Typography variant="h6" mt="10px" color={colors.greenAccent[400]}>ยุทธศาสตร์และตัวชี้วัด</Typography></Box>
        {field('ยุทธศาสตร์หน่วยงาน', row.strategy)}
        {field('มาตรฐานการพัฒนานิสิต', row.student_dev_standard)}
        {field('SDGs', row.sdgs)}
        {field('BCG', row.bcg)}
        {field('Smart University', row.smart_university)}

        <Box sx={sectionStyle}><Divider /><Typography variant="h6" mt="10px" color={colors.greenAccent[400]}>ผลผลิต / ผลลัพธ์</Typography></Box>
        {fieldMulti('ผลผลิต (output)', row.output_text)}
        {fieldMulti('ค่าเป้าหมาย', row.target_value)}
        {fieldMulti('ผลลัพธ์ (outcome)', row.outcome)}
        {fieldMulti('ผลกระทบ (Impact)', row.impact)}
        {fieldMulti('หมายเหตุ', row.note)}
      </Box>
      <Box mt="20px">
        <Button onClick={() => navigate(-1)} sx={btnStyle}>กลับ</Button>
      </Box>
    </Box>
  )
}

export default BudgetActivityDetail
