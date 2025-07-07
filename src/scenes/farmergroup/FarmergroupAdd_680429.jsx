import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    TextField,
    MenuItem,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormControl,
    useMediaQuery,
} from '@mui/material'

import { Formik, Field, Form, FieldArray } from 'formik'
import { TextField as txtField } from 'formik-material-ui'
import * as yup from 'yup'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addFarmergroup } from '../../actions/farmergroup.action'
import { useNavigate } from 'react-router-dom'

import {
    APIProvider,
    Map,
    Marker,
} from '@vis.gl/react-google-maps'
import { getHerbalsShortlist } from 'actions/herbal.action'
import { getFarmersShortlist } from 'actions/farmer.action'
import ConfirmBox from 'components/ConfirmBox'
import MessageBox from 'components/MessageBox'

const googleMapsKey = process.env.REACT_APP_GOOGLEMAPS_API
const googleMapsId = process.env.REACT_APP_GOOGLEMAPS_ID

const emptyPlantation = { herbalId: 0, area: '', output: 0}
const emptyMember = { farmerId: 0 }

const initialValues = {
    farmergroupname: "",
    status: true,
    herbals: [emptyPlantation],
    farmers: [emptyMember]
}

const userSchema = yup.object().shape({
    farmergroupname: yup.string().required("ต้องใส่"),
    hno: yup.string().required("ต้องใส่"),
    moo: yup.string().required("ต้องใส่"),
    village: yup.string().required("ต้องใส่"),
    tambon: yup.string().required("ต้องใส่"),
    amphoe: yup.string().required("ต้องใส่"),
    province: yup.string().required("ต้องใส่"),
    postcode: yup.string().required("ต้องใส่").matches(/^[0-9]{5}$/,"ต้องประกอบด้วยตัวเลข 5 หลัก"),
})

const FarmergroupAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
  const INITIAL_ZOOM = 12
  const [center, setCenter] = useState(INITIAL_CENTER);

  const [herbalResult, setHerbalResult] = useState([])
  const [farmerResult, setFarmerResult] = useState([])

  const [open, setOpen] = useState(false)
  const [farmergroupId, setFarmergroupId] = useState(null)


  const { result } = useSelector((state) => state.app.roleReducer)
  const herbalReducer = useSelector((state) => state.app.herbalReducer)
  const farmerReducer = useSelector((state) => state.app.farmerReducer)

 const isNonMobile = useMediaQuery("(min-width:600px)")


useEffect(() => {
     dispatch(getHerbalsShortlist())
},[dispatch])

