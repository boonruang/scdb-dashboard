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

const StudentawardDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const navigate = useNavigate()

  const location = useLocation()

  console.log('StudentawardDetail row', location.state.row)

  const isNonMobile = useMediaQuery("(min-width:600px)")

  var row = location.state.row

  return <Box m="20px">
      <Header title="รายละเอียดข้อมูลรางวัล" />
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
                      value={row.award_id || ''}
                      name="award_id"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="รหัสนิสิต"
                      value={(row.Student && row.Student.studentOfficial_id) || row.student_id || ''}
                      name="student_id"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ชื่อนิสิต"
                      value={(row.Student && (row.Student.firstname + ' ' + row.Student.lastname)) || ''}
                      name="student_name"
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ชื่อรางวัล"
                      value={row.award_name || ''}
                      name="award_name"
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="ระดับรางวัล"
                      value={row.award_level || ''}
                      name="award_level"
                      sx={{ gridColumn: "span 1" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="สถานที่/งาน"
                      value={row.venue || ''}
                      name="venue"
                      sx={{ gridColumn: "span 2" }}
                      InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="วันที่ได้รับรางวัล"
                      value={row.award_date || ''}
                      name="award_date"
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

export default StudentawardDetail
