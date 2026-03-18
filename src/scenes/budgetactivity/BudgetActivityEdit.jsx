import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery, Typography } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { updateBudgetActivity } from '../../actions/budgetActivity.action'
import { useNavigate, useLocation } from 'react-router-dom'
import MessageBox from 'components/MessageBox'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { th } from 'date-fns/locale'

const schema = yup.object().shape({
  budget_code: yup.string().required('ต้องระบุรหัสงบประมาณ'),
  activity_name: yup.string().required('ต้องระบุชื่อกิจกรรม'),
})

const BudgetActivityEdit = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const row = location.state?.row || {}
  const initialValues = {
    activity_id: row.activity_id || '',
    budget_code: row.budget_code || '',
    activity_code: row.activity_code || '',
    activity_name: row.activity_name || '',
    budget_requested: row.budget_requested ?? '',
    start_date: row.start_date ? new Date(row.start_date) : null,
    end_date: row.end_date ? new Date(row.end_date) : null,
    target_student_y1: row.target_student_y1 ?? '',
    target_student_y2: row.target_student_y2 ?? '',
    target_student_y3: row.target_student_y3 ?? '',
    target_student_y4: row.target_student_y4 ?? '',
    target_admin: row.target_admin ?? '',
    target_academic: row.target_academic ?? '',
    target_support: row.target_support ?? '',
    target_student_ext: row.target_student_ext ?? '',
    target_public: row.target_public ?? '',
    strategy: row.strategy || '',
    student_dev_standard: row.student_dev_standard || '',
    sdgs: row.sdgs || '',
    bcg: row.bcg || '',
    smart_university: row.smart_university || '',
    venue: row.venue || '',
    output_text: row.output_text || '',
    target_value: row.target_value || '',
    outcome: row.outcome || '',
    impact: row.impact || '',
    note: row.note || '',
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (submitted) return
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== '') formData.append(k, v instanceof Date ? v.toISOString().split('T')[0] : v)
    })
    const res = await dispatch(updateBudgetActivity(navigate, formData))
    if (res?.success) { setMsg('บันทึกข้อมูลเรียบร้อยแล้ว'); setIsSuccess(true); setSubmitted(true) }
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
      <Header title="แก้ไขกิจกรรมโครงการ" />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
          {({ values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box mt="40px" display="grid" gap="30px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>

                {sectionTitle('ข้อมูลหลัก')}
                <TextField fullWidth variant="filled" label="รหัสงบประมาณ" name="budget_code"
                  value={values.budget_code} onBlur={handleBlur} onChange={handleChange}
                  error={!!touched.budget_code && !!errors.budget_code} helperText={touched.budget_code && errors.budget_code}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="รหัสกิจกรรม" name="activity_code"
                  value={values.activity_code} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="งบประมาณที่ขอ (บาท)" name="budget_requested" type="number"
                  value={values.budget_requested} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ชื่อโครงการ/กิจกรรม (ย่อย)" name="activity_name"
                  value={values.activity_name} onBlur={handleBlur} onChange={handleChange}
                  error={!!touched.activity_name && !!errors.activity_name} helperText={touched.activity_name && errors.activity_name}
                  sx={{ gridColumn: 'span 3' }} />
                <DatePicker label="วันเริ่มต้น" value={values.start_date}
                  onChange={(v) => setFieldValue('start_date', v)} format="d MMMM yyyy"
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined', sx: { gridColumn: 'span 1' } } }} />
                <DatePicker label="วันสิ้นสุด" value={values.end_date}
                  onChange={(v) => setFieldValue('end_date', v)} format="d MMMM yyyy"
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined', sx: { gridColumn: 'span 1' } } }} />

                {sectionTitle('เป้าหมายผู้เข้าร่วม (คน)')}
                <TextField fullWidth variant="filled" label="นิสิต ปี 1" name="target_student_y1" type="number"
                  value={values.target_student_y1} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="นิสิต ปี 2" name="target_student_y2" type="number"
                  value={values.target_student_y2} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="นิสิต ปี 3" name="target_student_y3" type="number"
                  value={values.target_student_y3} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="นิสิต ปี 4" name="target_student_y4" type="number"
                  value={values.target_student_y4} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ผู้บริหาร" name="target_admin" type="number"
                  value={values.target_admin} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="วิชาการ" name="target_academic" type="number"
                  value={values.target_academic} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="สนับสนุน" name="target_support" type="number"
                  value={values.target_support} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="นักเรียน" name="target_student_ext" type="number"
                  value={values.target_student_ext} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="บุคคลทั่วไป" name="target_public" type="number"
                  value={values.target_public} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />

                {sectionTitle('ยุทธศาสตร์และตัวชี้วัด')}
                <TextField fullWidth variant="filled" label="ยุทธศาสตร์หน่วยงาน" name="strategy"
                  value={values.strategy} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="มาตรฐานการพัฒนานิสิต" name="student_dev_standard"
                  value={values.student_dev_standard} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="SDGs" name="sdgs"
                  value={values.sdgs} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="BCG" name="bcg"
                  value={values.bcg} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="Smart University" name="smart_university"
                  value={values.smart_university} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="สถานที่" name="venue"
                  value={values.venue} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />

                {sectionTitle('ผลผลิต / ผลลัพธ์')}
                <TextField fullWidth variant="filled" label="ผลผลิต (output)" name="output_text" multiline rows={2}
                  value={values.output_text} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="ค่าเป้าหมาย" name="target_value" multiline rows={2}
                  value={values.target_value} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="ผลลัพธ์ (outcome)" name="outcome" multiline rows={2}
                  value={values.outcome} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="ผลกระทบ (Impact)" name="impact" multiline rows={2}
                  value={values.impact} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="หมายเหตุ" name="note" multiline rows={2}
                  value={values.note} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 3' }} />
              </Box>
              <Box display="flex" mt="20px">
                <Button type="submit" disabled={!isValid || isSubmitting || submitted} sx={btnStyle}>บันทึก</Button>
                <Button type="button" onClick={() => navigate(-1)} sx={btnStyle}>ยกเลิก</Button>
              </Box>
            </form>
          )}
        </Formik>
      </LocalizationProvider>
      <MessageBox open={open} closeDialog={() => setOpen(false)}
        submitFunction={() => { setOpen(false); if (isSuccess) navigate('/budgetactivity') }}
        message={msg} />
    </Box>
  )
}

export default BudgetActivityEdit
