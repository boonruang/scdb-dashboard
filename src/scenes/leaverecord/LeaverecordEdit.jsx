import React, { useState, useEffect } from 'react'
import { Box, useTheme, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText, useMediaQuery, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/Header'
import { tokens } from 'theme'
import { useDispatch } from 'react-redux'
import { updateLeaverecord } from '../../actions/leaverecord.action'
import { useNavigate, useLocation } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { th } from 'date-fns/locale'
import { httpClient } from '../../utils/HttpClient'
import { server } from '../../constants'

const LEAVE_TYPES = ['ลาป่วย', 'ลากิจ', 'ลาพักผ่อน', 'ลาอุปสมบท', 'ลาคลอดบุตร']

const schema = yup.object().shape({
  staff_id:   yup.string().required('กรุณาเลือกบุคลากร'),
  leave_type: yup.string().required('กรุณาเลือกประเภทการลา'),
  start_date: yup.date().nullable().required('กรุณาเลือกวันเริ่มต้น'),
  end_date:   yup.date().nullable().required('กรุณาเลือกวันสิ้นสุด'),
})

const LeaverecordEdit = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [staffList, setStaffList] = useState([])
  const row = location?.state?.row || {}

  useEffect(function() {
    httpClient.get(server.STAFF_URL + '/list').then(function(res) {
      setStaffList((res.data?.result || []).sort(function(a, b) {
        return (a.position_no || '').localeCompare(b.position_no || '')
      }))
    })
  }, [])

  const initialValues = {
    staff_id:   row.staff_id   || row.Staff?.staff_id || '',
    leave_type: row.leave_type || '',
    start_date: row.start_date ? new Date(row.start_date) : null,
    end_date:   row.end_date   ? new Date(row.end_date)   : null,
  }

  const btnStyle = {
    color: colors.grey[100], fontSize: '14px', fontWeight: 'bold',
    padding: '10px 20px', mr: '10px', mb: '10px',
  }

  return (
    <Box m="20px">
      <Header title="แก้ไขข้อมูลการลา" />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          enableReinitialize
          onSubmit={async function(values, { setSubmitting }) {
            var formData = new FormData()
            formData.append('staff_id',   values.staff_id)
            formData.append('leave_type', values.leave_type)
            formData.append('start_date', values.start_date ? values.start_date.toISOString() : '')
            formData.append('end_date',   values.end_date   ? values.end_date.toISOString()   : '')
            await dispatch(updateLeaverecord(navigate, formData, row.leave_id))
            setSubmitting(false)
          }}
        >
          {({ values, errors, touched, isSubmitting, dirty, isValid, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="24px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                mt="30px"
                sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
              >
                {/* บุคลากร */}
                <Autocomplete
                  sx={{ gridColumn: 'span 2' }}
                  options={staffList}
                  getOptionLabel={function(s) { return (s.position_no || '') + ' — ' + (s.firstname_th || '') + ' ' + (s.lastname_th || '') }}
                  value={staffList.find(function(s) { return s.staff_id === values.staff_id }) || null}
                  onChange={function(e, val) { setFieldValue('staff_id', val ? val.staff_id : '') }}
                  isOptionEqualToValue={function(opt, val) { return opt.staff_id === val.staff_id }}
                  renderInput={function(params) {
                    return <TextField {...params} label="บุคลากร" variant="outlined"
                      error={!!touched.staff_id && !!errors.staff_id}
                      helperText={touched.staff_id && errors.staff_id} />
                  }}
                />

                {/* ประเภทการลา */}
                <FormControl fullWidth variant="outlined" sx={{ gridColumn: 'span 2' }}
                  error={!!touched.leave_type && !!errors.leave_type}>
                  <InputLabel>ประเภทการลา</InputLabel>
                  <Select value={values.leave_type} label="ประเภทการลา"
                    onChange={function(e) { setFieldValue('leave_type', e.target.value) }}>
                    {LEAVE_TYPES.map(function(t) { return <MenuItem key={t} value={t}>{t}</MenuItem> })}
                  </Select>
                  {touched.leave_type && errors.leave_type && <FormHelperText>{errors.leave_type}</FormHelperText>}
                </FormControl>

                {/* วันเริ่มต้น */}
                <DatePicker label="วันเริ่มต้น" value={values.start_date}
                  onChange={function(v) { setFieldValue('start_date', v) }}
                  format="d MMMM yyyy"
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined', sx: { gridColumn: 'span 2' },
                    error: !!touched.start_date && !!errors.start_date,
                    helperText: touched.start_date && errors.start_date } }} />

                {/* วันสิ้นสุด */}
                <DatePicker label="วันสิ้นสุด" value={values.end_date}
                  onChange={function(v) { setFieldValue('end_date', v) }}
                  format="d MMMM yyyy"
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined', sx: { gridColumn: 'span 2' },
                    error: !!touched.end_date && !!errors.end_date,
                    helperText: touched.end_date && errors.end_date } }} />
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
      </LocalizationProvider>
    </Box>
  )
}

export default LeaverecordEdit
