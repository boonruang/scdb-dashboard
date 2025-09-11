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
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addStaff } from '../../actions/staff.action'
import { getStafftype } from '../../actions/stafftype.action'
import { getDepartment } from 'actions/department.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { formatThaiDateBuddhistEra } from '../../utils/formatthaidate'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { th } from 'date-fns/locale';  

const initialValues = {
    firtname: "",
    lastname: "",
}

const userSchema = yup.object().shape({
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
    position: yup.string().required("ต้องใส่"),
    // stafftypeId: yup.string().required("ต้องใส่"),
    // email: yup.string().required("ต้องใส่"),
    // office_location: yup.string().required("ต้องใส่"),
}) 

const StaffAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [stafftypeData, setStafftypeData] = useState([])
  const [departmentData, setDepartmentData] = useState([])

  const stafftypeReducer = useSelector((state) => state.app.stafftypeReducer)
  const departmentReducer = useSelector((state) => state.app.departmentReducer)


    useEffect(() => {
        dispatch(getStafftype())
  },[dispatch])

      useEffect(() => {
        dispatch(getDepartment())
  },[dispatch])

  useEffect(() => {
    setStafftypeData(stafftypeReducer.result)
    },[stafftypeReducer.result])  

  useEffect(() => {
    setDepartmentData(departmentReducer.result)
    },[departmentReducer.result])  


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
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('position', values.position)
              formData.append('position_no', values.position_no)
              formData.append('education', values.education)
              formData.append('startdate', values.startdate)
              formData.append('birthday', values.birthday)
              formData.append('email', values.email)
              formData.append('office_location', values.office_location)
              formData.append('stafftype_id', values.stafftype_id)
              formData.append('department_id', values.department_id)
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
                        label="เลขประจำตำแหน่ง"
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
                        name="stafftype_id"
                        error={!!touched.stafftype_id && !!errors.stafftype_id}
                        helperText={touched.stafftype_id && errors.stafftype_id}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} 
                        >
                        { stafftypeData && stafftypeData.map((item,key) => (
                        <MenuItem key={key} value={item.stafftype_id} >
                            {item.stafftype_id+'-'+item.name}
                        </MenuItem>  
                        ))} 
                    </TextField>                                           
      
                        <DatePicker
                        label="วันที่บรรจุ"
                        value={values.startdate ? new Date(values.startdate) : null}
                        onChange={(value) => setFieldValue("startdate", value)}
                        format="d MMMM yyyy" // แค่กำหนดรูปแบบ baseline
                        slotProps={{
                        textField: {
                            fullWidth: true,
                            variant: "outlined",
                            sx: { gridColumn: "span 1" },
                            InputLabelProps: { shrink: true }
                        }
                        }}
                        />
                    <DatePicker
                        label="วันเกิด"
                        value={values.birthday ? new Date(values.birthday) : null }
                        onChange={(value) => setFieldValue("birthday", value)}
                        format="d MMMM yyyy" // แค่กำหนดรูปแบบ baseline
                        slotProps={{
                        textField: {
                            fullWidth: true,
                            variant: "outlined",
                            sx: { gridColumn: "span 1" },
                            InputLabelProps: { shrink: true }
                        }
                        }}
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
                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ภาควิชา"                      
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.department_id}
                        name="department_id"                         
                        error={!!touched.department_id && !!errors.department_id}
                        helperText={touched.department_id && errors.department_id}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} >
                        { departmentData && departmentData.map((item,key) => (
                        <MenuItem key={key} value={item.department_id} >
                            {item.department_id+'-'+item.dept_name}
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
        </LocalizationProvider>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />          
    </Box >
    
}

export default StaffAdd