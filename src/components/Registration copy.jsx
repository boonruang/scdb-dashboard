import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'
import { 
    Box, 
    useTheme,
    Button,
    TextField,
    Select,
    MenuItem,
    CardActionArea,
    Grid,
    Typography
  } from '@mui/material'

import { postcodes } from "../data/thPostcode.js"

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addFarmersRegister } from '../actions/register.action'
import { getFarmergroup } from '../actions/farmergroup.action'
import { getCollaborativefarms, getCollaborativefarmByKeyword } from '../actions/collaborativefarm.action.js'
import { getEntrepreneurherbals } from '../actions/entrepreneurherbal.action'
import { getEntrepreneurmedicals } from '../actions/entrepreneurmedical.action'
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"
import { ConstructionOutlined } from '@mui/icons-material';
import { server } from '../constants/index'
import {
    APIProvider,
    Map,
    Marker,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'

const initialValues = {
    firstname: "",
    lastname: "",
    province_selected: "2",
    farmer_type: "1",
    farmer_data: "",
    collaborativefarm: "",
    register_type: "1",
    register_data: "",
    entrepreneur_type: "0",
    entrepreneurherbal: "",
    entrepreneurherbal_data: "",
    entrepreneurtraditionalmedicine: "",
    entrepreneurtraditionalmedicine_data: "",
}

const userSchema = yup.object().shape({
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),

    password: yup.string().required("ต้องใส่").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "ต้องประกอบด้วยอักษรภาษาอังกฤษตัวใหญ่ ตัวเล็ก และตัวเลข รวมกันต้องไม่น้อยกว่า 8 ตัวอักษร"
      ),
    password2: yup.string().required("ต้องใส่").oneOf([yup.ref('password'), null], 'รหัสผ่านต้องเหมือนกัน'),
    // cid: yup.string().required("ต้องใส่"),
    cid: yup.string().required("ต้องใส่").matches(/^[0-9]{13}$/,"ต้องประกอบด้วยตัวเลข 13 หลัก"),    
    hno: yup.string().required("ต้องใส่"),
    moo: yup.string().required("ต้องใส่"),
    tel: yup.string().required("ต้องใส่"),
    // latitude: yup.string().required("ต้องใส่"),
    // longitude: yup.string().required("ต้องใส่"),
    // tambon: yup.string().required("ต้องใส่"),
    // amphoe: yup.string().required("ต้องใส่"),
    // province: yup.string().required("ต้องใส่"),
    // postcode: yup.string().required("ต้องใส่"),
})


const Registration = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [tambon1, setTambon] = useState('');
  const [amphure1, setAmphure] = useState('');
  const [province1, setProvince] = useState('');
  const [zipcode1, setZipcode] = useState('');
  const [provincetarget, setProvincetarget] = useState('มหาสารคาม');
  const [provincetagfag, setProvincetargetfag] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [mock, setMock] = useState({
    province_id: undefined,
    amphure_id: undefined,
    tambon_id: undefined    
  });
  const [selected, setSelected] = useState({
    province_id: undefined,
    amphure_id: undefined,
    tambon_id: undefined
  });

    const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
    const INITIAL_ZOOM = 12
    const [center, setCenter] = useState(INITIAL_CENTER);

  const commonStyles = {
        // backgroundColor: colors.greenAccent[600],
        // color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        mr: "10px",
        mb: "10px",
        border: 1,
        borderColor: colors.grey[100],
  };

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(' position => ',position.coords)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    })
  },[])

  console.log(' position => ',latitude, longitude)

  useEffect(() => {
      setProvinces(postcodes)
  },[postcodes])

    useEffect(() => {
        dispatch(getFarmergroup())
        console.log('useEffect getFarmergroup is called')
    },[dispatch])

    // useEffect(() => {
    //     dispatch(getCollaborativefarms())
    //     console.log('useEffect getCollaborativefarms is called')
    // },[dispatch])

    useEffect(() => {
        if (provincetagfag == '2') {
            dispatch(getCollaborativefarmByKeyword('มหาสารคาม'))
        } else if (provincetagfag == '3') {
            dispatch(getCollaborativefarmByKeyword('ขอนแก่น'))
        } else if (provincetagfag == '4') {
            dispatch(getCollaborativefarmByKeyword('กาฬสินธุ์'))                        
        } else if (provincetagfag == '5') {
            dispatch(getCollaborativefarmByKeyword('ร้อยเอ็ด'))
        } else {            
            dispatch(getCollaborativefarmByKeyword(provincetarget))
        }
        console.log('useEffect getCollaborativefarms is called')
        console.log('useEffect provincetarget is', provincetarget)
        console.log('useEffect provincetagfag is', provincetagfag)
    },[dispatch,provincetarget,provincetagfag])

    useEffect(() => {
        dispatch(getEntrepreneurherbals())
        console.log('useEffect getEntrepreneurherbals is called')
    },[dispatch])    

    useEffect(() => {
        dispatch(getEntrepreneurmedicals())
        console.log('useEffect getEntrepreneurmedicals is called')
    },[dispatch])    

