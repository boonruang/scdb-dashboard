import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery } from '@mui/material'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import { createAuthorProfileSupport } from '../../actions/authorProfileSupport.action'

var schema = yup.object().shape({
  firstname_th: yup.string().required('ต้องระบุชื่อ (TH)'),
  lastname_th: yup.string().required('ต้องระบุนามสกุล (TH)'),
})

var initialValues = {
  spreadsheet_id: '', title_th: '', firstname_th: '', lastname_th: '',
  firstname: '', lastname: '', position: '', position_no: '', dept_name: '',
  email: '', phone_no: '', citations_total: '', publications_count: '',
  h_index: '', docs_current_year: '', citations_current_year: '',
  scopus_url: '', scholar_url: '', expertise: '', interests: '',
  research_fund: '', ethics_license: '',
}

var AuthorProfileSupportCreate = function() {
  var theme = useTheme()
  var colors = tokens(theme.palette.mode)
  var dispatch = useDispatch()
  var navigate = useNavigate()
  var isNonMobile = useMediaQuery('(min-width:600px)')

  var handleSubmit = async function(values) {
    var res = await dispatch(createAuthorProfileSupport(values))
    if (res && res.status === 'ok') navigate('/authorprofile/support')
    else alert('เกิดข้อผิดพลาด: ' + ((res && res.result) || ''))
  }

  var tf = function(formik, label, name, span, type) {
    span = span || 1; type = type || 'text'
    return (
      <TextField
        fullWidth variant="filled" type={type} label={label} name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={!!(formik.touched[name] && formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        sx={{ gridColumn: 'span ' + span }}
      />
    )
  }

  return (
    <Box m="20px">
      <Header title="เพิ่ม Author Profile สายสนับสนุน" subtitle="เพิ่มนักวิจัยสายสนับสนุนใหม่" />
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {function(formik) {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Box mt="40px" display="grid" gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
              >
                {tf(formik, 'ID(A)', 'spreadsheet_id')}
                {tf(formik, 'เลขประจำตำแหน่ง', 'position_no')}
                {tf(formik, 'คำนำหน้า', 'title_th')}
                {tf(formik, 'ภาควิชา', 'dept_name')}
                {tf(formik, 'ชื่อ (TH)', 'firstname_th')}
                {tf(formik, 'นามสกุล (TH)', 'lastname_th')}
                {tf(formik, 'First Name', 'firstname')}
                {tf(formik, 'Last Name', 'lastname')}
                {tf(formik, 'ตำแหน่ง', 'position', 2)}
                {tf(formik, 'Email', 'email', 2)}
                {tf(formik, 'โทรศัพท์', 'phone_no')}
                {tf(formik, 'Citations Total', 'citations_total', 1, 'number')}
                {tf(formik, 'Publications', 'publications_count', 1, 'number')}
                {tf(formik, 'H-Index', 'h_index', 1, 'number')}
                {tf(formik, 'Docs (ปีปัจจุบัน)', 'docs_current_year', 1, 'number')}
                {tf(formik, 'Citations (ปีปัจจุบัน)', 'citations_current_year', 1, 'number')}
                {tf(formik, 'Scopus URL', 'scopus_url', 2)}
                {tf(formik, 'Scholar URL', 'scholar_url', 2)}
                {tf(formik, 'ความเชี่ยวชาญ', 'expertise', 2)}
                {tf(formik, 'ความสนใจ', 'interests', 2)}
                {tf(formik, 'แหล่งทุนวิจัย', 'research_fund', 2)}
                {tf(formik, 'จริยธรรมการวิจัย', 'ethics_license', 2)}
              </Box>
              <Box mt="20px" display="flex" gap="10px">
                <Button type="submit"
                  sx={{ backgroundColor: colors.greenAccent[600], color: colors.grey[100], fontWeight: 'bold', padding: '10px 20px', '&:hover': { backgroundColor: colors.greenAccent[800] } }}
                >บันทึก</Button>
                <Button onClick={function() { navigate(-1) }}
                  sx={{ backgroundColor: colors.redAccent[600], color: colors.grey[100], fontWeight: 'bold', padding: '10px 20px', '&:hover': { backgroundColor: colors.redAccent[800] } }}
                >ยกเลิก</Button>
              </Box>
            </form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default AuthorProfileSupportCreate
