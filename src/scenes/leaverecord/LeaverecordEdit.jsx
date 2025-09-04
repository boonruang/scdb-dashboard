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

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import { th } from 'date-fns/locale';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { updateLeaverecord } from '../../actions/leaverecord.action'
import { useNavigate,useLocation } from 'react-router-dom'
import MessageBox from 'components/MessageBox'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { formatThaiDateBuddhistEra } from '../../utils/formatthaidate'

const imagesUrl = process.env.REACT_APP_POSTS_IMAGES_URL

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
    name: "",
}

const userSchema = yup.object().shape({
    // name: yup.string().required("ต้องใส่"),
    // position: yup.string().required("ต้องใส่"),
    // leaverecord_type: yup.string().required("ต้องใส่"),
    // email: yup.string().required("ต้องใส่"),
    // office_location: yup.string().required("ต้องใส่"),
}) 


const Item = ({image}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="220"
              // image={imagesUrl+'ฟ้าทะลายโจร.jpg'}
              image={image ? imagesUrl+image : imagesUrl+'no-image-icon-23485.png'}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
          </CardActionArea>
        </Card>
      </Grid>
    )
}

const LeaverecordEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  const [open, setOpen] = useState(false)

   const handleSubmitButton = (values) => {
    setOpen(true)
    // console.log(values)
   }

   const handleCancelButton = () => {
    navigate(-1)
   }


    const isNonMobile = useMediaQuery("(min-width:600px)")

    return <Box m="20px">
        <Header title="ปรับปรุงข้อมูล" subtitle="ปรับปรุงข้อมูลการโพสต์ข้อความ" />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={th}>
        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('leaverecord_id', values.id)
              formData.append('title', values.title)
              console.log('values',values)
              dispatch(updateLeaverecord(navigate, formData))
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
                        value={values?.leave_id}
                        name="leave_id"
                        error={!!touched.leave_id && !!errors.leave_id}
                        helperText={touched.leave_id && errors.leave_id}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                        
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
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ประเภทการลา"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.leave_type}
                        name="leave_type"
                        error={!!touched.leave_type && !!errors.leave_type}
                        helperText={touched.leave_type && errors.leave_type}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันเริ่ม"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.start_date}
                        name="start_date"
                        error={!!touched.start_date && !!errors.start_date}
                        helperText={touched.start_date && errors.start_date}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันสิ้นสุด"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.end_date}
                        name="end_date"
                        error={!!touched.end_date && !!errors.end_date}
                        helperText={touched.end_date && errors.end_date}
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
        </MuiPickersUtilsProvider>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />          
    </Box >
    
}

export default LeaverecordEdit