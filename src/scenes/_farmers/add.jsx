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
    Typography,
    Tabs,
    Tab,
    RadioGroup,
    Radio,
    Divider,
    FormControlLabel,
    FormControl,
    IconButton,
    useMediaQuery,
    Autocomplete
  } from '@mui/material'

import { postcodes } from "../../data/thPostcode"

// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';


import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
// import { addFarmersRegister } from '../../actions/register.action'
import { addFarmer } from '../../actions/farmer.action'
import { getHerbals } from '../../actions/herbal.action'
import { getFarmergroup } from '../../actions/farmergroup.action'
import { getCollaborativefarms, getCollaborativefarmByKeyword } from '../../actions/collaborativefarm.action.js'
import { getEntrepreneurherbals } from '../../actions/entrepreneurherbal.action'
import { getEntrepreneurmedicals } from '../../actions/entrepreneurmedical.action'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import { ConstructionOutlined, TroubleshootOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';

import { server } from '../../constants/index'
import {
    APIProvider,
    Map,
    Marker,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'
import ConfirmBox from 'components/ConfirmBox';
import TableHerbal from "scenes/farmers/TableHerbal";
import TableFarmerGroup from "scenes/farmers/TableFarmerGroup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickerValue from 'components/DatePicker'

const googleMapsKey = process.env.REACT_APP_GOOGLEMAPS_API
const googleMapsId = process.env.REACT_APP_GOOGLEMAPS_ID

const initialValues = {
    firstname: "",
    lastname: "",
    province_selected: "2",
    farmer_type: "1",
    register_type: "1",
    entrepreneur_type: "0",
    farmergroupId: "",
    collaborativefarmId: "",
    // entrepreneurtraditionalmedicine: "",
    // register_data: "",
    // entrepreneurherbal: "",
    // entrepreneurherbal_data: "",
    // entrepreneurtraditionalmedicine_data: "",
    // farmer_data: "",
    // collaborativefarm: "",    
    // latitude: "16.1850896",
    // longitude: "103.3026461",
}

const userSchema = yup.object().shape({
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),

    password: yup.string().required("ต้องใส่").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "ต้องประกอบด้วยอักษรภาษาอังกฤษตัวใหญ่ ตัวเล็ก และตัวเลข รวมกันต้องไม่น้อยกว่า 8 ตัวอักษร"
      ),
    password2: yup.string().required("ต้องใส่").oneOf([yup.ref('password'), null], 'รหัสผ่านต้องเหมือนกัน'),
    cid: yup.string().required("ต้องใส่").matches(/^[0-9]{13}$/,"ต้องประกอบด้วยตัวเลข 13 หลัก"),    
    hno: yup.string().required("ต้องใส่"),
    moo: yup.string().required("ต้องใส่"),
    tel: yup.string().required("ต้องใส่"),

})

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function FarmerTapProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



const _FamerAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [farmerId, setFarmerId] = useState(null)

    const message = 'กรุณายืนยันการเพิ่มข้อมูล'


//   const [latitude, setLatitude] = useState(16.1850896);
//   const [longitude, setLongitude] = useState(103.3026461);

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

  const [value, setValue] = useState(0);


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
        dispatch(getHerbals())
        console.log('useEffect getHerbals is called')
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
const herbalReducer = useSelector((state) => state.app.herbalReducer)

