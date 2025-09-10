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
    CardMedia,
    MenuItem    
  } from '@mui/material'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { th } from 'date-fns/locale';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addStaff } from '../../actions/staff.action'
import { getStafftype } from '../../actions/stafftype.action'
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
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
    position: yup.string().required("ต้องใส่"),
    // stafftypeId: yup.string().required("ต้องใส่"),
    // email: yup.string().required("ต้องใส่"),
    // office_location: yup.string().required("ต้องใส่"),
}) 

const imagesUrl = process.env.REACT_APP_POSTS_IMAGES_URL

const Item = ({image}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  console.log('image in Item => ',image)
  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="220"
              image={imagesUrl+'no-image-icon-23485.png'}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
          </CardActionArea>
        </Card>
      </Grid>
    )
}

const StaffAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [stafftypeData, setStafftypeData] = useState([])

  const stafftypeReducer = useSelector((state) => state.app.stafftypeReducer)


    useEffect(() => {
        dispatch(getStafftype())
  },[dispatch])

  useEffect(() => {
    setStafftypeData(stafftypeReducer.result)
    },[stafftypeReducer.result])  


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
        <Header title="เพิ่มข้อมูล"/>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={th}>
        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('position', values.position)
              formData.append('position_no', values.position_no)
              formData.append('education', values.education)
              formData.append('education', values.startdate)
              formData.append('birthday', values.birthday)
              formData.append('email', values.email)
              formData.append('office_location', values.office_location)
              formData.append('stafftypeId', values.stafftypeId)
              console.log('values',values)
              dispatch(addStaff(navigate, formData))
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
                        value={values?.firstname}
                        name="firstname"
                        error={!!touched.firstname && !!errors.firstname}
                        helperText={touched.firstname && errors.firstname}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="นามสกุล"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.lastname}
                        name="lastname"
                        error={!!touched.lastname && !!errors.lastname}
                        helperText={touched.lastname && errors.lastname}
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
                        label="หมายเลขตำแหน่ง"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.position_no}
                        name="position_no"
                        error={!!touched.position_no && !!errors.position_no}
                        helperText={touched.position_no && errors.position_no}
                        sx={{ gridColumn: "span 1" }}
                    />                      
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วุฒิการศึกษา"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.education}
                        name="education"
                        error={!!touched.education && !!errors.education}
                        helperText={touched.education && errors.education}
                        sx={{ gridColumn: "span 1" }}
                    /> 
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภท"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.stafftype_id}
                        name="producttypeId"
                        error={!!touched.stafftypeId && !!errors.stafftypeId}
                        helperText={touched.stafftypeId && errors.stafftypeId}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} >
                        { stafftypeData && stafftypeData.map((item,key) => (
                        <MenuItem key={key} value={item.stafftype_id} >
                            {item.stafftype_id+'-'+item.name}
                        </MenuItem>  
                        ))} 
                        </TextField>                                           
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
                        label="บรรจุ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.startdate}
                        name="startdate"
                        error={!!touched.startdate && !!errors.startdate}
                        helperText={touched.startdate && errors.startdate}
                        sx={{ gridColumn: "span 1" }}
                    />  
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันเกิด"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.birthday}
                        name="birthday"
                        error={!!touched.birthday && !!errors.birthday}
                        helperText={touched.birthday && errors.birthday}
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
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="สังกัดภาควิชา"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.stafftype_id}
                        name="producttypeId"
                        error={!!touched.stafftypeId && !!errors.stafftypeId}
                        helperText={touched.stafftypeId && errors.stafftypeId}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} >
                        { stafftypeData && stafftypeData.map((item,key) => (
                        <MenuItem key={key} value={item.stafftype_id} >
                            {item.stafftype_id+'-'+item.name}
                        </MenuItem>  
                        ))} 
                        </TextField>                                          
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
        </MuiPickersUtilsProvider>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />          
    </Box >
    
}

export default StaffAdd