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
    CardActionArea,
    Grid,
    styled,
    Card,
    CardMedia    
  } from '@mui/material'

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addStaffeducation } from '../../actions/staffeducation.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { formatThaiDateBuddhistEra } from '../../utils/formatthaidate'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    mr: "20px",
    mb: "10px",
  });

const initialValues = {
    title: "",
}

const userSchema = yup.object().shape({
    name: yup.string().required("ต้องใส่"),
    position: yup.string().required("ต้องใส่"),
    staffeducation_type: yup.string().required("ต้องใส่"),
    email: yup.string().required("ต้องใส่"),
    office_location: yup.string().required("ต้องใส่"),
}) 


const StaffeducationAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

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
        <Header title="เพิ่มข้อมูล" />
        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('name', values.title)
              console.log('values',values)
              dispatch(addStaffeducation(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Box>
                    <Box mt='40px'>                
                    <Box 
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
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
                        label="ตำแหน่ง"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.position}
                        name="position"
                        error={!!touched.position && !!errors.position}
                        helperText={touched.position && errors.position}
                        sx={{ gridColumn: "span 1" }}
                    />       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภท"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.staffeducation_type}
                        name="staffeducation_type"
                        error={!!touched.staffeducation_type && !!errors.staffeducation_type}
                        helperText={touched.staffeducation_type && errors.staffeducation_type}
                        sx={{ gridColumn: "span 1" }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="อีเมล์"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 1" }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ออฟฟิศ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.office_location}
                        name="office_location"
                        error={!!touched.office_location && !!errors.office_location}
                        helperText={touched.office_location && errors.office_location}
                        sx={{ gridColumn: "span 1" }}
                    />                       
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
                            gridColumn: "span 4"
                        }}                    
                      >

                          <Box>
                          </Box>
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

export default StaffeducationAdd