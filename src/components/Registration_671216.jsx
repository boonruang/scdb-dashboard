import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"
const initialValues = {
    firstname: "",
    lastname: "",
    status: "",
    register_type: "",
}

const userSchema = yup.object().shape({
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
    username: yup.string().required("ต้องใส่"),
    // password: yup.string().required("ต้องใส่").matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //     "ถาษาอังกฤษไม่น้อยกว่า 8 ตัวอักษร และประกอบด้วย 1 ตัวใหญ่ 1 ตัวเล็ก 1 ตัวเลข และ 1 อักขณะพิเศษ (!,@,#,$,&)"
    //   ),
    password: yup.string().required("ต้องใส่").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "ต้องประกอบด้วยอักษรภาษาอังกฤษตัวใหญ่ ตัวเล็ก และตัวเลข รวมกันต้องไม่น้อยกว่า 8 ตัวอักษร "
      ),
    password2: yup.string().required("ต้องใส่").oneOf([yup.ref('password'), null], 'รหัสผ่านต้องเหมือนกัน'),
    cid: yup.string().required("ต้องใส่"),
    hno: yup.string().required("ต้องใส่"),
    moo: yup.string().required("ต้องใส่"),
    tambon: yup.string().required("ต้องใส่"),
    amphoe: yup.string().required("ต้องใส่"),
    province: yup.string().required("ต้องใส่"),
    postcode: yup.string().required("ต้องใส่"),
    tel: yup.string().required("ต้องใส่"),
    register_type: yup.string().required("ต้องเลือก"),
})


const Registration = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [registerType, setRegisterType] = useState('1');
  

   const handleCancelButtonClick = () => {
    navigate('/')
   }

   const handleRadioButtonChange = (event) => {
    setRegisterType(event.target.value);
    // dispatch(setPlantingSelection(event.target.value))
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
              formData.append('username', values.username)
              formData.append('password', values.password)
              formData.append('cid', values.cid)
              formData.append('hno', values.hno)
              formData.append('moo', values.moo)
              formData.append('tambon', values.tambon)
              formData.append('amphoe', values.amphoe)
              formData.append('province', values.province)
              formData.append('postcode', values.postcode)
              formData.append('tel', values.tel)
              formData.append('status', 'false')
              formData.append('reject', 'false')
              formData.append('register_type',values.register_type)
              console.log('Registration form values: ',values)
                dispatch(addFarmersRegister(navigate, formData))
               setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
            // validateOnMount
            >
            {({ values, errors, touched, isSubmitting,isValid, isValidating, dirty, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    {console.log('isValid: ', isValid)}
                    {console.log('isSubmitting: ', isSubmitting)}
                    <Box sx={{mt:"5px"}}>
                        <Divider sx={{ mb: '10px'}}/>
                            <FormControl>
                            <RadioGroup
                                row="true" 
                                role="group"
                                aria-labelledby="register-selection-label"
                                defaultValue="1"
                                >
                                    <FormControlLabel control={<Field type="radio" name="register_type" value="1" />} label="เกษตรกร" />
                                    <FormControlLabel control={<Field type="radio" name="register_type" value="2" />} label="ปราชญ์สมุนไพร" />    
                                    <FormControlLabel control={<Field type="radio" name="register_type" value="3" />} label="ผู้ประกอบการ" />    
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
                            sx={{ gridColumn: "span 2" }}
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
                            label="ชื่อเข้าระบบ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2" }}
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
                            label="รหัสบัตรประชาชน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cid}
                            name="cid"
                            error={!!touched.cid && !!errors.cid}
                            helperText={touched.cid && errors.cid}
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
                            sx={{ gridColumn: "span 2" }}
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
                            sx={{ gridColumn: "span 2" }}
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
                            sx={{ gridColumn: "span 2" }}
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