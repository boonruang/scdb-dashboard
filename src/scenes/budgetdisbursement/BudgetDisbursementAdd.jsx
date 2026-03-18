import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, MenuItem, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { addBudgetDisbursement } from '../../actions/budgetDisbursement.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { th } from 'date-fns/locale'

const initialValues = {
  activity_code: '', disburse_date: null, disburse_type: '', amount: '', note: '',
}

const schema = yup.object().shape({
  activity_code: yup.string().required('ต้องระบุรหัสกิจกรรม'),
  disburse_type: yup.string().required('ต้องระบุประเภทการเบิก'),
  amount: yup.number().typeError('ต้องเป็นตัวเลข').required('ต้องระบุจำนวนเงิน'),
})

const BudgetDisbursementAdd = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (submitted) return
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => {
      if (v !== null && v !== undefined) formData.append(k, v instanceof Date ? v.toISOString().split('T')[0] : v)
    })
    const res = await dispatch(addBudgetDisbursement(navigate, formData))
    if (res?.success) { setMsg('บันทึกข้อมูลเรียบร้อยแล้ว'); setIsSuccess(true); setSubmitted(true) }
    else { setMsg('เกิดข้อผิดพลาด: ' + (res?.data?.result || res?.error || '')); setIsSuccess(false) }
    setOpen(true); setSubmitting(false)
  }

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '20px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }

  return (
    <Box m="20px">
      <Header title="เพิ่มรายการเบิกจ่ายงบประมาณ" />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
          {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box mt="40px" display="grid" gap="30px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>
                <TextField fullWidth variant="filled" label="รหัสกิจกรรม" name="activity_code"
                  value={values.activity_code} onBlur={handleBlur} onChange={handleChange}
                  error={!!touched.activity_code && !!errors.activity_code} helperText={touched.activity_code && errors.activity_code}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ประเภทการเบิก" name="disburse_type" select
                  value={values.disburse_type} onBlur={handleBlur} onChange={handleChange}
                  error={!!touched.disburse_type && !!errors.disburse_type} helperText={touched.disburse_type && errors.disburse_type}
                  sx={{ gridColumn: 'span 1' }}>
                  <MenuItem value="1.ผูกพัน">1.ผูกพัน</MenuItem>
                  <MenuItem value="2.จ่ายจริง">2.จ่ายจริง</MenuItem>
                </TextField>
                <TextField fullWidth variant="filled" label="จำนวนเงิน (บาท)" name="amount" type="number"
                  value={values.amount} onBlur={handleBlur} onChange={handleChange}
                  error={!!touched.amount && !!errors.amount} helperText={touched.amount && errors.amount}
                  sx={{ gridColumn: 'span 1' }} />
                <DatePicker label="วันที่เบิก" value={values.disburse_date}
                  onChange={(v) => setFieldValue('disburse_date', v)} format="d MMMM yyyy"
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined', sx: { gridColumn: 'span 1' } } }} />
                <TextField fullWidth variant="filled" label="หมายเหตุ" name="note"
                  value={values.note} onBlur={handleBlur} onChange={handleChange}
                  sx={{ gridColumn: 'span 2' }} />
              </Box>
              <Box display="flex" mt="20px">
                <Button type="submit" disabled={!(dirty && isValid) || isSubmitting || submitted} sx={btnStyle}>บันทึก</Button>
                <Button type="button" onClick={() => navigate(-1)} sx={btnStyle}>ยกเลิก</Button>
              </Box>
            </form>
          )}
        </Formik>
      </LocalizationProvider>
      <MessageBox open={open} closeDialog={() => setOpen(false)}
        submitFunction={() => { setOpen(false); if (isSuccess) navigate('/budgetdisbursement') }}
        message={msg} />
    </Box>
  )
}

export default BudgetDisbursementAdd
