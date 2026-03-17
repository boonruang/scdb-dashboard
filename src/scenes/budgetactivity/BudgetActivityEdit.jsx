import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery } from '@mui/material'
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

  const row = location.state?.row || {}
  const initialValues = {
    activity_id: row.activity_id || '',
    budget_code: row.budget_code || '',
    activity_code: row.activity_code || '',
    activity_name: row.activity_name || '',
    budget_requested: row.budget_requested || '',
    start_date: row.start_date ? new Date(row.start_date) : null,
    end_date: row.end_date ? new Date(row.end_date) : null,
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => {
      if (v !== null && v !== undefined) formData.append(k, v instanceof Date ? v.toISOString().split('T')[0] : v)
    })
    const res = await dispatch(updateBudgetActivity(navigate, formData))
    if (res?.success) { setMsg('บันทึกข้อมูลเรียบร้อยแล้ว'); setIsSuccess(true) }
    else { setMsg('เกิดข้อผิดพลาด: ' + (res?.error || '')); setIsSuccess(false) }
    setOpen(true); setSubmitting(false)
  }

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '20px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }

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
              </Box>
              <Box display="flex" mt="20px">
                <Button type="submit" disabled={!isValid || isSubmitting} sx={btnStyle}>บันทึก</Button>
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
