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
    MenuItem,    
  } from '@mui/material'

  import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addStudent } from '../../actions/student.action'
import { getStaff } from '../../actions/staff.action'
import { getAcademicProgram } from '../../actions/academicProgram.action'
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
    title: yup.string().required("ต้องใส่"),
    excerpt: yup.string().required("ต้องใส่"),
    category: yup.string().required("ต้องใส่"),
    date: yup.string().required("ต้องใส่"),
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

const StudentAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [staffData, setStaffData] = useState([])
  const [academicProgramData, setAcademicProgramData] = useState([])
  
  const staffReducer = useSelector((state) => state.app.staffReducer)
  const academicProgramReducer = useSelector((state) => state.app.academicProgramReducer)
  
  
  
    useEffect(() => {
        dispatch(getStaff())
    },[dispatch])
  
    useEffect(() => {
        setStaffData(staffReducer.result)
    },[staffReducer.result]) 

    useEffect(() => {
        dispatch(getAcademicProgram())
    },[dispatch])
  
    useEffect(() => {
        setAcademicProgramData(academicProgramReducer.result)
    },[academicProgramReducer.result])     

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
              dispatch(addStudent(navigate, formData))
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
                        label="รหัส"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.studentOfficial_id}
                        name="studentOfficial_id"
                        error={!!touched.studentOfficial_id && !!errors.studentOfficial_id}
                        helperText={touched.studentOfficial_id && errors.studentOfficial_id}
                        sx={{ gridColumn: "span 1" }}
                    />
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
                        helperText={touched.firstname && errors.nafirstnameme}
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
                        label="สาขาวิชา"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.program_id}
                        name="program_id"
                        error={!!touched.program_id && !!errors.program_id}
                        helperText={touched.program_id && errors.program_id}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} 
                        >
                        { academicProgramData && academicProgramData.map((item,key) => (
                        <MenuItem key={key} value={item.program_id} >
                            {item.program_id+'-'+item.program_name}
                        </MenuItem>  
                        ))} 
                    </TextField>             

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ที่ปรึกษา"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.advisor_staff_id}
                        name="advisor_staff_id"
                        error={!!touched.advisor_staff_id && !!errors.advisor_staff_id}
                        helperText={touched.advisor_staff_id && errors.advisor_staff_id}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} 
                        >
                        { staffData && staffData.map((item,key) => (
                        <MenuItem key={key} value={item.staff_id} >
                            {item.staff_id+'-'+item.firstname+' '+item.lastname}
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
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />          
    </Box >
    
}

export default StudentAdd