const [selectedTab, setSelectedTab] = useState(0);
const tabCount = 3;

    const herbalProps = {
        options: herbalReducer && herbalReducer.result,
        getOptionLabel: (options) => options.id + " - " + options.herbalname
    }
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmitButtonClick = () => {
        setOpen(true)
   }

    const handleTabNext = () => {
        // setSelectedTab((selectedTab + 1) % tabCount )
        // console.log('tab => ',selectedTab)
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
    formData.append('status', 'true')
    formData.append('reject', 'false')
    formData.append('herbals', values.herbals)
    formData.append('latitude', values.use_map == '1' ? center.lat : values.latitude)
    formData.append('longitude', values.use_map == '1' ? center.lng : values.longitude)    
    // เลือกประเภทการลงทะเบียน 1 เกตรกร 2 ผู้ประกอบการ 3 ปราชญ์
    formData.append('register_type',values.register_type)
      // ใช้เก็บข้อมูลปราชญ์
    // formData.append('register_data',values.register_data) 
    // เก็บข้อมูลการลงทะเบียน เกษตรกร 
    formData.append('farmer_type',values.farmer_type)              
    // เก็บข้อมูลการลงกลุ่มเกษตร
    formData.append('farmergroupId',values.farmergroupId)
    formData.append('collaborativefarmId',values.collaborativefarmId)
    // เก็บข้อมูลการลงทะเบียน ผู้ประกอบการ
    formData.append('entrepreneur_type',values.entrepreneur_type)
    // formData.append('entrepreneurherbal_data',values.entrepreneurherbal)
    // formData.append('entrepreneurtraditionalmedicine_data',values.entrepreneurtraditionalmedicine)

    console.log('Registration form values: ',values)
    dispatch(addFarmer(navigate, formData))
    setSubmitting(false)
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
        sx={{ gridColumn: "span 1" }}
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

    return <>
    <Box m="20px">
        <Header title="เพิ่มเกษตรกร" />
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example"  >
                    <Tab label="เกษตรกร" {...FarmerTapProps(0)} />
                    <Tab label="มาตราฐาน" {...FarmerTapProps(1)} />
                    <Tab label="เกี่ยวกับสมุนไพร" {...FarmerTapProps(2)} />
                    <Tab label="การเป็นสมาชิก" {...FarmerTapProps(3)} />
                </Tabs>
            </Box>            
        </Box>

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
            // validateOnMount
            >
            {({ values, errors, touched, isSubmitting, isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                <Box>
                {/* tab1 */}
                <CustomTabPanel value={value} index={0}>
                    <Typography>
                        ข้อมูลเบื้องต้น
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
                        label="ชื่อ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstname}
                        name="firstname"
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        sx={{ gridColumn: "span 1"}}
                        
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
                    />                         
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
                        sx={{ gridColumn: "span 1" }}
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
                        sx={{ gridColumn: "span 1" }}
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
                </Box>

                </CustomTabPanel>    
                {/* tab2 */}
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
                    {/* <TextField
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
                    /> */}

                    <Box display="flex" alignSelf="center" alignItems={'center'}>
                    <DatePickerValue label="วันที่ได้รับ" />
                    </Box>

                    <DatePickerValue label="วันหมดอายุ" />


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

                 
                   
                </CustomTabPanel>                                  
                {/* tab3 */}
                <CustomTabPanel value={value} index={2}>
                    <Typography>
                        การปลูกสมุนไพร
                    </Typography>
                    <Box mt='40px'>
                    <Box sx={{ m: '5px'}} >
                        {/* <Typography>
                            รายการสมุนไพร
                        </Typography> */}
                        <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
                        <Box fullWidth sx={{ gridColumn: "span 4" }}>
                            <TableHerbal />
                        </Box>

                    </Box>                         
                    </Box>
                 </Box>   


                </CustomTabPanel>
                 {/* tab4 */}
                <CustomTabPanel value={value} index={3}>
                    <Typography>
                        การเป็นสมาชิก
                    </Typography>
                        <Box mt='40px'>
                        {/* <Box sx={{ m: '5px'}} >
                        <Typography>
                            ข้อมูลกลุ่มเกษตรกร
                        </Typography>
                        </Box>                             */}
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            }}
                        >
                            <Box fullWidth sx={{ gridColumn: "span 4" }}>
                                <TableFarmerGroup />
                            </Box>

                        </Box>  
                        </Box> 

                        <Box mt='40px'>
                        <Box sx={{ m: '5px'}} >
                        <Typography>
                            กลุ่มเกษตรกรแปลงใหญ่
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

                            <Box>
                                    <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="เลือกพื้นที่แปลงใหญ่"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.collaborativefarmId}
                                    name="collaborativefarmId"
                                    error={!!touched.collaborativefarmId && !!errors.collaborativefarmId}
                                    helperText={touched.collaborativefarmId && errors.collaborativefarmId}
                                    defaultValue=""
                                    sx={{ gridColumn: "span 1" }} >                                                  
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
                            </Box>  
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
                        { value == '3' ?
                            <Button  
                            onClick={handleSubmitButtonClick}
                            // type='button'
                            type='submit'
                            disabled={!(dirty && isValid)}
                            // disabled={isSubmitting}
                            // disabled={true}
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
                        :  
                            <Button  
                                // type='button'
                                onClick={handleTabNext}
                                type='submit'
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
                                ถัดไป
                            </Button>  
                         }

                        { value == '0' ?                      
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
                        : undefined }
                    </Box>    
                </Box>   
                </Box>
                </Form>
            )}
        </Formik>
        <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        message={message}
        // title={farmerId}
        />        
    </Box >
</>
}

export default _FamerAdd