import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    TextField,
    MenuItem,
    Typography,
    Tabs,
    Tab,
  } from '@mui/material'

import { postcodes } from "../../data/thPostcode"

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
// import { addFarmersRegister } from '../../actions/register.action'
import { updateFarmer } from '../../actions/farmer.action'
import { getHerbals } from '../../actions/herbal.action'
import { getFarmergroup } from '../../actions/farmergroup.action'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"

import {
    APIProvider,
    Map,
    Marker,
} from '@vis.gl/react-google-maps'

const googleMapsKey = process.env.REACT_APP_GOOGLEMAPS_API
const googleMapsId = process.env.REACT_APP_GOOGLEMAPS_ID

const initialValues = {
    cert: "",
}

const userSchema = yup.object().shape({
    moo: yup.string().required("ต้องใส่"),
    tel: yup.string().required("ต้องใส่"),

})

const FamerAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [farmerId, setFarmerId] = useState(null)


  const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
  const INITIAL_ZOOM = 12
  const [center, setCenter] = useState(INITIAL_CENTER);

  const [value, setValue] = useState(0);


  useEffect(() => {
      setProvinces(postcodes)
  },[postcodes])

    useEffect(() => {
        dispatch(getFarmergroup())
        console.log('useEffect getFarmergroup is called')
    },[dispatch])


    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitButtonClick = () => {
        setOpen(true)
   }

    const handleTabNext = () => {
        setValue(value + 1)
        console.log('tab value => ',value)
        
   }

    const handleCancelButtonClick = () => {
    navigate(-1)
   }

   const handleProvinceSelected = (p,v) => {
    console.log('p,v value ',p,v)
    // send province
    setProvincetarget(p) 
    // get province or all 
    setProvincetargetfag(v)
   }

   const handleFormSubmit = async (values, { setSubmitting }) => {
    let formData = new FormData()
    formData.append('cert', values.cert)
    formData.append('cert_date', values.cert_date)
    formData.append('cert_expire_date', values.cert_expire_date)
    formData.append('latitude', values.use_map == '1' ? center.lat : values.latitude)
    formData.append('longitude', values.use_map == '1' ? center.lng : values.longitude)    

    console.log('Append Farmer Cert info form values: ',values)
    dispatch(updateFarmer(navigate, formData))
    setSubmitting(false)
}   


    const isNonMobile = useMediaQuery("(min-width:600px)")

    return <>
    <Box m="20px">
        <Header title="เพิ่มเกษตรกร" />

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
            // validateOnMount
            >
            {({ values, errors, touched, isSubmitting,isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    {console.log('dirty: ', dirty)}
                    {console.log('isValid: ', isValid)}
                    {console.log('isSubmitting: ', isSubmitting)}
                <Box>

                <CustomTabPanel value={value} index={1}>
                    <Typography>
                        ใบรับรอง
                    </Typography>
                <Box mt='40px'>
                <Box sx={{ m: '5px'}} >
                    <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        mt: "20px",
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                    }}
                    >

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="เลขที่ใบรับรอง"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstname}
                        name="cert"
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        sx={{ gridColumn: "span 1"}}
                        
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันที่ได้รับ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastname}
                        name="cert_date"
                        error={!!touched.cert_date && !!errors.cert_date}
                        helperText={touched.cert_date && errors.cert_date}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันหมดอายุ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastname}
                        name="cert_expire_date"
                        error={!!touched.cert_expire_date && !!errors.cert_expire_date}
                        helperText={touched.cert_expire_date && errors.cert_expire_date}
                        sx={{ gridColumn: "span 1" }}
                    />
                    </Box>                        
                </Box>
                </Box>

                <Box mt='40px'>
                        <Box sx={{ m: '5px'}} >
                        <Typography>
                            พิกัดแปลงปลูก
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
                                {/* <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>
                                    ต้องการเลือกพิกัดจากแผนที่
                                </Typography> */}
                                <FormControl  sx={{m:"5px"}}>
                                    <RadioGroup
                                        row
                                        role="map_show_group"
                                        aria-labelledby="province-selection-label"
                                        defaultValue="1"
                                        handleChange={handleProvinceSelected(province1,values.map_show)}
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

                            { (values.farmer_type =="1" && values.map_show == "1") ? ( 
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
                   
                </CustomTabPanel>                                  
                    
                <Box 
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    mt="20px"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                    }}                    
                >
                    
                    <Box display="flex" justifyContent="start"
                        sx={{
                        ml: "30px",
                        gridColumn: "span 1"
                        }}                    
                    >
                            <Button  
                            onClick={handleSubmitButtonClick}
                            // type='button'
                            type='submit'
                            disabled={!(dirty && isValid)}
                            // disabled={isSubmitting}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "20px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.greenAccent[800]}
                            }}
                            >
                            บันทึก
                        </Button>                        


                            <Button  
                                onClick={handleCancelButtonClick}
                                type='button'
                                sx={{
                                    backgroundColor: colors.greenAccent[600],
                                    color: colors.grey[100],
                                    width: '135px',
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    mr: "20px",
                                    mb: "10px",
                                    '&:hover': {backgroundColor: colors.greenAccent[800]}
                                }}
                            >
                                ยกเลิก
                            </Button>    
                            
                    </Box>    
                </Box>   
                </Box>
                </Form>
            )}
        </Formik>
    </Box >
</>
}

export default FamerAdd