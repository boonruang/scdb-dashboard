import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthorProfileDetail = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()
  const row = location.state?.row || {}
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const field = (label, value, span = 1) => (
    <TextField
      fullWidth variant="filled" type="text" label={label}
      value={value ?? ''}
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: true }}
      sx={{ gridColumn: `span ${span}` }}
    />
  )

  return (
    <Box m="20px">
      <Header title="รายละเอียด Author Profile" subtitle={`${row.firstname_th || ''} ${row.lastname_th || ''}`} />
      <Box mt="40px" display="grid" gap="20px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
      >
        {field('ID', row.staff_id)}
        {field('ID(A)', row.spreadsheet_id)}
        {field('ตำแหน่งวิชาการ', row.title_th)}
        {field('ตำแหน่ง', row.position)}
        {field('ชื่อ (TH)', row.firstname_th)}
        {field('นามสกุล (TH)', row.lastname_th)}
        {field('First Name', row.firstname)}
        {field('Last Name', row.lastname)}
        {field('Citations Total', row.citations_total)}
        {field('Publications', row.publications_count)}
        {field('H-Index', row.h_index)}
        {field('Docs (ปีปัจจุบัน)', row.docs_current_year)}
        {field('Citations (ปีปัจจุบัน)', row.citations_current_year)}
        {field('Email', row.email)}
        {field('โทรศัพท์', row.phone_no)}
        {field('ออฟฟิศ', row.office_location)}
        {field('Scopus URL', row.scopus_url, 2)}
        {field('Scholar URL', row.scholar_url, 2)}
        {field('ความเชี่ยวชาญ', row.expertise, 2)}
        {field('ความสนใจ', row.interests, 2)}
        {field('แหล่งทุนวิจัย', row.research_fund, 2)}
        {field('จริยธรรมการวิจัย', row.ethics_license, 2)}
      </Box>
      <Box mt="20px">
        <Button
          onClick={() => navigate(-1)}
          sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontWeight: 'bold', padding: '10px 20px', '&:hover': { backgroundColor: colors.blueAccent[700] } }}
        >
          กลับ
        </Button>
      </Box>
    </Box>
  )
}

export default AuthorProfileDetail
