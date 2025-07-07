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

import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { resetFarmerpassword } from '../actions/register.action'
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"
const initialValues = {
    firstname: "",
    lastname: "",
    status: false
}

const userSchema = yup.object().shape({
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
    username: yup.string().required("ต้องใส่"),
    cid: yup.string().required("ต้องใส่"),
    hno: yup.string().required("ต้องใส่"),
    moo: yup.string().required("ต้องใส่"),
    tambon: yup.string().required("ต้องใส่"),
    amphoe: yup.string().required("ต้องใส่"),
    province: yup.string().required("ต้องใส่"),
    tel: yup.string().required("ต้องใส่"),
})


const Forgetpassword = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

//   const farmerReducer = useSelector((state) => state.app.farmerReducer)

   const handleCancelButtonClick = () => {
    navigate('/')
   }
  

    const isNonMobile = useMediaQuery("(min-width:600px)")

    return <Box m="20px">
        <Header title="ขอรหัสผ่านใหม่" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('username', values.username)
              formData.append('cid', values.cid)
              formData.append('hno', values.hno)
              formData.append('moo', values.moo)
              formData.append('tambon', values.tambon)
              formData.append('amphoe', values.amphoe)
              formData.append('province', values.province)
              formData.append('tel', values.tel)
              formData.append('reset', 'true')
              formData.append('reject', 'false')
              console.log('values',values)
              dispatch(resetFarmerpassword(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
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
                        {/* <TextField
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
                        />    */}
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
                            // disabled={isSubmitting}
                            disabled={!(dirty && isValid)}
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
                            ส่งข้อมูล
                        </Button>
                          <Button  
                              onClick={handleCancelButtonClick}
                              type='submit'
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
                </form>
            )}
        </Formik>
    </Box >
}

export default Forgetpassword