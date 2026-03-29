import React from 'react'
import { Box, useTheme, Button, TextField, Typography, useMediaQuery } from '@mui/material'
import Header from "../../components/Header"
import { tokens } from 'theme'
import { useNavigate, useLocation } from 'react-router-dom'


const AdmissionPlanDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()

    const isNonMobile = useMediaQuery("(min-width:600px)")
  // const [snackBarOpen, setSnackBarOpen] = useState(false)

  // const [roleSelected, setRoleSelected] = useState('1')

  // const { result } = useSelector((state) => state.app.roleReducer)


      return <Box m="20px">
        <Header title="รายละเอียดข้อมูล" subtitle="รายละเอียดข้อมูลแผนการรับนิสิต"  />
                <Box>
                    {/* tab1 */}
                        <Typography>
                            ข้อมูลเบื้องต้น
                        </Typography>
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
                        label="รหัส"
                        value={location.state.row.id}
                        name="id"
                        multiline={true}
                        minRows="2"                        
                        sx={{ gridColumn: "span 2" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ชื่อหลักสูตร"
                        value={location.state.row.program_name}
                        name="program_name"
                        multiline={true}
                        minRows="2"                        
                        sx={{ gridColumn: "span 2" }}
                        InputLabelProps={{ shrink: true }}
                    />
                   <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ระดับปริญญา"
                         value={location.state.row.degree_level || ''}
                         name="degree_level"
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="กลุ่ม"
                         value={location.state.row.group_name || ''}
                         name="group_name"
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ปีการศึกษา"
                         value={location.state.row.academic_year || ''}
                         name="academic_year"
                         sx={{ gridColumn: "span 1" }}
                         InputLabelProps={{ shrink: true }}
                     />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="แผนการรับ"
                         value={location.state.row.planned_seats || ''}
                         name="planned_seats"
                         sx={{ gridColumn: "span 1" }}
                         InputLabelProps={{ shrink: true }}
                     />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ผู้มีสิทธิ์"
                         value={location.state.row.eligible_count || ''}
                         name="eligible_count"
                         sx={{ gridColumn: "span 1" }}
                         InputLabelProps={{ shrink: true }}
                     />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="รายงานตัว"
                         value={location.state.row.actual_admitted || ''}
                         name="actual_admitted"
                         sx={{ gridColumn: "span 1" }}
                         InputLabelProps={{ shrink: true }}
                     />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ร้อยละ"
                         value={location.state.row.admit_pct || ''}
                         name="admit_pct"
                         sx={{ gridColumn: "span 2" }}
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
                            // onClick={handleCancelButtonClick}
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

    </Box >
}

export default AdmissionPlanDetail