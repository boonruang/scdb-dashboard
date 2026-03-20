import React from 'react'
import {
    Box,
    useTheme,
    Button,
    TextField,
    useMediaQuery,
} from '@mui/material'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useNavigate, useLocation } from 'react-router-dom'

const StudentactivityDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const navigate = useNavigate()

  const location = useLocation()

  console.log('StudentactivityDetail row', location.state.row)

  const isNonMobile = useMediaQuery("(min-width:600px)")

  var row = location.state.row

  return <Box m="20px">
      <Header title="รายละเอียดข้อมูลโครงการ" />
              <Box>
                  <Box mt='40px'>
                  <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                      }}
                  >
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ลำดับ"
                      value={row.activity_id || ''}
                      name="activity_id"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="รหัสโครงการ"
                      value={row.activity_code || ''}
                      name="activity_code"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ชื่อโครงการ"
                      value={row.activity_name || ''}
                      name="activity_name"
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ผู้จัด/หน่วยงาน"
                      value={row.organizer || ''}
                      name="organizer"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="วันที่เริ่ม"
                      value={row.start_date || ''}
                      name="start_date"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="วันที่สิ้นสุด"
                      value={row.end_date || ''}
                      name="end_date"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="สถานที่"
                      value={row.venue || ''}
                      name="venue"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="จำนวนผู้เข้าร่วม"
                      value={row.participant_count || ''}
                      name="participant_count"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="จำนวนชั่วโมง"
                      value={row.hours || ''}
                      name="hours"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="งบประมาณ (บาท)"
                      value={row.budget_amount || ''}
                      name="budget_amount"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
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
                          onClick={() => (navigate(-1))}
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
                          กลับ
                      </Button>
                      </Box>
                </Box>
              </Box>

  </Box>
}

export default StudentactivityDetail
