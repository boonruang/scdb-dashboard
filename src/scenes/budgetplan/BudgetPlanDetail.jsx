import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'

const BudgetPlanDetail = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const row = location.state?.row || {}

  const feBE = row.fiscal_year ? row.fiscal_year + 543 : ''

  const field = (label, value, span = 1) => (
    <TextField fullWidth variant="filled" label={label} value={value ?? ''} InputProps={{ readOnly: true }}
      InputLabelProps={{ shrink: true }} sx={{ gridColumn: `span ${span}` }} />
  )

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }

  return (
    <Box m="20px">
      <Header title="รายละเอียดแผนโครงการ/งบประมาณ" />
      <Box mt="40px" display="grid" gap="30px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>
        {field('รหัสงบประมาณ', row.budget_code)}
        {field('โครงการ/กิจกรรม', row.project_name, 2)}
        {field('หมวดงบประมาณ', row.budget_type)}
        {field('ปีงบประมาณ (พ.ศ.)', feBE)}
        {field('งบประมาณจัดสรร (บาท)', row.budget_amount)}
        {field('แผนไตรมาส 1', row.plan_q1)}
        {field('แผนไตรมาส 2', row.plan_q2)}
        {field('แผนไตรมาส 3', row.plan_q3)}
        {field('แผนไตรมาส 4', row.plan_q4)}
      </Box>
      <Box mt="20px">
        <Button onClick={() => navigate(-1)} sx={btnStyle}>กลับ</Button>
      </Box>
    </Box>
  )
}

export default BudgetPlanDetail
