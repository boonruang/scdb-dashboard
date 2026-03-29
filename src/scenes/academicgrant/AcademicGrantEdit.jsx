import React, { useState } from 'react'
import { Box, useTheme, Button, TextField, MenuItem, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { updateAcademicGrant } from '../../actions/academicGrant.action'
import { useNavigate, useLocation } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

var GRANT_TYPE_OPTIONS = ['ในประเทศ', 'ต่างประเทศ']

var AcademicGrantEdit = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var location = useLocation()
  var isNonMobile = useMediaQuery('(min-width:600px)')

  var row = (location.state && location.state.row) ? location.state.row : {}

  var [open, setOpen] = useState(false)
  var [msg, setMsg] = useState('ดำเนินการเรียบร้อยแล้ว')
  var [isSuccess, setIsSuccess] = useState(false)
  var [submitted, setSubmitted] = useState(false)

  var initialValues = {
    student_code: row.student_code || '',
    firstname: row.firstname || '',
    lastname: row.lastname || '',
    program: row.program || '',
    major_name: row.major_name || '',
    topic: row.topic || '',
    grant_name: row.grant_name || '',
    conference_name: row.conference_name || '',
    amount: row.amount != null ? String(row.amount) : '',
    grant_type: row.grant_type || '',
    grant_source: row.grant_source || '',
  }

  var schema = yup.object().shape({
    student_code: yup.string().required('ต้องระบุรหัสนิสิต'),
  })

  return (
    <Box m="20px">
      <Header title="แก้ไขข้อมูลทุนนำเสนอ" />
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async function(values, helpers) {
          if (submitted) return
          var payload = Object.assign({}, values)
          payload.amount = payload.amount ? parseFloat(payload.amount) || null : null
          var res = await dispatch(updateAcademicGrant(row.grant_id, payload))
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
                <TextField fullWidth variant="filled" label="ชื่อ" name="firstname"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstname}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="นามสกุล" name="lastname"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastname}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="หลักสูตร" name="program"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.program}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="สาขา" name="major_name"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.major_name}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="ประเภท" name="grant_type" select
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.grant_type}
                  sx={{ gridColumn: 'span 1' }}>
                  <MenuItem value="">-- เลือก --</MenuItem>
                  {GRANT_TYPE_OPTIONS.map(function(g) { return <MenuItem key={g} value={g}>{g}</MenuItem> })}
                </TextField>
                <TextField fullWidth variant="filled" label="หัวข้อที่นำเสนอ" name="topic"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.topic}
                  sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="ชื่อทุน" name="grant_name"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.grant_name}
                  sx={{ gridColumn: 'span 3' }} />
                <TextField fullWidth variant="filled" label="งานประชุม" name="conference_name"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.conference_name}
                  sx={{ gridColumn: 'span 2' }} />
                <TextField fullWidth variant="filled" label="จำนวนเงิน (บาท)" name="amount" type="number"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount}
                  sx={{ gridColumn: 'span 1' }} />
                <TextField fullWidth variant="filled" label="หลักสูตร/แหล่งทุน" name="grant_source"
                  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.grant_source}
                  sx={{ gridColumn: 'span 3' }} />
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
        submitFunction={function() { setOpen(false); if (isSuccess) navigate('/academicgrant') }}
        message={msg} />
    </Box>
  )
}

export default AcademicGrantEdit