//   if (provinces) {
//     console.log('provinces',provinces)
//   }

const { result } = useSelector((state) => state.app.farmergroupReducer)

const collaborativefarmReducer = useSelector((state) => state.app.collaborativefarmReducer)
const entrepreneurherbalReducer = useSelector((state) => state.app.entrepreneurherbalReducer)
const entrepreneurmedicalReducer = useSelector((state) => state.app.entrepreneurmedicalReducer)

// if (entrepreneurherbalReducer.result) {
//   console.log('entrepreneurherbalReducer list result',entrepreneurherbalReducer.result)
// }

// if (collaborativefarmReducer.result) {
//   console.log('collaborativefarmReducer list result',collaborativefarmReducer.result)
// }

    const handleCancelButtonClick = () => {
    navigate('/')
   }

   const handleProvinceSelected = (p,v) => {
    console.log('p,v value ',p,v)
    // send province
    setProvincetarget(p) 
    // get province or all 
    setProvincetargetfag(v)
   }


  const DropdownList = ({
    label,
    id,
    list,
    child,
    childsId = [],
    setChilds = []
  }) => {
    const onChangeHandle = (event) => {
      setChilds.forEach((setChild) => setChild([]));
      const entries = childsId.map((child) => [child, undefined]);
      const unSelectChilds = Object.fromEntries(entries);
      console.log('entries',entries)
      console.log('unSelectChilds',unSelectChilds)

      const input = event.target.value;
      console.log('event.target',event.target)
      const input2 = event.target;
      const dependId = input ? Number(input) : undefined;
      const dependId2 = input2 ? Number(input2) : undefined;
      setSelected((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId }));
      setMock((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId2 }));

      console.log('mock',mock)
      console.log('selected[id]',selected[id])
      

      if (!input) return;

      if (child) {
        const parent = list.find((item) => item.id === dependId);
        const { [child]: childs } = parent;
        const [setChild] = setChilds;
        setChild(childs);
        console.log('parent',parent)
        console.log('childs',childs)
        console.log('child',child)
      }

      if (id == 'province_id') {
        const parent = list.find((item) => item.id === dependId);
        console.log('province parent',parent)
        setProvince(parent.name_th)
      }

      if (id == 'amphure_id') {
        const parent = list.find((item) => item.id === dependId);
        console.log('amphure parent',parent)
        setAmphure(parent.name_th)
      }

      if (id == 'tambon_id') {
        const parent = list.find((item) => item.id === dependId);
        const { [child]: childs } = parent;
        const [setChild] = setChilds;
        console.log('parent2',parent)
        console.log('childs2',childs)
        console.log('setChild2',setChilds)   
        setTambon(parent.name_th)  
        setZipcode(parent.zip_code)
      }
    };

    return (
      <>
    <TextField
        fullWidth
        variant="filled"
        type="text"
        label={label}
        select
        // onBlur={handleBlur}
        // onChange={handleChange}
        // value={values.amphoe}
        // name="tambon"                         
        // error={!!touched.amphoe && !!errors.amphoe}
        // helperText={touched.amphoe && errors.amphoe}
        sx={{ gridColumn: "span 2" }}
        value={selected[id]} onChange={onChangeHandle}>
            <option label="โปรดเลือก ..." />
            {list &&
            list.map((item) => (
            <MenuItem key={item.id} value={item.id} >
                {item.name_th}
            </MenuItem>
            ))}
        </TextField>
      </>
    );
  };


    const isNonMobile = useMediaQuery("(min-width:600px)")


    return <Box m="20px">
        <Header title="ลงทะเบียน" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('cid', values.cid)
              formData.append('username', values.cid)
              formData.append('password', values.password)
              formData.append('hno', values.hno)
              formData.append('moo', values.moo)
              formData.append('tambon', tambon1)
              formData.append('amphoe', amphure1)
              formData.append('province', province1)
              formData.append('postcode', zipcode1)
              formData.append('tel', values.tel)
              formData.append('status', 'false')
              formData.append('reject', 'false')
              formData.append('latitude', center.lat)
              formData.append('longitude', center.lng)
              // เลือกประเภทการลงทะเบียน 1 เกตรกร 2 ผู้ประกอบการ 3 ปราชญ์
              formData.append('register_type',values.register_type)
                // ใช้เก็บข้อมูลปราชญ์
              formData.append('register_data',values.register_data) 
              // เก็บข้อมูลการลงทะเบียน เกษตรกร 
              formData.append('farmer_type',values.farmer_type)              
              formData.append('collaborativefarmId',values.collaborativefarmId)
              // เก็บข้อมูลการลงกลุ่มเกษตร
              formData.append('farmergroupId',values.farmergroupId)
              // เก็บข้อมูลการลงทะเบียน ผู้ประกอบการ
              formData.append('entrepreneur_type',values.entrepreneur_type)

              formData.append('entrepreneurherbal_data',values.entrepreneurherbal)
              formData.append('entrepreneurtraditionalmedicine_data',values.entrepreneurtraditionalmedicine)

              console.log('Registration form values: ',values)
                dispatch(addFarmersRegister(navigate, formData))
               setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
            // validateOnMount
            >
            {({ values, errors, touched, isSubmitting,isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    {console.log('dirty: ', dirty)}
                    {console.log('isValid: ', isValid)}
                    {console.log('isSubmitting: ', isSubmitting)}
                    <Box sx={{mt:"5px"}}>
                        <Divider sx={{ mb: '10px'}}/>
                            <FormControl>
                            <RadioGroup
                                row
                                role="group"
                                aria-labelledby="register-selection-label"
                                defaultValue="1"
                                >
                                    <FormControlLabel control={<Field type="radio" name="register_type" value="1" />} label="เกษตรกร" />
                                    <FormControlLabel control={<Field type="radio" name="register_type" value="2" />} label="ผู้ประกอบการ" />    
                                    <FormControlLabel control={<Field type="radio" name="register_type" value="3" />} label="ปราชญ์สมุนไพร" />    
                                    {/* <FormControlLabel control={<Field type="radio" name="register_type" value="4" />} label="นักวิชาการ" />     */}
                                </RadioGroup>  
                            </FormControl>                          
                    </Box> 

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
                            label="ชื่อ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstname}
                            name="firstname"
                            error={!!touched.firstname && !!errors.firstname}
                            helperText={touched.firstname && errors.firstname}
                            sx={{ gridColumn: "span 2"}}
                            
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="นามสกุล"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastname}
                            name="lastname"
                            error={!!touched.lastname && !!errors.lastname}
                            helperText={touched.lastname && errors.lastname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัสบัตรประชาชน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cid}
                            name="cid"
                            error={!!touched.cid && !!errors.cid}
                            helperText={touched.cid && errors.cid}
                            sx={{ gridColumn: "span 2" }}
                        />                         
                        {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อเข้าระบบ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cid}
                            name="username"
                            disabled
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2" }}
                        /> */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="รหัสผ่าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }}
                        />   
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="ยืนยันรหัสผ่าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password2}
                            name="password2"
                            error={!!touched.password2 && !!errors.password2}
                            helperText={touched.password2 && errors.password2}
                            sx={{ gridColumn: "span 2" }}
                        />   
       
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="บ้านเลขที่"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.hno}
                            name="hno"
                            error={!!touched.hno && !!errors.hno}
                            helperText={touched.hno && errors.hno}
                            sx={{ gridColumn: "span 2" }}
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
                            sx={{ gridColumn: "span 2" }}
                        />        

                         <DropdownList
                            label="จังหวัด"
                            id="province_id"
                            list={provinces}
                            child="amphure"
                            childsId={["amphure_id", "tambon_id"]}
                            setChilds={[setAmphures, setTambons]}
                        />
                        <DropdownList
                            label="อำเภอ"
                            id="amphure_id"
                            list={amphures}
                            child="tambon"
                            childsId={["tambon_id"]}
                            setChilds={[setTambons]}
                        />
                        <DropdownList label="ตำบล" id="tambon_id" list={tambons} />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัสไปรษณีย์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={zipcode1}
                            name="postcode"     
                            disabled                      
                            error={!!touched.postcode && !!errors.postcode}
                            helperText={touched.postcode && errors.postcode}
                            sx={{ gridColumn: "span 2" }}
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
                            sx={{ gridColumn: "span 2" }}
                        />  
 

                        {/* เกตษตรกร */}
                        
                        { values.register_type == 1 ? (      
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="กลุ่มเกษตรกร"
                            select
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.farmergroup}
                            name="farmergroup"
                            error={!!touched.farmergroup && !!errors.farmergroup}
                            helperText={touched.farmergroup && errors.farmergroup}
                            defaultValue=""
                            sx={{ gridColumn: "span 2" }} >
                            { result && result.map((farmergroup,key) => (
                            <MenuItem key={key} value={key} >
                                {farmergroup.id+'--'+farmergroup.farmergroupname+'--'+farmergroup.province}
                            </MenuItem>  
                           ))} 
                            <MenuItem value="no" >
                                ไม่มีในรายการ
                            </MenuItem>                             
                        </TextField>                    
                        ) : undefined   }   

                    { (values.register_type == 1) ? (   
                    <Box sx={{mt:"5px", ...commonStyles,  borderRadius: 1}} >
                        <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>
                            ประเภทแปลง
                        </Typography>                    
                            <FormControl>
                            <RadioGroup
                                row
                                role="farmer_type_group"
                                aria-labelledby="province-selection-label"
                                defaultValue="1"
                                handleChange={handleProvinceSelected(province1,values.farmer_type)}
                                >
                                    <FormControlLabel control={<Field type="radio" name="farmer_type" value="1" />} label="เกษตรกรแปลงเดี่ยว" />
                                    <FormControlLabel control={<Field type="radio" name="farmer_type" value="2" />} label="กลุ่มกษตรกรแปลงใหญ่" />

                                </RadioGroup>  
                            </FormControl>                          
                    </Box>    
                    ) : undefined   }                                            

                { (values.register_type == 1 && values.farmer_type == "1") ? (   
                    <Box sx={{mt:"5px",  ...commonStyles, borderRadius: 1}}>
                        <Box sx={{mt:"5px"}} >
                        <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>
                            โปรดระบุพิกัดแปลง
                        </Typography>
                        <FormControl  sx={{m:"5px"}}>
                            <RadioGroup
                                row
                                role="map_show_group"
                                aria-labelledby="province-selection-label"
                                defaultValue="1"
                                handleChange={handleProvinceSelected(province1,values.map_show)}
                                >
                                    <FormControlLabel control={<Field type="checkbox" name="map_show" value="1" />} label="แสดงแผนที่" />
                                </RadioGroup>  
                        </FormControl>                         
                        </Box>
                        <Box  display="flex">
                        <TextField
                            variant="filled"
                            size="small"
                            type="text"
                            label="ละติจูด"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={latitude}
                            name="latitude"                        
                            error={!!touched.latitude && !!errors.latitude}
                            helperText={touched.latitude && errors.latitude}
                            sx={{ gridColumn: "span 1", width: "200px", mr: "20px"}}
                        />  
                        <TextField
                            variant="filled"
                            size="small"
                            type="text"
                            label="ลองจิจูด"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={longitude}
                            name="longitude"                        
                            error={!!touched.longitude && !!errors.longitude}
                            helperText={touched.longitude && errors.longitude}
                            sx={{ gridColumn: "span 1", width: "200px"  }}
                        />    
                        </Box>     

                    </Box> 
                    ) : undefined   } 

                { (values.register_type == 1 && values.farmer_type =="1" && values.map_show == "1") ? ( 
                    <Box height="40vh"  sx={{ gridColumn: "span 4" }} >
                        <APIProvider apiKey={server.GOOGLEMAPS_API}>
                            {/* <Typography>
                                Google Maps { center.lat+' '+center.lng}
                            </Typography> */}
                                <Map mapId={server.GOOGLEMAPS_ID}
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

                { (values.register_type == 1 && values.farmer_type == "2") ? (   
                    <Box sx={{mt:"5px",  ...commonStyles, borderRadius: 1}} >
                        <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>
                            แปลงอยู่ในพื้นที่จังหวัด
                        </Typography>                        
                            <FormControl>
                            <RadioGroup
                                row
                                role="province_selected_group"
                                aria-labelledby="province-selection-label"
                                defaultValue="1"
                                handleChange={handleProvinceSelected(province1,values.province_selected)}
                                >
                                    <FormControlLabel control={<Field type="radio" name="province_selected" value="2" />} label="มหาสารคาม" />     
                                    <FormControlLabel control={<Field type="radio" name="province_selected" value="3" />} label="ขอนแก่น" />     
                                    <FormControlLabel control={<Field type="radio" name="province_selected" value="4" />} label="กาฬสินธุ์" />     
                                    <FormControlLabel control={<Field type="radio" name="province_selected" value="5" />} label="ร้อยเอ็ด" />     
                                </RadioGroup>  
                            </FormControl>                          
                    </Box> 
                    ) : undefined   }                     

                    { (values.register_type == 1 && values.farmer_type == "2" ) ? (      
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="เลือกพื้นที่แปลงใหญ่"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.collaborativefarm}
                        name="collaborativefarm"
                        error={!!touched.collaborativefarm && !!errors.collaborativefarm}
                        helperText={touched.collaborativefarm && errors.collaborativefarm}
                        defaultValue=""
                        sx={{ gridColumn: "span 2" }} >                                                  
                        {   collaborativefarmReducer.result &&
                            collaborativefarmReducer.result.map((item) => (
                             <MenuItem key={item.id} value={item.id} >
                                {item.id+'--'+item.name+'--'+item.province}
                            </MenuItem>
                            ))
                        }
                            <MenuItem value="no" >
                                ไม่มีในรายการ
                            </MenuItem>                          
                        </TextField>                           
                    ) : undefined   }  

                        {/* ผู้ประกอบการ */}

                        { (values.register_type == 2) ? (      
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ผู้ประกอบการ"
                            select
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.entrepreneur_type}
                            name="entrepreneur_type"
                            error={!!touched.entrepreneur_type && !!errors.entrepreneur_type}
                            helperText={touched.entrepreneur_type && errors.entrepreneur_type}
                            defaultValue=""
                            sx={{ gridColumn: "span 2" }} >                                                      
                            <MenuItem key="1" value="1" >
                                ผู้ประกอบการผลิตภัณฑ์สมุนไพร
                            </MenuItem>
                            <MenuItem key="2" value="2" >
                                ผู้ประกอบการด้านการแพทย์แผนไทย/สมุนไพร
                            </MenuItem>                                         
                        </TextField>                    
                        ) : undefined   }       

                        { (values.register_type == 2 && values.entrepreneur_type == "1") ? (      
                        <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ผู้ประกอบการผลิตภัณฑ์สมุนไพร"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.entrepreneurherbal}
                        name="entrepreneurherbal"
                        error={!!touched.entrepreneurherbal && !!errors.entrepreneurherbal}
                        helperText={touched.entrepreneurherbal && errors.entrepreneurherbal}
                        defaultValue=""
                        sx={{ gridColumn: "span 2" }} >
                        {   entrepreneurherbalReducer &&
                            entrepreneurherbalReducer.result.map((item) => (
                             <MenuItem key={item.id} value={item.id} >
                                {item.id+'--'+item.name+'--'+item.province}
                            </MenuItem>
                            ))
                        }
                    </TextField>                     
                        ) : undefined   }                          

                        { (values.register_type == 2 && values.entrepreneur_type == "2") ? (      
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ผู้ประกอบการด้านการแพทย์แผนไทย/สมุนไพร"
                            select
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.entrepreneurtraditionalmedicine}
                            name="entrepreneurtraditionalmedicine"
                            error={!!touched.entrepreneurtraditionalmedicine && !!errors.entrepreneurtraditionalmedicine}
                            helperText={touched.entrepreneurtraditionalmedicine && errors.entrepreneurtraditionalmedicine}
                            defaultValue=""
                            sx={{ gridColumn: "span 2" }} >
                            {entrepreneurmedicalReducer &&
                             entrepreneurmedicalReducer.result.map((item) => (
                             <MenuItem key={item.id} value={item.id} >
                                {item.id+'--'+item.name+'--'+item.province}
                            </MenuItem>
                            ))
                            }
                        </TextField>                    
                        ) : undefined   }   

                        { (values.register_type == 3 || values.register_type == 4) ? (      
                        <TextField
                            multiline={true}
                            rows={3}                        
                            fullWidth
                            variant="filled"
                            type="text"
                            label="โปรดระบุทักษะหรือความเชี่ยวชาญ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.register_data}
                            name="register_data"
                            error={!!touched.register_data && !!errors.register_data}
                            helperText={touched.register_data && errors.register_data}
                            sx={{ gridColumn: "span 2" }}
                        />        
                        ) : undefined   } 


                    </Box>

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
                          gridColumn: "span 2"
                      }}                    
                    >
                        <Button  
                            type='submit'
                            disabled={!(dirty && isValid)}
                            // disabled={isSubmitting}
                            // disabled={true}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "20px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.blueAccent[700]}
                            }}
                        >
                            ลงทะเบียน
                        </Button>
                          <Button  
                              onClick={handleCancelButtonClick}
                              type='button'
                              sx={{
                                  backgroundColor: colors.greenAccent[600],
                                  color: colors.grey[100],
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
    </Box >
}

export default Registration