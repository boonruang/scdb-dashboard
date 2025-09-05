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
import { updateDocument } from '../../actions/document.action'
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
    // document_type: yup.string().required("ต้องใส่"),
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

const DocumentEdit = () => {

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
              formData.append('document_id', values.id)
              formData.append('title', values.title)
              console.log('values',values)
              dispatch(updateDocument(navigate, formData))
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
                        value={values?.document_id}
                        name="document_id"
                        error={!!touched.document_id && !!errors.document_id}
                        helperText={touched.document_id && errors.document_id}
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
                        value={values?.document_name}
                        title="document_name"
                        error={!!touched.document_name && !!errors.document_name}
                        helperText={touched.document_name && errors.document_name}
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
                        value={values?.document_type}
                        name="document_type"
                        error={!!touched.document_type && !!errors.document_type}
                        helperText={touched.document_type && errors.document_type}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
                    />       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วันเริ่มต้น"
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
                        label="วันเริ่มต้น"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.end_date}
                        name="end_date"
                        error={!!touched.end_date && !!errors.end_date}
                        helperText={touched.end_date && errors.end_date}
                        sx={{ gridColumn: "span 1" }}
                        InputLabelProps={{ shrink: true }}
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
        </MuiPickersUtilsProvider>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />          
    </Box >
    
}

export default DocumentEdit