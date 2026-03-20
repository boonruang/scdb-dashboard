import React, { useState } from 'react'
import {
    Box,
    useTheme,
    Button,
    TextField,
    useMediaQuery,
} from '@mui/material'

import { Formik } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch } from 'react-redux'
import { addStudentActivity } from '../../actions/studentActivity.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const initialValues = {
    activity_code: "",
    activity_name: "",
    organizer: "",
    start_date: "",
    end_date: "",
    venue: "",
    participant_count: "",
    hours: "",
    budget_amount: "",
}

const userSchema = yup.object().shape({
    activity_name: yup.string().required("ต้องระบุชื่อโครงการ"),
})

const StudentactivityAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("ดำเนินการเรียบร้อยแล้ว")
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleCancelButton = () => {
    navigate(-1)
  }

  const isNonMobile = useMediaQuery("(min-width:600px)")

  return <Box m="20px">
      <Header title="เพิ่มข้อมูลโครงการ" />
      <Formik
          onSubmit={async (values, { setSubmitting }) => {
            if (submitted) return
            let formData = new FormData()
            formData.append('activity_code', values.activity_code)
            formData.append('activity_name', values.activity_name)
            formData.append('organizer', values.organizer)
            formData.append('start_date', values.start_date)
            formData.append('end_date', values.end_date)
            formData.append('venue', values.venue)
            formData.append('participant_count', values.participant_count)
            formData.append('hours', values.hours)
            formData.append('budget_amount', values.budget_amount)
            console.log('values', values)
            const res = await dispatch(addStudentActivity(navigate, formData))
            if (res && res.success) {
                setMsg("บันทึกข้อมูลเรียบร้อยแล้ว")
                setIsSuccess(true)
                setSubmitted(true)
                setOpen(true)
            } else {
                setMsg("เกิดข้อผิดพลาด: " + ((res || {}).error || "ไม่สามารถบันทึกข้อมูลได้"))
                setIsSuccess(false)
                setOpen(true)
            }
            setSubmitting(false)
          }}
          initialValues={initialValues}
          validationSchema={userSchema}
      >
          {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                  <Box>
                  <Box mt='40px'>
                  <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                      sx={{
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 3" }
                      }}
                  >
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="รหัสโครงการ"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.activity_code}
                      name="activity_code"
                      error={!!touched.activity_code && !!errors.activity_code}
                      helperText={touched.activity_code && errors.activity_code}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ชื่อโครงการ"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.activity_name}
                      name="activity_name"
                      error={!!touched.activity_name && !!errors.activity_name}
                      helperText={touched.activity_name && errors.activity_name}
                      sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ผู้จัด/หน่วยงาน"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.organizer}
                      name="organizer"
                      error={!!touched.organizer && !!errors.organizer}
                      helperText={touched.organizer && errors.organizer}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="วันที่เริ่ม"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.start_date}
                      name="start_date"
                      error={!!touched.start_date && !!errors.start_date}
                      helperText={touched.start_date && errors.start_date}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="วันที่สิ้นสุด"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.end_date}
                      name="end_date"
                      error={!!touched.end_date && !!errors.end_date}
                      helperText={touched.end_date && errors.end_date}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="สถานที่"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.venue}
                      name="venue"
                      error={!!touched.venue && !!errors.venue}
                      helperText={touched.venue && errors.venue}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="จำนวนผู้เข้าร่วม"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.participant_count}
                      name="participant_count"
                      error={!!touched.participant_count && !!errors.participant_count}
                      helperText={touched.participant_count && errors.participant_count}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="จำนวนชั่วโมง"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.hours}
                      name="hours"
                      error={!!touched.hours && !!errors.hours}
                      helperText={touched.hours && errors.hours}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="งบประมาณ (บาท)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.budget_amount}
                      name="budget_amount"
                      error={!!touched.budget_amount && !!errors.budget_amount}
                      helperText={touched.budget_amount && errors.budget_amount}
                      sx={{ gridColumn: "span 1" }}
                  />
                  </Box>
                  </Box>
                  </Box>

                  <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                      }}
                  >
                    <Box display="flex" justifyContent="start"
                      sx={{
                        mt: "20px",
                        gridColumn: "span 2"
                    }}
                  >
                      <Button
                          type='submit'
                          disabled={!(dirty && isValid) || submitted}
                          sx={{
                              backgroundColor: colors.greenAccent[600],
                              color: colors.grey[100],
                              width: '135px',
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "10px 20px",
                              mr: "20px",
                              mb: "10px",
                              '&:hover': {backgroundColor: colors.blueAccent[700]}
                          }}
                      >
                          บันทึก
                      </Button>
                      <Button
                          onClick={handleCancelButton}
                          type='button'
                          sx={{
                              backgroundColor: colors.greenAccent[600],
                              color: colors.grey[100],
                              width: '135px',
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "10px 20px",
                              mr: "10px",
                              mb: "10px",
                              '&:hover': {backgroundColor: colors.blueAccent[700]}
                          }}
                      >
                          ยกเลิก
                      </Button>
                      </Box>
                </Box>
              </form>
          )}
      </Formik>
      <MessageBox
      open={open}
      closeDialog={() => setOpen(false)}
      submitFunction={() => {
          setOpen(false)
          if (isSuccess) navigate('/studentactivity')
      }}
      message={msg}
      />
  </Box>

}

export default StudentactivityAdd
