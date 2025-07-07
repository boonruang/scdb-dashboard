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

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addResearchinnovation } from '../../actions/researchinnovations.action'
import { useNavigate } from 'react-router-dom'
import {
    APIProvider,
    Map,
    Marker,
} from '@vis.gl/react-google-maps'
import MessageBox from 'components/MessageBox'

const googleMapsKey = process.env.REACT_APP_GOOGLEMAPS_API
const googleMapsId = process.env.REACT_APP_GOOGLEMAPS_ID

const initialValues = {
    name: "",
}

const userSchema = yup.object().shape({
    researchname: yup.string().required("ต้องใส่"),
    researcher: yup.string().required("ต้องใส่"),
    position: yup.string().required("ต้องใส่"),
    organization: yup.string().required("ต้องใส่"),
    herbal: yup.string().required("ต้องใส่"),
    organization: yup.string().required("ต้องใส่"),
    researchtype: yup.string().required("ต้องใส่"),
    journal: yup.string().required("ต้องใส่"),
    publishyear: yup.string().required("ต้องใส่"),
    researchtype: yup.string().required("ต้องใส่"),
}) // end yup

const ResearchinnovationAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
  const INITIAL_ZOOM = 12
  const [center, setCenter] = useState(INITIAL_CENTER);

  //  if (result) {
  //   console.log('role result',result)
  //  }

   const handleSubmitButton = (values) => {
    setOpen(true)
    // console.log(values)
   }

   const handleCancelButton = () => {
    navigate(-1)
   }


    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
        // dispatch(addUser(navigate,values))
    }

    return <Box m="20px">
        <Header title="เพิ่มข้อมูล" subtitle="เพิ่มข้อมูลงานวิจัยและนวัตกรรม" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('researchname', values.researchname)
              formData.append('researcher', values.researcher)
              formData.append('position', values.position)
              formData.append('organization', values.organization)
              formData.append('herbal', values.herbal)
              formData.append('researchtype', values.researchtype)
              formData.append('journal', values.journal)
              formData.append('publishyear', values.publishyear)
              formData.append('download', values.download)
              formData.append('reference', values.reference)
              formData.append('status', 'true')
              formData.append('latitude', values.use_map == '1' ? center.lat : values.latitude)
              formData.append('longitude', values.use_map == '1' ? center.lng : values.longitude)              
              console.log('values',values)
              dispatch(addResearchinnovation(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
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
                        label="ผลงานวิจัยด้าน (การปลูก/การแปรรูป/การพัฒนาผลิตภัณฑ์)"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.researchname}
                        name="researchname"
                        multiline={true}
                        minRows="2"                        
                        error={!!touched.researchname && !!errors.researchname}
                        helperText={touched.researchname && errors.researchname}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อผู้วิจัย"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.researcher}
                         name="researcher"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.researcher && !!errors.researcher}
                         helperText={touched.researcher && errors.researcher}
                         sx={{ gridColumn: "span 2" }}
                     />       
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ตำแหน่งทางวิชาการ"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.position}
                         name="position"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.position && !!errors.position}
                         helperText={touched.position && errors.position}
                         sx={{ gridColumn: "span 2" }}
                     />       
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="หน่วยงาน"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.organization}
                         name="organization"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.organization && !!errors.organization}
                         helperText={touched.organization && errors.organization}
                         sx={{ gridColumn: "span 2" }}
                     />     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อสมุนไพรที่วิจัย"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.herbal}
                         name="herbal"
                         multiline={true}
                         minRows="2"                       
                         error={!!touched.herbal && !!errors.herbal}
                         helperText={touched.herbal && errors.herbal}
                         sx={{ gridColumn: "span 2" }}
                     />     
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ประเภทการตีพิมพ์ (บทความวิชาการ/วารสาร/วิทยานิพนธ์)"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.researchtype}
                         name="researchtype"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.researchtype && !!errors.researchtype}
                         helperText={touched.researchtype && errors.researchtype}
                         sx={{ gridColumn: "span 2" }}
                     />     
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อแหล่งที่ตีพิมพ์"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.journal}
                         name="journal"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.journal && !!errors.journal}
                         helperText={touched.journal && errors.journal}
                         sx={{ gridColumn: "span 2" }}
                     />                                         
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="พ.ศ. ที่ตีพิมพ์"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.publishyear}
                         name="publishyear"
                         multiline={true}
                         minRows="2"                              
                         error={!!touched.publishyear && !!errors.publishyear}
                         helperText={touched.publishyear && errors.publishyear}
                         sx={{ gridColumn: "span 2" }}
                     /> 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="เอกสารแนบหรือลิ้งข้อมูล"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.download}
                         name="download"     
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.download && !!errors.download}
                         helperText={touched.download && errors.download}
                         sx={{ gridColumn: "span 2" }}
                     /> 
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="อ้างอิง"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.reference}
                         name="reference"     
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.reference && !!errors.reference}
                         helperText={touched.reference && errors.reference}
                         sx={{ gridColumn: "span 2" }}
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
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.use_map == '1' ? center.lat : values.latitude}
                                name="latitude"                        
                                error={!!touched.latitude && !!errors.latitude}
                                helperText={touched.latitude && errors.latitude}
                                InputLabelProps={{ shrink: true }}
                                sx={{ gridColumn: "span 1", width: "200px", mr: "20px"}}
                            />  
                            <TextField
                                variant="filled"
                                size="small"
                                type="text"
                                label="ลองจิจูด"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.use_map == '1' ? center.lng : values.longitude}
                                name="longitude"                        
                                error={!!touched.longitude && !!errors.longitude}
                                helperText={touched.longitude && errors.longitude}
                                InputLabelProps={{ shrink: true }}
                                sx={{ gridColumn: "span 1", width: "200px"  }}
                            /> 

                            <Box sx={{mt:"5px"}} >
                                <FormControl  sx={{m:"5px"}}>
                                    <RadioGroup
                                        row
                                        role="map_show_group"
                                        aria-labelledby="province-selection-label"
                                        defaultValue="1"
                                        // handleChange={handleProvinceSelected(province1,values.map_show)}
                                        handleChange={handleChange}
                                        >
                                            <FormControlLabel control={<Field type="checkbox" name="map_show" value="1" sx={{ mr: '10px'}}  />} label="แสดงแผนที่" />
                                    </RadioGroup>  
                                    <RadioGroup
                                        row
                                        role="use_map_group"
                                        aria-labelledby="province-selection-label"
                                        defaultValue="1"
                                        handleChange={handleChange}
                                        >
                                            <FormControlLabel control={<Field type="checkbox" name="use_map" value="1" sx={{ mr: '10px'}}  />} label="ใช้พิกัดจากแผนที่" />
                                    </RadioGroup>                                  
                                </FormControl>                         
                            </Box>

                            { (values.map_show == "1") ? ( 
                                <Box mb='30px' height="35vh"  sx={{ gridColumn: "span 6" }} >
                                    <APIProvider apiKey={googleMapsKey}>
                                        <Box display="flex" flexDirection="row">
                                            <Typography variant="h5" sx={{ mr: "10px"}}>
                                            ละติจูด
                                            </Typography>
                                            <Typography variant="body1">{center.lat}</Typography> 
                                            <Typography variant="h5" sx={{ ml: "10px", mr: "10px"}}>
                                            ลองจิจูด
                                            </Typography>
                                            <Typography variant="body1">{center.lng}</Typography> 
                                        </Box>
                                            <Map mapId={googleMapsId}
                                                defaultCenter={INITIAL_CENTER}
                                                defaultZoom={INITIAL_ZOOM}
                                                center={center}
                                                gestureHandling={'greedy'}
                                                disableDefaultUI={false}>
                                                <Marker
                                                position={center}
                                                draggable
                                                onDrag={e =>
                                                    setCenter({lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0})
                                                }
                                                />
                                            </Map>                        
                                    </APIProvider>                          
                                </Box>
                            ) : undefined   }                         

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
                        <Button  onClick={handleSubmitButton}
                            type='submit'
                            // disabled={isSubmitting}
                            disabled={!(dirty && isValid)}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "20px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.blueAccent[700]}
                            }}
                        >
                            บันทึก
                        </Button>
                        <Button  
                            onClick={handleCancelButton}
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
                            ยกเลิก
                        </Button>    
                        </Box>                
                  </Box>   
                </form>
            )}
        </Formik>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />          
    </Box >
    
}

export default ResearchinnovationAdd