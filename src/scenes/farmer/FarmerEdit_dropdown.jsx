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

import { postcodes } from "../../data/thPostcode"
import { Formik, Field, Form, FieldArray } from 'formik'
import { TextField as txtField } from 'formik-material-ui'
import * as yup from 'yup'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
// import { addFarmersRegister } from '../../actions/register.action'
import { updateFarmer } from '../../actions/farmer.action'
import { getHerbals } from '../../actions/herbal.action'
import { getFarmergroup } from '../../actions/farmergroup.action'
import { getCollaborativefarms } from '../../actions/collaborativefarm.action.js'
import Header from "../../components/Header"
import {
    APIProvider,
    Map,
    Marker,
} from '@vis.gl/react-google-maps'
import MessageBox from 'components/MessageBox'
import { useLocation, useNavigate } from 'react-router-dom'

const googleMapsKey = process.env.REACT_APP_GOOGLEMAPS_API
const googleMapsId = process.env.REACT_APP_GOOGLEMAPS_ID

const emptyPlantation = { herbalId: 0, area: '', output: 0}
const emptyFarmergroup = { farmergroupId: 0 }
const emptyCollaborativefarm = { collaborativefarmId: 0 }

const initialValues = {
    firstname: "",
    lastname: "",
    register_type: "1",
    herbals: [emptyPlantation],
    farmergroups: [emptyFarmergroup],
    collaborativefarms: [emptyCollaborativefarm]
}

const userSchema = yup.object().shape({
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),

    // password: yup.string().required("ต้องใส่").matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //     "ต้องประกอบด้วยอักษรภาษาอังกฤษตัวใหญ่ ตัวเล็ก และตัวเลข รวมกันต้องไม่น้อยกว่า 8 ตัวอักษร"
    //   ),
    // password2: yup.string().required("ต้องใส่").oneOf([yup.ref('password'), null], 'รหัสผ่านต้องเหมือนกัน'),
    // cid: yup.string().required("ต้องใส่").matches(/^[0-9]{13}$/,"ต้องประกอบด้วยตัวเลข 13 หลัก"),    
    // hno: yup.string().required("ต้องใส่"),
    // moo: yup.string().required("ต้องใส่"),
    // tel: yup.string().required("ต้องใส่"),

})


const FarmerEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  const message = 'กรุณายืนยันการปรับปรุงข้อมูล'

  console.log('location.state.row',location.state.row)

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

  const [herbalResult, setHerbalResult] = useState([])
  const [farmergroupResult, setFarmergroupResult] = useState([])
  const [collaborativefarmResult, setCollaborativefarmResult] = useState([])
  const [farmerResult, setFarmerResult] = useState([])

  const [open, setOpen] = useState(false)
  const [farmerId, setFarmerId] = useState(null)
  
  const [avalue, valuechange] = useState(null)
  const [data, setData] = useState([])

  const commonStyles = {
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        mr: "10px",
        mb: "10px",
        border: 1,
        borderColor: colors.grey[100],
  };


  const herbalReducer = useSelector((state) => state.app.herbalReducer)
  const farmergroupReducer = useSelector((state) => state.app.farmergroupReducer)
  const collaborativefarmReducer = useSelector((state) => state.app.collaborativefarmReducer)


    useEffect(() => {
        setProvinces(postcodes)
    },[postcodes])    

    useEffect(() => {
        dispatch(getHerbals())
        console.log('useEffect getHerbals is called')
    },[dispatch])    

    useEffect(() => {
        dispatch(getFarmergroup())
        console.log('useEffect getFarmergroup is called')
    },[dispatch])

    useEffect(() => {
        setHerbalResult(herbalReducer.result)
    },[herbalReducer.result])

    useEffect(() => {
        setFarmergroupResult(farmergroupReducer.result)
    },[farmergroupReducer.result]) 
    
    useEffect(() => {
        dispatch(getCollaborativefarms())
        console.log('useEffect getCollaborativefarms is called')
    },[dispatch])
    
    useEffect(() => {
        setCollaborativefarmResult(collaborativefarmReducer.result)
    },[collaborativefarmReducer.result]) 


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
    formData.append('id', values.id)
    formData.append('firstname', values.firstname)
    formData.append('lastname', values.lastname)
    formData.append('cid', values.cid)
    formData.append('username', values.cid)
    formData.append('password', values.password)
    formData.append('hno', values.hno)
    formData.append('moo', values.moo)
    formData.append('cert', values.cert)
    formData.append('tambon', tambon1)
    formData.append('amphoe', amphure1)
    formData.append('province', province1)
    formData.append('postcode', zipcode1)
    formData.append('tel', values.tel)
    formData.append('status', 'true')
    formData.append('reject', 'false')
    formData.append('latitude', values.use_map == '1' ? center.lat : values.latitude)
    formData.append('longitude', values.use_map == '1' ? center.lng : values.longitude)   
    formData.append('farmergroups', JSON.stringify(values.farmergroups))
    formData.append('herbals', JSON.stringify(values.herbals))     
    formData.append('collaborativefarms', JSON.stringify(values.collaborativefarms))     
    console.log('Registration form values: ',values)
    dispatch(updateFarmer(navigate, formData))
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

    const handleSubmitButton = () => {
        setOpen(true)
    }    
    

    return <>
    <Box m="20px">
        <Header title="ปรับปรุงข้อมูลเกษตรกร" />
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={location.state.row}
            validationSchema={userSchema}
            >
            {({ values, errors, touched, isSubmitting, isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                <Box>
                {/* tab1 */}
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
                        label="รหัส"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.id}
                        name="id"
                        error={!!touched.id && !!errors.id}
                        helperText={touched.id && errors.id}
                        sx={{ gridColumn: "span 1"}}
                    />                        

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

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="มาตรฐานที่ได้รับ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cert}
                        name="cert"
                        error={!!touched.cert && !!errors.cert}
                        helperText={touched.cert && errors.cert}
                        sx={{ gridColumn: "span 1"}}
                        
                    />                    

                    </Box>                        
                </Box>

            {/* Add FieldArray here */}
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
                                name={`herbals[${index}].farmerherbals.id`} 
                                defaultValue=""
                                component={txtField}
                                sx={{ gridColumn: "span 2" }} >
                                { herbalResult && herbalResult.map((herbal,key) => (
                                <MenuItem key={key} value={herbal.id} >
                                    {herbal.herbalname}
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
                                name={`herbals[${index}].farmerherbals.area`} 
                                sx={{ gridColumn: "span 2" }}
                                /> 
                      
                            <Field
                                fullWidth
                                variant="filled"
                                type="text"
                                component={txtField}
                                label="ปริมาณการผลิต (กก./ปี)"
                                name={`herbals[${index}].farmerherbals.output`} 
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
   

                 {/* Membership of farmergroups */}

                    <FieldArray name='farmergroups'>
                     {({push, remove, }) => (
                    <React.Fragment >
                    <Box mt="20px" >
                        <Typography>
                            ข้อมูลสมาชิกกลุ่มเกษตรกร
                        </Typography>            
                    </Box>            

                    <Box mt="10px"display="flex" sx={{ gridColumn: "span 2" }}>
                        <Button  disabled={isSubmitting} onClick={() => push(emptyFarmergroup)}
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
                      {values.farmergroups.map((_, index) => (                   
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
                                label="กลุ่มเกษตรกร"
                                select
                                name={`farmergroups[${index}].id`} 
                                defaultValue=""
                                component={txtField}
                                sx={{ gridColumn: "span 2" }} >
                                { farmergroupResult && farmergroupResult.map((farmergroup,key) => (
                                <MenuItem key={key} value={farmergroup.id} >
                                    {farmergroup.id} {farmergroup.farmergroupname}
                                </MenuItem>  
                            ))} 
                                <MenuItem value="no" >
                                    ไม่มีในรายการ
                                </MenuItem>                             
                            </Field>                              
                          
                            <Box display="flex" justifySelf="center" sx={{ gridColumn: "span 2" }}>
                                <Button  disabled={isSubmitting} onClick={() => push(emptyFarmergroup)}
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
   
                    {/* Membership of collaborativefarms */}

                    <FieldArray name='collaborativefarms'>
                     {({push, remove, }) => (
                    <React.Fragment >
                    <Box mt="20px" >
                        <Typography>
                            ข้อมูลสมาชิกกลุ่มแปลงใหญ่
                        </Typography>            
                    </Box>            

                    <Box mt="10px"display="flex" sx={{ gridColumn: "span 2" }}>
                        <Button  disabled={isSubmitting} onClick={() => push(emptyCollaborativefarm)}
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
                      {values.collaborativefarms.map((_, index) => (                   
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
                                label="กลุ่มเกษตรกร"
                                select
                                name={`collaborativefarms[${index}].id`} 
                                defaultValue=""
                                component={txtField}
                                sx={{ gridColumn: "span 2" }} >
                                { collaborativefarmResult && collaborativefarmResult.map((collaborativefarm,key) => (
                                <MenuItem key={key} value={collaborativefarm.id} >
                                    {collaborativefarm.id} {collaborativefarm.name}
                                </MenuItem>  
                            ))} 
                                <MenuItem value="no" >
                                    ไม่มีในรายการ
                                </MenuItem>                             
                            </Field>                              
                          
                            <Box display="flex" justifySelf="center" sx={{ gridColumn: "span 2" }}>
                                <Button  disabled={isSubmitting} onClick={() => push(emptyCollaborativefarm)}
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
                </Box>                  */}

                    <Box mt='20px'>
                        <Box mt="10px" mb="10px" sx={{ m: '5px'}} >
                            <Typography>
                                พิกัดแปลงของเกษตรกร
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
            {/* end fieldarray */}

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
                        ml: "30px",
                        gridColumn: "span 1"
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
                </Box>
            </Form>
            )}
        </Formik>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />      
    </Box >
</>
}

export default FarmerEdit