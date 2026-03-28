import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, MenuItem, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { addAcademicResearch } from '../../actions/academicResearch.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

var DEGREE_OPTIONS = ['ปริญญาโท', 'ปริญญาเอก']

var AcademicResearchAdd = function(props) {
  var defaultDegree = props.defaultDegree || null
  var backPath = props.backPath || '/academicresearch/master'

  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var isNonMobile = useMediaQuery('(min-width:600px)')

  var [open, setOpen] = useState(false)
  var [msg, setMsg] = useState('ดำเนินการเรียบร้อยแล้ว')
  var [isSuccess, setIsSuccess] = useState(false)
  var [submitted, setSubmitted] = useState(false)

  var initialValues = {
    student_code: '', prefix: '', firstname: '', lastname: '',
    degree_level: defaultDegree || '', faculty: '', major_name: '',
    thesis_th: '', thesis_en: '', research_status: '', journal_name: '', publish_type: '',
  }

  var schema = yup.object().shape({
    student_code: yup.string().required('ต้องระบุรหัสนิสิต'),
    firstname: yup.string().required('ต้องระบุชื่อ'),
    lastname: yup.string().required('ต้องระบุนามสกุล'),
  })

  return (
    <Box m="20px">
      <Header title="เพิ่มข้อมูลวิจัย" />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async function(values, helpers) {
          if (submitted) return
          var res = await dispatch(addAcademicResearch(values))
          if (res && res.success) {
            setMsg('บันทึกข้อมูลเรียบร้อยแล้ว')
            setIsSuccess(true)
            setSubmitted(true)
            setOpen(true)
          } else {
            setMsg('เกิดข้อผิดพลาด: ' + ((res && res.error) || 'ไม่สามารถบันทึกข้อมูลได้'))
            setIsSuccess(false)
            setOpen(true)
          }
          helpers.setSubmitting(false)
        }}
      >
        {function(formik) {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Box mt="30px" display="grid" gap="20px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}>
                <TextField fullWidth variant="filled" label="รหัสนิสิต" name="student_code"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.student_code}
                  error={!!formik.touched.student_code && !!formik.errors.student_code}
                  helperText={formik.touched.student_code && formik.errors.student_code}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="คำนำหน้า" name="prefix"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.prefix}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ชื่อ" name="firstname"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstname}
                  error={!!formik.touched.firstname && !!formik.errors.firstname}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="นามสกุล" name="lastname"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastname}
                  error={!!formik.touched.lastname && !!formik.errors.lastname}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ระดับ" name="degree_level" select
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.degree_level}
                  sx={{ gridColumn: 'span 1' }}>
                  <MenuItem value="">-- เลือก --</MenuItem>
                  {DEGREE_OPTIONS.map(function(d) { return <MenuItem key={d} value={d}>{d}</MenuItem> })}
                </TextField>
                <TextField fullWidth variant="filled" label="คณะ" name="faculty"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.faculty}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="สาขา" name="major_name"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.major_name}
                  sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="หัวข้อวิทยานิพนธ์ (TH)" name="thesis_th"
                  multiline rows={2} onBlur={formik.handleBlur} onChange={formik.handleChange}
                  value={formik.values.thesis_th} sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="หัวข้อวิทยานิพนธ์ (EN)" name="thesis_en"
                  multiline rows={2} onBlur={formik.handleBlur} onChange={formik.handleChange}
                  value={formik.values.thesis_en} sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="สถานะตีพิมพ์" name="research_status"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.research_status}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ชื่อวารสาร" name="journal_name"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.journal_name}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ประเภท" name="publish_type"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.publish_type}
                  sx={{ gridColumn: 'span 1' }} />
              </Box>
              <Box mt="20px" display="flex" gap="10px">
                <Button type="submit" disabled={!(formik.dirty && formik.isValid) || submitted}
                  sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100],
                    fontWeight: 'bold', padding: '10px 20px', '&:hover': { backgroundColor: colors.blueAccent[700] } }}>
                  บันทึก
                </Button>
                <Button onClick={function() { navigate(-1) }}
                  sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100],
                    fontWeight: 'bold', padding: '10px 20px', '&:hover': { backgroundColor: colors.blueAccent[700] } }}>
                  ยกเลิก
                </Button>
              </Box>
            </form>
          )
        }}
      </Formik>
      <MessageBox open={open} closeDialog={function() { setOpen(false) }}
        submitFunction={function() { setOpen(false); if (isSuccess) navigate(backPath) }}
        message={msg} />
    </Box>
  )
}

export default AcademicResearchAdd
