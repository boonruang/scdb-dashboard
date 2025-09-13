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
    MenuItem,
  } from '@mui/material'

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addAcademicProgram } from '../../actions/academicProgram.action'
import { getDepartment } from '../../actions/department.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const initialValues = {
    program_name: "",
}

const userSchema = yup.object().shape({
    program_name: yup.string().required("ต้องใส่"),
    degree_level: yup.string().required("ต้องใส่"),

}) // end yup

const AcademicProgramAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [departmentData, setDepartmentData] = useState([])
  
  const departmentReducer = useSelector((state) => state.app.departmentReducer)
  
    useEffect(() => {
        dispatch(getDepartment())
    },[dispatch])
  
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
        <Header title="เพิ่มข้อมูล" subtitle="เพิ่มข้อมูลหลักสูตร" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('program_name', values.program_name)
              formData.append('degree_level', values.degree_level)
              formData.append('department_id', values.department_id)
              console.log('values',values)
              dispatch(addAcademicProgram(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Box>
                    {/* tab1 */}
                        <Typography>
                            ข้อมูลเบื้องต้น
                        </Typography>
                    <Box mt='40px'>                
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
                        label="ชื่อหลักสูตร"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.program_name}
                        name="program_name"
                        error={!!touched.program_name && !!errors.program_name}
                        helperText={touched.program_name && errors.program_name}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ปริญญา"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.degree_level}
                         name="degree_level"
                         error={!!touched.degree_level && !!errors.degree_level}
                         helperText={touched.degree_level && errors.degree_level}
                         sx={{ gridColumn: "span 2" }}
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
                        sx={{ gridColumn: "span 1" }} 
                        >
                        { departmentData && departmentData.map((item,key) => (
                        <MenuItem key={key} value={item.department_id} >
                            {item.department_id+'-'+item.dept_name}
                        </MenuItem>  
                        ))} 
                    </TextField>                        
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

export default AcademicProgramAdd