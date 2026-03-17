import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'

const BudgetDisbursementDetail = () => {
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

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }

  return (
    <Box m="20px">
      <Header title="รายละเอียดการเบิกจ่ายงบประมาณ" />
      <Box mt="40px" display="grid" gap="30px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>
        {field('รหัสกิจกรรม', row.activity_code)}
        {field('วันที่เบิก', row.disburse_date)}
        {field('ประเภท', row.disburse_type)}
        {field('จำนวนเงิน (บาท)', row.amount)}
        {field('หมายเหตุ', row.note, 2)}
      </Box>
      <Box mt="20px">
        <Button onClick={() => navigate(-1)} sx={btnStyle}>กลับ</Button>
      </Box>
    </Box>
  )
}

export default BudgetDisbursementDetail
