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
  } from '@mui/material'

import Header from "../../components/Header"
import { Formik, Field } from 'formik'
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams,useLocation } from 'react-router-dom'


const AcademicProgramDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  console.log('Academic add row', location.state.row)

    const isNonMobile = useMediaQuery("(min-width:600px)")  

      return <Box m="20px">
        <Header title="รายละเอียดข้อมูล" subtitle="รายละเอียดข้อมูลหลักสูตร"  />
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
                        sx={{ gridColumn: "span 2" }}
                        InputLabelProps={{ shrink: true }}
                    />
                   <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ปริญญา"
                         value={location.state.row.degree_level}
                         name="degree_level"
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />       
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ภาควิชา"
                         value={location.state.row.Department?.dept_name}
                         name="dept_name"
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

export default AcademicProgramDetail