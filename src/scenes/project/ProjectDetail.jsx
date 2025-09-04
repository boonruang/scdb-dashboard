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
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import Header from "../../components/Header"
import { Formik, Field } from 'formik'
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import { formatThaiDateBuddhistEra } from '../../utils/formatthaidate'

const imagesUrl = process.env.REACT_APP_POSTS_IMAGES_URL

const Item = ({image}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="220"
              // image={imagesUrl+'ฟ้าทะลายโจร.jpg'}
              image={image ? imagesUrl+image : imagesUrl+'no-image-icon-23485.png'}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
          </CardActionArea>
        </Card>
      </Grid>
    )
}

const ProjectDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  console.log('Post add row', location.state.row)

  const isNonMobile = useMediaQuery("(min-width:600px)")  


      return <Box m="20px">
        <Header title="รายละเอียดข้อมูล" subtitle="รายละเอียดข้อมูลการโพสต์ข้อความ" />
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
                        value={location.state.row.project_id}
                        name="id"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ชื่อโครงการ"
                        value={location.state.row.project_name}
                        name="project_name"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภทโครงการ"
                        value={location.state.row.project_type}
                        name="project_type"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันเริ่มต้น"
                        value={location.state.row.start_date}
                        name="start_date"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันสิ้นสุด"
                        value={location.state.row.end_date}
                        name="end_date"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="แหล่งงบประมาณ"
                        value={location.state.row.budget_source}
                        name="budget_source"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="งบประมาณ"
                        value={location.state.row.budget_amount}
                        name="budget_amount"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="สถานะ"
                        value={location.state.row.status}
                        name="status"
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ภาควิชา"
                        value={location.state.row.Department.dept_name}
                        name="status"
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

export default ProjectDetail