import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery, Typography, MenuItem } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'

const PublicationDetail = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const row = location?.state?.row || {}

  const readOnly = { InputProps: { readOnly: true }, InputLabelProps: { shrink: true } }

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '20px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }
  const sectionTitle = (text) => (
    <Typography variant="h6" fontWeight="bold" color={colors.greenAccent[400]}
      sx={{ gridColumn: 'span 3', mt: 1, mb: -1, borderBottom: `1px solid ${colors.greenAccent[700]}`, pb: 0.5 }}>
      {text}
    </Typography>
  )

  const boolLabel = (val) => val === true || val === 'true' ? 'ใช่' : val === false || val === 'false' ? 'ไม่ใช่' : ''

  return (
    <Box m="20px">
      <Header title="รายละเอียดผลงานวิจัยตีพิมพ์" />
      <Box mt="40px" display="grid" gap="30px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>

        {sectionTitle('ข้อมูลหลัก')}
        <TextField fullWidth variant="outlined" label="รหัส" value={row.pub_id ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="ชื่อเรื่อง" value={row.title ?? ''} {...readOnly} sx={{ gridColumn: 'span 2' }} />
        <TextField fullWidth variant="filled" label="วารสาร" value={row.journal_name ?? ''} {...readOnly} sx={{ gridColumn: 'span 2' }} />
        <TextField fullWidth variant="filled" label="ปีที่ตีพิมพ์ (ค.ศ.)" value={row.publication_year ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="Quartile" value={row.quartile ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="ฐานข้อมูล" value={row.database_source ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="ประเภทความร่วมมือ" value={row.collab_type ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />

        {sectionTitle('บรรณานุกรม')}
        <TextField fullWidth variant="filled" label="DOI" value={row.doi ?? ''} {...readOnly} sx={{ gridColumn: 'span 2' }} />
        <TextField fullWidth variant="filled" label="ISSN" value={row.issn ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="Impact Factor" value={row.impact_factor ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="Q (SCIE)" value={row.q_scie ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="ID (Spreadsheet)" value={row.spreadsheet_id ?? ''} {...readOnly} sx={{ gridColumn: 'span 1' }} />

        {sectionTitle('ฐานข้อมูล / อื่นๆ')}
        <TextField fullWidth variant="filled" label="Scopus" value={boolLabel(row.is_scopus)} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="ISI" value={boolLabel(row.is_isi)} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="ต่างประเทศ" value={boolLabel(row.is_international)} {...readOnly} sx={{ gridColumn: 'span 1' }} />
        <TextField fullWidth variant="filled" label="URL รูปภาพ" value={row.photo_url ?? ''} {...readOnly} sx={{ gridColumn: 'span 3' }} />
      </Box>
      <Box display="flex" mt="20px">
        <Button type="button" onClick={() => navigate(-1)} sx={btnStyle}>กลับ</Button>
      </Box>
    </Box>
  )
}

export default PublicationDetail
