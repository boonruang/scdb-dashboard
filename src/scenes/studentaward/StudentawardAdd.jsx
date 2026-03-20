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
import { addStudentAward } from '../../actions/studentAward.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const initialValues = {
    student_id: "",
    award_name: "",
    award_level: "",
    venue: "",
    award_date: "",
}

const userSchema = yup.object().shape({
    student_id: yup.string().required("ต้องระบุรหัสนิสิต"),
    award_name: yup.string().required("ต้องระบุชื่อรางวัล"),
})

const StudentawardAdd = () => {

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
      <Header title="เพิ่มข้อมูลรางวัล" />
      <Formik
          onSubmit={async (values, { setSubmitting }) => {
            if (submitted) return
            let formData = new FormData()
            formData.append('student_id', values.student_id)
            formData.append('award_name', values.award_name)
            formData.append('award_level', values.award_level)
            formData.append('venue', values.venue)
            formData.append('award_date', values.award_date)
            console.log('values', values)
            const res = await dispatch(addStudentAward(navigate, formData))
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
                      label="ชื่อรางวัล"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.award_name}
                      name="award_name"
                      error={!!touched.award_name && !!errors.award_name}
                      helperText={touched.award_name && errors.award_name}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ระดับรางวัล"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.award_level}
                      name="award_level"
                      error={!!touched.award_level && !!errors.award_level}
                      helperText={touched.award_level && errors.award_level}
                      sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="สถานที่/งาน"
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
                      type="text"
                      label="วันที่ได้รับรางวัล"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.award_date}
                      name="award_date"
                      error={!!touched.award_date && !!errors.award_date}
                      helperText={touched.award_date && errors.award_date}
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
          if (isSuccess) navigate('/studentaward')
      }}
      message={msg}
      />
  </Box>

}

export default StudentawardAdd
