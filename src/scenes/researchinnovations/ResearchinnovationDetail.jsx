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
import {
    APIProvider,
    Map,
    Marker,
} from '@vis.gl/react-google-maps'

const googleMapsKey = process.env.REACT_APP_GOOGLEMAPS_API
const googleMapsId = process.env.REACT_APP_GOOGLEMAPS_ID

const ResearchinnovationDetail = () => {

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
        <Header title="รายละเอียดข้อมูล" subtitle="รายละเอียดข้อมูลงานวิจัยและนวัตกรรม"  />
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
                        label="ผลงานวิจัยด้าน (การปลูก/การแปรรูป/การพัฒนาผลิตภัณฑ์)"
                        value={location.state.row.researchname}
                        name="researchname"
                        multiline={true}
                        minRows="2"                        
                        sx={{ gridColumn: "span 2" }}
                        InputLabelProps={{ shrink: true }}
                    />
                   <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อผู้วิจัย"
                         value={location.state.row.researcher}
                         name="researcher"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />       
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ตำแหน่งทางวิชาการ"
                         value={location.state.row.position}
                         name="position"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />       
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="หน่วยงาน"
                         value={location.state.row.organization}
                         name="organization"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อสมุนไพรที่วิจัย"
                         value={location.state.row.herbal}
                         name="herbal"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />     
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ประเภทการตีพิมพ์ (บทความวิชาการ/วารสาร/วิทยานิพนธ์)"
                         value={location.state.row.researchtype}
                         name="researchtype"
                         multiline={true}
                         minRows="2"                         
                         sx={{ gridColumn: "span 2" }}
                         InputLabelProps={{ shrink: true }}
                     />     
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อแหล่งที่ตีพิมพ์"
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
                         label="พ.ศ. ที่ตีพิมพ์"
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
                         label="เอกสารแนบหรือลิ้งข้อมูล"
                         value={location.state.row.download}
                         name="download"
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

                    </Box>
                </Box>
                <Box mt='20px'>
                        <Box mt="10px" mb="10px" sx={{ m: '5px'}} >
                            <Typography>
                                พิกัดทางภูมิศาสตร์
                            </Typography>
                        </Box>                      
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            }}
                        >

                            <TextField
                                variant="filled"
                                size="small"
                                type="text"
                                label="ละติจูด"
                                value={location.state.row.latitude}
                                name="latitude"                        
                                InputLabelProps={{ shrink: true }}
                                sx={{ gridColumn: "span 1", width: "200px", mr: "20px"}}
                            />  
                            <TextField
                                variant="filled"
                                size="small"
                                type="text"
                                label="ลองจิจูด"
                                value={location.state.row.longitude}
                                name="longitude"                        
                                InputLabelProps={{ shrink: true }}
                                sx={{ gridColumn: "span 1", width: "200px"  }}
                            /> 


                                <Box mb='30px' height="35vh"  sx={{ gridColumn: "span 6" }} >
                                    <APIProvider apiKey={googleMapsKey}>
                                            <Map mapId={googleMapsId}
                                                defaultCenter={{ lat: location.state.row.latitude, lng: location.state.row.longitude}}
                                                defaultZoom={INITIAL_ZOOM}
                                                center={center}
                                                gestureHandling={'greedy'}
                                                disableDefaultUI={false}>
                                                <Marker
                                                position={center}
                                                // draggable
                                                onDrag={e =>
                                                    setCenter({lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0})
                                                }
                                                />
                                            </Map>                        
                                    </APIProvider>                          
                                </Box>

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

export default ResearchinnovationDetail