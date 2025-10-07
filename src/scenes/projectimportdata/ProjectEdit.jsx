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
import { updateProject } from '../../actions/project.action'
import { getDepartment } from 'actions/department.action'
import { useNavigate,useLocation } from 'react-router-dom'
import MessageBox from 'components/MessageBox'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { formatThaiDateBuddhistEra } from '../../utils/formatthaidate'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { th } from 'date-fns/locale';  

const initialValues = {
    name: "",
}

const userSchema = yup.object().shape({
    // name: yup.string().required("ต้องใส่"),
    // position: yup.string().required("ต้องใส่"),
    // project_type: yup.string().required("ต้องใส่"),
    // email: yup.string().required("ต้องใส่"),
    // office_location: yup.string().required("ต้องใส่"),
}) 

const ProjectEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

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

    return <Box m="20px">
        <Header title="ปรับปรุงข้อมูล" />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('project_id', values.project_id)
              formData.append('project_name', values.project_name)
              formData.append('project_type', values.project_type)
              formData.append('responsible_dept_id', values.responsible_dept_id)
              formData.append('start_date', values.start_date)
              formData.append('end_date', values.end_date)
              formData.append('budget_source', values.budget_source)
              formData.append('budget_amount', values.budget_amount)
              formData.append('status', values.status)
              console.log('values',values)
              dispatch(updateProject(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={location?.state?.row}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Box>
                    <Box mt='20px'>                
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
                        variant="outlined"
                        type="text"
                        label="รหัส"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.project_id}
                        name="project_id"
                        error={!!touched.project_id && !!errors.project_id}
                        helperText={touched.project_id && errors.project_id}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                        
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ชื่อโครงการ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.project_name}
                        name="project_name"
                        error={!!touched.project_name && !!errors.project_name}
                        helperText={touched.project_name && errors.project_name}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภทโครงการ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.project_type}
                        name="project_type"
                        error={!!touched.project_type && !!errors.project_type}
                        helperText={touched.project_type && errors.project_type}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />    
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="โดยภาควิชา"
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.responsible_dept_id}
                        name="responsible_dept_id"                         
                        error={!!touched.responsible_dept_id && !!errors.responsible_dept_id}
                        helperText={touched.responsible_dept_id && errors.responsible_dept_id}
                        defaultValue=""
                        sx={{ gridColumn: "span 1" }} >
                        { departmentData && departmentData.map((item,key) => (
                        <MenuItem key={key} value={item.department_id} >
                            {item.department_id+'-'+item.dept_name}
                        </MenuItem>  
                        ))} 
                    </TextField>                        
                    <DatePicker
                        label="วันเริ่มต้น"
                        value={values.start_date ? new Date(values.start_date) : null}
                        onChange={(value) => setFieldValue("start_date", value)}
                        format="d MMMM yyyy"
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
                        label="สิ้นสุด"
                        value={values.end_date ? new Date(values.end_date) : null }
                        onChange={(value) => setFieldValue("end_date", value)}
                        format="d MMMM yyyy"
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
                        label="แหล่งงบประมาณ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.budget_source}
                        name="budget_source"
                        error={!!touched.budget_source && !!errors.budget_source}
                        helperText={touched.budget_source && errors.budget_source}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="งบประมาณ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.budget_amount}
                        name="budget_amount"
                        error={!!touched.budget_amount && !!errors.budget_amount}
                        helperText={touched.budget_amount && errors.budget_amount}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="สถานะ"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.status}
                        name="status"
                        error={!!touched.status && !!errors.status}
                        helperText={touched.status && errors.status}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                
                     </Box>
                </Box>

                      <Box display="flex" justifyContent="start"
                          sx={{
                            mt: "20px", 
                            gridColumn: "span 4"
                        }}                    
                      >
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

export default ProjectEdit