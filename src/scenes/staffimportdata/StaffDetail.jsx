import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormControl,
    useMediaQuery,
    CardActionArea,
    Grid,
    styled,
    Card,
    CardMedia    
  } from '@mui/material'
import Header from "../../components/Header"
import { Formik, Field } from 'formik'
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import { formatThaiDateBuddhistEra } from '../../utils/formatthaidate'

const StaffDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  console.log('Post add row', location.state.row)

  const isNonMobile = useMediaQuery("(min-width:600px)")  


      return <Box m="20px">
        <Header title="รายละเอียดข้อมูล" />
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
                        label="รหัส"
                        value={location.state.row.staff_id}
                        name="id"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ชื่อ"
                        value={location.state.row.firstname}
                        name="firstname"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="นามสกุล"
                        value={location.state.row.lastname}
                        name="lastname"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ตำแหน่ง"
                        value={location.state.row.position}
                        name="id"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ตำแหน่ง"
                        value={location.state.row.position}
                        name="position"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="เลขประจำตำแหน่ง"
                        value={location.state.row.position_no}
                        name="position_no"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วุฒิการศึกษ"
                        value={location.state.row.education}
                        name="education"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภท"
                        value={location.state.row.Stafftype?.name}
                        name="staff_type"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันเริ่มงาน"
                        value={location.state.row.startdate}
                        name="startdate"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันเกิด"
                        value={location.state.row.birthday}
                        name="birthday"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="อีเมล์"
                        value={location.state.row.email}
                        name="email"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ออฟฟิศ"
                        value={location.state.row.office_location}
                        name="office_location"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />  
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ภาควิชา"
                        value={location.state.row.Department?.dept_name}
                        name="staff_type"
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

export default StaffDetail