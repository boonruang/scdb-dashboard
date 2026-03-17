import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery, Typography, MenuItem } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { updatePublication } from '../../actions/publication.action'
import { useNavigate, useLocation } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const schema = yup.object().shape({
  title: yup.string().required('ต้องระบุชื่อเรื่อง'),
  journal_name: yup.string().required('ต้องระบุวารสาร'),
  publication_year: yup.number().required('ต้องระบุปีที่ตีพิมพ์'),
  quartile: yup.string().required('ต้องระบุ Quartile'),
  database_source: yup.string().required('ต้องระบุฐานข้อมูล'),
})

const PublicationEdit = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const row = location?.state?.row || {}

  const initialValues = {
    pub_id: row.pub_id ?? '',
    title: row.title ?? '',
    journal_name: row.journal_name ?? '',
    publication_year: row.publication_year ?? '',
    quartile: row.quartile ?? '',
    database_source: row.database_source ?? '',
    doi: row.doi ?? '',
    issn: row.issn ?? '',
    impact_factor: row.impact_factor ?? '',
    is_scopus: row.is_scopus != null ? String(row.is_scopus) : '',
    is_isi: row.is_isi != null ? String(row.is_isi) : '',
    q_scie: row.q_scie ?? '',
    collab_type: row.collab_type ?? '',
    is_international: row.is_international != null ? String(row.is_international) : '',
    spreadsheet_id: row.spreadsheet_id ?? '',
    photo_url: row.photo_url ?? '',
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== '') formData.append(k, v)
    })
    const res = await dispatch(updatePublication(navigate, formData))
    if (res?.success) { setMsg('ปรับปรุงข้อมูลเรียบร้อยแล้ว'); setIsSuccess(true) }
    else { setMsg('เกิดข้อผิดพลาด: ' + (res?.error || '')); setIsSuccess(false) }
    setOpen(true); setSubmitting(false)
  }

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '20px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }
  const sectionTitle = (text) => (
    <Typography variant="h6" fontWeight="bold" color={colors.greenAccent[400]}
      sx={{ gridColumn: 'span 3', mt: 1, mb: -1, borderBottom: `1px solid ${colors.greenAccent[700]}`, pb: 0.5 }}>
      {text}
    </Typography>
  )

  return (
    <Box m="20px">
      <Header title="แก้ไขผลงานวิจัยตีพิมพ์" />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
        {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mt="40px" display="grid" gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>

              {sectionTitle('ข้อมูลหลัก')}
              <TextField fullWidth variant="outlined" label="รหัส" name="pub_id"
                value={values.pub_id} disabled sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="ชื่อเรื่อง" name="title"
                value={values.title} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.title && !!errors.title} helperText={touched.title && errors.title}
                sx={{ gridColumn: 'span 2' }} />
              <TextField fullWidth variant="filled" label="วารสาร" name="journal_name"
                value={values.journal_name} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.journal_name && !!errors.journal_name} helperText={touched.journal_name && errors.journal_name}
                sx={{ gridColumn: 'span 2' }} />
              <TextField fullWidth variant="filled" label="ปีที่ตีพิมพ์ (ค.ศ.)" name="publication_year" type="number"
                value={values.publication_year} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.publication_year && !!errors.publication_year} helperText={touched.publication_year && errors.publication_year}
                sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="Quartile" name="quartile" select
                value={values.quartile} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.quartile && !!errors.quartile} helperText={touched.quartile && errors.quartile}
                sx={{ gridColumn: 'span 1' }}>
                {['Q1', 'Q2', 'Q3', 'Q4', 'Tier 1'].map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
              </TextField>
              <TextField fullWidth variant="filled" label="ฐานข้อมูล" name="database_source" select
                value={values.database_source} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.database_source && !!errors.database_source} helperText={touched.database_source && errors.database_source}
                sx={{ gridColumn: 'span 1' }}>
                {['Scopus', 'ISI', 'Other'].map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
              <TextField fullWidth variant="filled" label="ประเภทความร่วมมือ" name="collab_type" select
                value={values.collab_type} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }}>
                {['ไทย', 'ต่างประเทศ'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </TextField>

              {sectionTitle('บรรณานุกรม')}
              <TextField fullWidth variant="filled" label="DOI" name="doi"
                value={values.doi} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 2' }} />
              <TextField fullWidth variant="filled" label="ISSN" name="issn"
                value={values.issn} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="Impact Factor" name="impact_factor" type="number"
                value={values.impact_factor} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="Q (SCIE)" name="q_scie" select
                value={values.q_scie} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }}>
                {['', 'Q1', 'Q2', 'Q3', 'Q4'].map(q => <MenuItem key={q} value={q}>{q || '-'}</MenuItem>)}
              </TextField>
              <TextField fullWidth variant="filled" label="ID (Spreadsheet)" name="spreadsheet_id"
                value={values.spreadsheet_id} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />

              {sectionTitle('ฐานข้อมูล / อื่นๆ')}
              <TextField fullWidth variant="filled" label="Scopus" name="is_scopus" select
                value={values.is_scopus} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }}>
                <MenuItem value="true">ใช่</MenuItem>
                <MenuItem value="false">ไม่ใช่</MenuItem>
              </TextField>
              <TextField fullWidth variant="filled" label="ISI" name="is_isi" select
                value={values.is_isi} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }}>
                <MenuItem value="true">ใช่</MenuItem>
                <MenuItem value="false">ไม่ใช่</MenuItem>
              </TextField>
              <TextField fullWidth variant="filled" label="ต่างประเทศ" name="is_international" select
                value={values.is_international} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }}>
                <MenuItem value="true">ใช่</MenuItem>
                <MenuItem value="false">ไม่ใช่</MenuItem>
              </TextField>
              <TextField fullWidth variant="filled" label="URL รูปภาพ" name="photo_url"
                value={values.photo_url} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 3' }} />
            </Box>
            <Box display="flex" mt="20px">
              <Button type="submit" disabled={!(dirty && isValid) || isSubmitting} sx={btnStyle}>บันทึก</Button>
              <Button type="button" onClick={() => navigate(-1)} sx={btnStyle}>ยกเลิก</Button>
            </Box>
          </form>
        )}
      </Formik>
      <MessageBox open={open} closeDialog={() => setOpen(false)}
        submitFunction={() => { setOpen(false); if (isSuccess) navigate('/publication') }}
        message={msg} />
    </Box>
  )
}

export default PublicationEdit
