import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, MenuItem, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { addBudgetPlan } from '../../actions/budgetPlan.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const currentBE = new Date().getFullYear() + 543
const fiscalYearOptions = [currentBE, currentBE - 1, currentBE - 2, currentBE - 3]

const initialValues = {
  budget_code: '', project_name: '', budget_type: '',
  budget_amount: '', plan_q1: '', plan_q2: '', plan_q3: '', plan_q4: '',
  fiscal_year: String(currentBE - 1)
}

const schema = yup.object().shape({
  budget_code: yup.string().required('ต้องระบุรหัสงบประมาณ'),
  project_name: yup.string().required('ต้องระบุชื่อโครงการ'),
  budget_type: yup.string().required('ต้องระบุหมวดงบ'),
  fiscal_year: yup.string().required('ต้องระบุปีงบประมาณ'),
})

const BudgetPlanAdd = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => {
      // แปลงปี พ.ศ. → ค.ศ.
      if (k === 'fiscal_year') formData.append(k, Number(v) - 543)
      else formData.append(k, v)
    })
    const res = await dispatch(addBudgetPlan(navigate, formData))
    if (res?.success) {
      setMsg('บันทึกข้อมูลเรียบร้อยแล้ว'); setIsSuccess(true)
    } else {
      setMsg('เกิดข้อผิดพลาด: ' + (res?.error || 'ไม่สามารถบันทึกข้อมูลได้')); setIsSuccess(false)
    }
    setOpen(true)
    setSubmitting(false)
  }

  const btnStyle = { backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '20px', mb: '10px', '&:hover': { backgroundColor: colors.blueAccent[700] } }

  return (
    <Box m="20px">
      <Header title="เพิ่มแผนโครงการ/งบประมาณ" />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={schema}>
        {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mt="40px" display="grid" gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>
              <TextField fullWidth variant="filled" label="รหัสงบประมาณ" name="budget_code"
                value={values.budget_code} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.budget_code && !!errors.budget_code} helperText={touched.budget_code && errors.budget_code}
                sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="โครงการ/กิจกรรม" name="project_name"
                value={values.project_name} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.project_name && !!errors.project_name} helperText={touched.project_name && errors.project_name}
                sx={{ gridColumn: 'span 2' }} />
              <TextField fullWidth variant="filled" label="หมวดงบประมาณ" name="budget_type" select
                value={values.budget_type} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.budget_type && !!errors.budget_type} helperText={touched.budget_type && errors.budget_type}
                sx={{ gridColumn: 'span 1' }}>
                <MenuItem value="1.หมวดงบแผ่นดิน">1.หมวดงบแผ่นดิน</MenuItem>
                <MenuItem value="2.หมวดงบรายได้">2.หมวดงบรายได้</MenuItem>
              </TextField>
              <TextField fullWidth variant="filled" label="ปีงบประมาณ (พ.ศ.)" name="fiscal_year" select
                value={values.fiscal_year} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.fiscal_year && !!errors.fiscal_year} helperText={touched.fiscal_year && errors.fiscal_year}
                sx={{ gridColumn: 'span 1' }}>
                {fiscalYearOptions.map((y) => <MenuItem key={y} value={String(y)}>{y}</MenuItem>)}
              </TextField>
              <TextField fullWidth variant="filled" label="งบประมาณจัดสรร (บาท)" name="budget_amount" type="number"
                value={values.budget_amount} onBlur={handleBlur} onChange={handleChange}
                sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="แผนไตรมาส 1" name="plan_q1" type="number"
                value={values.plan_q1} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="แผนไตรมาส 2" name="plan_q2" type="number"
                value={values.plan_q2} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="แผนไตรมาส 3" name="plan_q3" type="number"
                value={values.plan_q3} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
              <TextField fullWidth variant="filled" label="แผนไตรมาส 4" name="plan_q4" type="number"
                value={values.plan_q4} onBlur={handleBlur} onChange={handleChange} sx={{ gridColumn: 'span 1' }} />
            </Box>
            <Box display="flex" mt="20px">
              <Button type="submit" disabled={!(dirty && isValid) || isSubmitting} sx={btnStyle}>บันทึก</Button>
              <Button type="button" onClick={() => navigate(-1)} sx={btnStyle}>ยกเลิก</Button>
            </Box>
          </form>
        )}
      </Formik>
      <MessageBox open={open} closeDialog={() => setOpen(false)}
        submitFunction={() => { setOpen(false); if (isSuccess) navigate('/budgetplan') }}
        message={msg} />
    </Box>
  )
}

export default BudgetPlanAdd
