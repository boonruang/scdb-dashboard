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
import { addStudentgrant } from '../../actions/studentgrant.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const initialValues = {
    student_id: "",
    grant_name: "",
    amount: "",
    grant_type: "",
    grant_source: "",
    loan_status: "",
}

const userSchema = yup.object().shape({
    student_id: yup.string().required("ต้องระบุรหัสนิสิต"),
    grant_name: yup.string().required("ต้องระบุชื่อทุน"),
})

const StudentgrantAdd = () => {

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
      <Header title="เพิ่มข้อมูลทุนการศึกษา" />
      <Formik
          onSubmit={async (values, { setSubmitting }) => {
            if (submitted) return
            let formData = new FormData()
            formData.append('student_id', values.student_id)
            formData.append('grant_name', values.grant_name)
            formData.append('amount', values.amount)
            formData.append('grant_type', values.grant_type)
            formData.append('grant_source', values.grant_source)
            formData.append('loan_status', values.loan_status)
            console.log('values', values)
            const res = await dispatch(addStudentgrant(navigate, formData))
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
                      label="รหัสนิสิต (student_id)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.student_id}
                      name="student_id"
                      error={!!touched.student_id && !!errors.student_id}
                      helperText={touched.student_id && errors.student_id}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ชื่อทุน"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.grant_name}
                      name="grant_name"
                      error={!!touched.grant_name && !!errors.grant_name}
                      helperText={touched.grant_name && errors.grant_name}
                      sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="จำนวนเงิน (บาท)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.amount}
                      name="amount"
                      error={!!touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ประเภททุน"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.grant_type}
                      name="grant_type"
                      error={!!touched.grant_type && !!errors.grant_type}
                      helperText={touched.grant_type && errors.grant_type}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="แหล่งทุน"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.grant_source}
                      name="grant_source"
                      error={!!touched.grant_source && !!errors.grant_source}
                      helperText={touched.grant_source && errors.grant_source}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="สถานะการกู้ยืม"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.loan_status}
                      name="loan_status"
                      error={!!touched.loan_status && !!errors.loan_status}
                      helperText={touched.loan_status && errors.loan_status}
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
          if (isSuccess) navigate('/studentgrant')
      }}
      message={msg}
      />
  </Box>

}

export default StudentgrantAdd
