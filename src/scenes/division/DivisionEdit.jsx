import React from 'react'
import { Box, useTheme, Button, TextField, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'

const schema = yup.object().shape({
  division_name: yup.string().required('กรุณาระบุชื่อสังกัด'),
})

const DivisionEdit = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const row = (location.state || {}).row || {}
  const btnStyle = { color: colors.grey[100], fontSize: '14px', fontWeight: 'bold', padding: '10px 20px', mr: '10px', mb: '10px' }

  return (
    <Box m="20px">
      <Header title="แก้ไขข้อมูลสังกัด" />
      <Formik
        initialValues={{ division_name: row.division_name || '' }}
        validationSchema={schema}
        enableReinitialize
        onSubmit={async function(values, { setSubmitting }) {
          var formData = new FormData()
          formData.append('division_name', values.division_name)
          await httpClient.put(server.DIVISION_URL + '/' + row.division_id, formData)
          setSubmitting(false)
          navigate('/division')
        }}
      >
        {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="24px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" mt="30px"
              sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}>
              <TextField fullWidth variant="filled" label="ชื่อสังกัด *" name="division_name"
                value={values.division_name} onBlur={handleBlur} onChange={handleChange}
                error={!!touched.division_name && !!errors.division_name}
                helperText={touched.division_name && errors.division_name}
                sx={{ gridColumn: 'span 2' }} />
            </Box>
            <Box display="flex" mt="24px">
              <Button type="submit" disabled={!(dirty && isValid) || isSubmitting}
                sx={{ ...btnStyle, backgroundColor: colors.greenAccent[600], '&:hover': { backgroundColor: colors.greenAccent[800] } }}>
                บันทึก
              </Button>
              <Button type="button" onClick={function() { navigate(-1) }}
                sx={{ ...btnStyle, backgroundColor: colors.grey[600], '&:hover': { backgroundColor: colors.grey[700] } }}>
                ยกเลิก
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default DivisionEdit
