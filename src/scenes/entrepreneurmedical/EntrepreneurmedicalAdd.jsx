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
    Select,
    MenuItem,
  } from '@mui/material'

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addEntrepreneurmedicals } from '../../actions/entrepreneurmedical.action'
import { getServicetype } from '../../actions/servicetype.action'
import { getOwnertype } from '../../actions/ownertype.action'
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
    servicetypeId: yup.string().required("ต้องใส่"),
    ownertypeId: yup.string().required("ต้องใส่"),
    name: yup.string().required("ต้องใส่"),
    hno: yup.string().required("ต้องใส่"),
    moo: yup.string().required("ต้องใส่"),
    tambon: yup.string().required("ต้องใส่"),
    amphoe: yup.string().required("ต้องใส่"),
    province: yup.string().required("ต้องใส่"),
    postcode: yup.string().required("ต้องใส่").matches(/^[0-9]{5}$/,"ต้องประกอบด้วยตัวเลข 5 หลัก"),
    member: yup.string().required("ต้องใส่").matches(/^[0-9]*$/,"ต้องประกอบด้วยตัวเลข"),
}) // end yup

const EntrepreneurmedicalAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
  const INITIAL_ZOOM = 12
  const [center, setCenter] = useState(INITIAL_CENTER);

  const [servicetypeData, setServicetypeData] = useState([])
  const [ownertypeData, setOwnertypeData] = useState([])


  const servicetypeReducer = useSelector((state) => state.app.servicetypeReducer)
  const ownertypeReducer = useSelector((state) => state.app.ownertypeReducer)

  useEffect(() => {
        dispatch(getServicetype())
  },[dispatch])

  useEffect(() => {
    setServicetypeData(servicetypeReducer?.result)
},[servicetypeReducer?.result])  

  useEffect(() => {
        dispatch(getOwnertype())
  },[dispatch])

  useEffect(() => {
    setOwnertypeData(ownertypeReducer.result)
},[ownertypeReducer.result])    

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


    return <Box m="20px">
        <Header title="เพิ่มข้อมูลผู้ประกอบการ" subtitle="เพิ่มข้อมูลผู้ประกอบการด้านการแพทย์แผนไทย/สมุนไพร" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('name', values.name)
              formData.append('hno', values.hno)
              formData.append('moo', values.moo)
              formData.append('tambon', values.tambon)
              formData.append('amphoe', values.amphoe)
              formData.append('province', values.province)
              formData.append('postcode', values.postcode)
              formData.append('servicetypeId', values.servicetypeId)
              formData.append('ownertypeId', values.ownertypeId)
              formData.append('member', values.member)
              formData.append('reference', values.reference)
              formData.append('status', 'true')
              formData.append('latitude', values.use_map == '1' ? center.lat : values.latitude)
              formData.append('longitude', values.use_map == '1' ? center.lng : values.longitude)              
              console.log('values',values)
              dispatch(addEntrepreneurmedicals(navigate, formData))
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
                    {/* <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภทผู้ประกอบการ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.service_type}
                        name="service_type"
                        error={!!touched.service_type && !!errors.service_type}
                        helperText={touched.service_type && errors.service_type}
                        sx={{ gridColumn: "span 1" }}
                    /> */}

                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="ประเภทผู้ประกอบการ"
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.servicetypeId}
                    name="servicetypeId"
                    error={!!touched.servicetypeId && !!errors.servicetypeId}
                    helperText={touched.servicetypeId && errors.servicetypeId}
                    defaultValue=""
                    sx={{ gridColumn: "span 1" }} >
                    { servicetypeData && servicetypeData.map((item,key) => (
                    <MenuItem key={key} value={item.id} >
                        {item.id+'-'+item.name}
                    </MenuItem>  
                    ))} 
                    </TextField> 

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ชื่อสถานประกอบการ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="เลขที่"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.hno}
                         name="hno"
                         error={!!touched.hno && !!errors.hno}
                         helperText={touched.hno && errors.hno}
                         sx={{ gridColumn: "span 1" }}
                     />       
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="หมู่"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.moo}
                         name="moo"
                         error={!!touched.moo && !!errors.moo}
                         helperText={touched.moo && errors.moo}
                         sx={{ gridColumn: "span 1" }}
                     />       
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ตำบล"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.tambon}
                         name="tambon"
                         error={!!touched.tambon && !!errors.tambon}
                         helperText={touched.tambon && errors.tambon}
                         sx={{ gridColumn: "span 1" }}
                     />     
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="อำเภอ"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.amphoe}
                         name="amphoe"
                         error={!!touched.amphoe && !!errors.amphoe}
                         helperText={touched.amphoe && errors.amphoe}
                         sx={{ gridColumn: "span 1" }}
                     />     
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="จังหวัด"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.province}
                         name="province"
                         error={!!touched.province && !!errors.province}
                         helperText={touched.province && errors.province}
                         sx={{ gridColumn: "span 1" }}
                     />                                         
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="รหัสไปรษณีย์"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.postcode}
                         name="postcode"     
                         error={!!touched.postcode && !!errors.postcode}
                         helperText={touched.postcode && errors.postcode}
                         sx={{ gridColumn: "span 1" }}
                     /> 
                     {/* <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ผู้ประกอบการ (ภาครัฐ/ภาคเอกชน)"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.owner}
                         name="owner"     
                         error={!!touched.owner && !!errors.owner}
                         helperText={touched.owner && errors.owner}
                         sx={{ gridColumn: "span 1" }}
                     />  */}

                    <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="ผู้ประกอบการ (ภาครัฐ/ภาคเอกชน)"
                    select
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ownertypeId}
                    name="ownertypeId"
                    error={!!touched.ownertypeId && !!errors.ownertypeId}
                    helperText={touched.ownertypeId && errors.ownertypeId}
                    defaultValue=""
                    sx={{ gridColumn: "span 1" }} >
                    { ownertypeData && ownertypeData.map((item,key) => (
                    <MenuItem key={key} value={item.id} >
                        {item.id+'-'+item.name}
                    </MenuItem>  
                    ))} 
                    </TextField> 

                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="จำนวนแพทย์แผนไทยที่ประจำ"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.member}
                         name="member"     
                         error={!!touched.member && !!errors.member}
                         helperText={touched.member && errors.member}
                         sx={{ gridColumn: "span 1" }}
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
                         error={!!touched.reference && !!errors.reference}
                         helperText={touched.reference && errors.reference}
                         sx={{ gridColumn: "span 1" }}
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

export default EntrepreneurmedicalAdd