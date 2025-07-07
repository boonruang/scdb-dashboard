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
    Typography,
    Modal,
    Snackbar
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
import { addFarmer } from '../actions/farmer.action'
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"
import { addFarmersRegister } from 'actions/farmer.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
const initialValues = {
    firstname: "",
    lastname: "",
    // status: false
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
    tambon: yup.string().required("ต้องใส่"),
    amphoe: yup.string().required("ต้องใส่"),
    province: yup.string().required("ต้องใส่"),
    postcode: yup.string().required("ต้องใส่").matches(/^[0-9]{5}$/,"ต้องประกอบด้วยตัวเลข 5 หลัก"),
    tel: yup.string().required("ต้องใส่"),
}) // end yup


const Registration = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const thisDate = new Date()

  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
    navigate('/login')
  }

  const farmerReducer = useSelector((state) => state.app.farmerReducer)

  const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
      return
      }
      setSnackBarOpen(false)
  }
  
  const MuiSnackbar = ({message,duration}) => {
  
      const action = (
      <React.Fragment>
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
          ปิด
          </Button>
          <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
          >
          <CloseIcon fontSize="small" />
          </IconButton>
      </React.Fragment>
      );    
  
      return (
      <React.Fragment>
      <Snackbar message={message}
          autoHideDuration={duration}
          open={snackBarOpen}
          onClose={handleSnackbarClose}
          severity="success"
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
          }}
          action={action}
      /> 
      </React.Fragment> 
      )
  } 

   const handleRegister = () => {
       setSnackBarOpen(true)
       if (farmerReducer?.isRegisterSuccess === true ) {
           setOpen(true);
        }
   }

   const handleCancelButtonClick = () => {
    navigate('/')
   }
  
    const isNonMobile = useMediaQuery("(min-width:600px)")

    return <Box m="20px">
        <Header title="ลงทะเบียนเกษตรกร" />

        { farmerReducer?.isRegisterSuccess ? <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            ชื่อและรหัสผ่าน
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            User:  รหัสบัตรประชาชนของท่าน
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Password:  pass@รหัสบัตรประชาชนของท่าน
          </Typography>
        </Box>
      </Modal> : undefined  }

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
              formData.append('tambon', values.tambon)
              formData.append('amphoe', values.amphoe)
              formData.append('province', values.province)
              formData.append('postcode', values.postcode)
              formData.append('tel', values.tel)
              formData.append('status', 'true')
              formData.append('reject', 'false')
              formData.append('selfregister', thisDate)
              console.log('values',values)
              dispatch(addFarmersRegister(navigate, formData))
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
                            onClick={handleRegister}
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
        <MuiSnackbar message={farmerReducer?.isRegisterSuccess ? "ดำเนินส่งคำร้องสำเร็จ" : "ดำเนินส่งคำร้องไม่สำเร็จ"} duration={6000} />   
    </Box >
}

export default Registration