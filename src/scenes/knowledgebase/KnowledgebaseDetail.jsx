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


const KnowledgebaseDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  console.log('Outsource add row', location.state.row)

    const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
    const INITIAL_ZOOM = 12
    const [center, setCenter] = useState(INITIAL_CENTER);

    const isNonMobile = useMediaQuery("(min-width:600px)")  


    useEffect(() => {
        if (location.state.row.latitude && location.state.row.latitude) {
            setCenter({ lat: location.state.row.latitude, lng: location.state.row.longitude})
        }
    },[location.state.row])
  // const [snackBarOpen, setSnackBarOpen] = useState(false)

  // const [roleSelected, setRoleSelected] = useState('1')

  // const { result } = useSelector((state) => state.app.roleReducer)


      return <Box m="20px">
        <Header title="รายละเอียดข้อมูล" subtitle="รายละเอียดข้อมูลองค์ความรู้การแพทย์แผนไทย"  />
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
                        label="เรื่อง"
                        value={location.state.row.name}
                        name="name"
                        multiline={true}
                        minRows="2"                        
                        sx={{ gridColumn: "span 2" }}
                        InputLabelProps={{ shrink: true }}
                    />
                   <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อผู้แต่ง"
                         value={location.state.row.author}
                         name="author"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />       
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ปีที่ตีพิมพ์"
                         value={location.state.row.publishyear}
                         name="publishyear"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />       
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="พิมพ์ครั้งที่"
                         value={location.state.row.edition}
                         name="edition"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="สำนักพิมพ์"
                         value={location.state.row.journal}
                         name="journal"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />     
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="สถานที่พิมพ์"
                         value={location.state.row.press}
                         name="press"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />     
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ประเภท"
                         value={location.state.row.type}
                         name="type"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />                                         

                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="อ้างอิง"
                         value={location.state.row.reference}
                         name="reference"
                         multiline={true}
                         minRows="2"                              
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     /> 
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="เอกสารแนบ"
                         value={location.state.row.attachment}
                         name="attachment"
                         multiline={true}
                         minRows="2"                              
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

export default KnowledgebaseDetail