useEffect(() => {
    dispatch(getFarmersShortlist())
},[dispatch])
    
 useEffect(() => {
    setHerbalResult(herbalReducer.result)
 },[herbalReducer.result])

 useEffect(() => {
    setFarmerResult(farmerReducer.result)
 },[farmerReducer.result])


 const handleSubmitButton = () => {
    setOpen(true)
}

    return <Box m="20px"> 
        <Header title="เพิ่มข้อมูลกลุ่มเกษตรกร" />
        {/* <Box  sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', overflow:'scroll', overflowX: 'hidden'}}>  */}
        <Formik
        
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('farmergroupname', values.farmergroupname)
              formData.append('hno', values.hno)
              formData.append('moo', values.moo)
              formData.append('village', values.village)
              formData.append('tambon', values.tambon)
              formData.append('amphoe', values.amphoe)
              formData.append('province', values.province)
              formData.append('postcode', values.postcode)
              formData.append('tel', values.tel)
              formData.append('leader', values.leader)
              formData.append('cert', values.cert)
              formData.append('member', values.member)
              formData.append('facility', values.facility)
              formData.append('utility', values.utility)
              formData.append('latitude', values.use_map == '1' ? center.lat : values.latitude)
              formData.append('longitude', values.use_map == '1' ? center.lng : values.longitude)    
              formData.append('farmers', JSON.stringify(values.farmers))
              formData.append('herbals', JSON.stringify(values.herbals))
              formData.append('status', true)
              console.log('values',values)
              dispatch(addFarmergroup(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form autoComplete='off'
                //  onSubmit={handleSubmit}
                 >
                    <Box mt="10px" mb="10px">
                        <Typography>
                            ข้อมูลเบื้องต้น
                        </Typography> 
                    </Box>
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
                            label="ชื่อกลุ่ม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.farmergroupname}
                            name="farmergroupname"
                            error={!!touched.farmergroupname && !!errors.farmergroupname}
                            helperText={touched.farmergroupname && errors.farmergroupname}
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
                            label="หมู่ที่"
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
                            label="บ้าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.village}
                            name="village"
                            error={!!touched.village && !!errors.village}
                            helperText={touched.village && errors.village}
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

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="เบอร์ติดต่อ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.tel}
                            name="tel"                        
                            error={!!touched.tel && !!errors.tel}
                            helperText={touched.tel && errors.tel}
                            sx={{ gridColumn: "span 1" }}
                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ประธานกลุ่ม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.disease}
                            name="leader"
                            error={!!touched.leader && !!errors.leader}
                            helperText={touched.leader && errors.leader}
                            sx={{ gridColumn: "span 1" }}
                        />                                 
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="มาตรฐานที่ได้รับ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.charactername}
                            name="cert"
                            error={!!touched.cert && !!errors.cert}
                            helperText={touched.cert && errors.cert}
                            sx={{ gridColumn: "span 1" }}
                        />                               
  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="จำนวนสมาชิก"
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
                            label="โครงสร้างพื้นฐานของกลุ่ม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.facility}
                            name="facility"
                            error={!!touched.facility && !!errors.facility}
                            helperText={touched.facility && errors.facility}
                            sx={{ gridColumn: "span 1" }}
                        />                        

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สาธารณูประโภคในกลุ่ม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.utility}
                            name="utility"
                            error={!!touched.utility && !!errors.utility}
                            helperText={touched.utility && errors.utility}
                            sx={{ gridColumn: "span 1" }}
                        /> 
                       
                    </Box>    
              
              {/* plantation (relationship) with herbals */}
                          
                    <FieldArray name='herbals'>
                     {({push, remove, }) => (
                    <React.Fragment >
                    <Box mt="20px" >
                        <Typography>
                            ข้อมูลสมุนไพร
                        </Typography>            
                    </Box>            

                    <Box mt="10px"display="flex" sx={{ gridColumn: "span 2" }}>
                        <Button  disabled={isSubmitting} onClick={() => push(emptyPlantation)}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.greenAccent[800]}
                            }}
                        >
                            <AddIcon sx={{ mr: "10px" }} />
                            เพิ่มข้อมูล
                        </Button> 
                    </Box>      
                                     
                    <Box mt="10px"
                        borderRadius="3px"
                        sx={{
                            border: 1,
                            borderColor: colors.greenAccent[600],
                        }}>                         
                      {values.herbals.map((_, index) => (                   
                        <Box  key={index} mt="10px"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        borderRadius="3px"
                        sx={{
                            padding: "10px 20px",
                            mr: "10px",
                            mb: "10px",                                
                            // border: 1,
                            // borderColor: colors.greenAccent[600],
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}>

                            <Field
                                fullWidth
                                variant="filled"
                                type="text"
                                label="สมุนไพร"
                                select
                                // value={values.herbalId}
                                name={`herbals[${index}].herbalId`} 
                                defaultValue=""
                                component={txtField}
                                sx={{ gridColumn: "span 2" }} >
                                { herbalResult && herbalResult.map((herbal,key) => (
                                <MenuItem key={key} value={herbal.id} >
                                    {herbal.id} {herbal.herbalname}
                                </MenuItem>  
                            ))} 
                                <MenuItem value="no" >
                                    ไม่มีในรายการ
                                </MenuItem>                             
                            </Field>                              
                          
                            <Field
                                fullWidth
                                variant="filled"
                                component={txtField}
                                label="พื้นที่ในการปลูกสมุนไพร(ไร่)"
                                name={`herbals[${index}].area`} 
                                sx={{ gridColumn: "span 2" }}
                                /> 
                      
                            <Field
                                fullWidth
                                variant="filled"
                                type="text"
                                component={txtField}
                                label="ปริมาณการผลิต (กก./ปี)"
                                name={`herbals[${index}].output`} 
                                sx={{ gridColumn: "span 2" }}
                            />  
                            <Box display="flex" justifySelf="center" sx={{ gridColumn: "span 2" }}>
                                <Button  disabled={isSubmitting} onClick={() => push(emptyPlantation)}
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        width: '100px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        // padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.greenAccent[800]}
                                    }}
                                >
                                    <AddIcon sx={{ mr: "10px" }} />
                                </Button>  
                                <Button  disabled={isSubmitting} onClick={() => remove(index)}
                                    sx={{
                                        backgroundColor: colors.redAccent[700],
                                        color: colors.grey[100],
                                        width: '100px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        // padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.redAccent[800]}
                                    }}
                                >
                                    <RemoveIcon sx={{ mr: "10px" }} />
                                </Button>  
                            </Box>                          
                        </Box>
                      ))}  
                    </Box>
                    </React.Fragment> 
                    )} 
                    </FieldArray>
   

                 {/* Membership of farmer */}

                    <FieldArray name='farmers'>
                     {({push, remove, }) => (
                    <React.Fragment >
                    <Box mt="20px" >
                        <Typography>
                            ข้อมูลสมาชิก
                        </Typography>            
                    </Box>            

                    <Box mt="10px"display="flex" sx={{ gridColumn: "span 2" }}>
                        <Button  disabled={isSubmitting} onClick={() => push(emptyMember)}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.greenAccent[800]}
                            }}
                        >
                            <AddIcon sx={{ mr: "10px" }} />
                            เพิ่มข้อมูล
                        </Button> 
                    </Box>      
                                     
                    <Box mt="10px"
                        borderRadius="3px"
                        sx={{
                            border: 1,
                            borderColor: colors.greenAccent[600],
                        }}>                         
                      {values.farmers.map((_, index) => (                   
                        <Box  key={index} mt="10px"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        borderRadius="3px"
                        sx={{
                            padding: "10px 20px",
                            mr: "10px",
                            mb: "10px",                                
                            // border: 1,
                            // borderColor: colors.greenAccent[600],
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}>

                            <Field
                                fullWidth
                                variant="filled"
                                type="text"
                                label="ข้อมูลเกษตรกร"
                                select
                                name={`farmers[${index}].farmerId`} 
                                defaultValue=""
                                component={txtField}
                                sx={{ gridColumn: "span 2" }} >
                                { farmerResult && farmerResult.map((farmer,key) => (
                                <MenuItem key={key} value={farmer.id} >
                                    {farmer.cid} {farmer.firstname} {farmer.lastname}
                                </MenuItem>  
                            ))} 
                                <MenuItem value="no" >
                                    ไม่มีในรายการ
                                </MenuItem>                             
                            </Field>                              
                          
                            <Box display="flex" justifySelf="center" sx={{ gridColumn: "span 2" }}>
                                <Button  disabled={isSubmitting} onClick={() => push(emptyMember)}
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        width: '100px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        // padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.greenAccent[800]}
                                    }}
                                >
                                    <AddIcon sx={{ mr: "10px" }} />
                                </Button>  
                                <Button  disabled={isSubmitting} onClick={() => remove(index)}
                                    sx={{
                                        backgroundColor: colors.redAccent[700],
                                        color: colors.grey[100],
                                        width: '100px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        // padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.redAccent[800]}
                                    }}
                                >
                                    <RemoveIcon sx={{ mr: "10px" }} />
                                </Button>  
                            </Box>                          
                        </Box>
                      ))}  
                    </Box>
                    </React.Fragment> 
                    )} 
                    </FieldArray>
   
                {/* <Box>
                    <pre>{JSON.stringify({values, errors, isSubmitting}, null, 4)}</pre>                                          
                </Box>                 */}

                    <Box mt='20px'>
                        <Box mt="10px" mb="10px" sx={{ m: '5px'}} >
                            <Typography>
                                พิกัดกลุ่มเกษตรกร
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
                                // error={!!touched.latitude && !!errors.latitude}
                                // helperText={touched.latitude && errors.latitude}
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
                                // error={!!touched.longitude && !!errors.longitude}
                                // helperText={touched.longitude && errors.longitude}
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
                          mt: '20px',
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
                            onClick={() => navigate(-1)}
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
                </Form>
            )}
        </Formik>
        {/* </Box> */}
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />        
    </Box >
    
}

export default FarmergroupAdd