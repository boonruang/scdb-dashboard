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
import { updatePost } from '../../actions/post.action'
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
    title: yup.string().required("ต้องใส่"),
    excerpt: yup.string().required("ต้องใส่"),
    category: yup.string().required("ต้องใส่"),
    // date: yup.string().required("ต้องใส่"),
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

const StudentEdit = () => {

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
              formData.append('id', values.id)
              formData.append('title', values.title)
              formData.append('excerpt', values.excerpt)
              formData.append('category', values.category)
              formData.append('date', values.date)
              formData.append('image', values.file)           
              console.log('values',values)
              dispatch(updatePost(navigate, formData))
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
                        value={values?.id}
                        name="id"
                        error={!!touched.id && !!errors.id}
                        helperText={touched.id && errors.id}
                        InputLabelProps={{ shrink: true }}
                        sx={{ gridColumn: "span 1" }}
                    />                        
                     <TextField
                         fullWidth
                         variant="outlined"
                         type="text"
                         label="ชื่อเรื่อง"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values?.title}
                         name="title"
                         error={!!touched.title && !!errors.title}
                         helperText={touched.title && errors.title}
                         sx={{ gridColumn: "span 1" }}
                         InputLabelProps={{ shrink: true }}
                     />
                     <TextField
                         fullWidth
                         variant="outlined"
                         type="text"
                         label="เนื้อหา"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values?.excerpt}
                         name="excerpt"
                         error={!!touched.excerpt && !!errors.excerpt}
                         helperText={touched.excerpt && errors.excerpt}
                         sx={{ gridColumn: "span 1" }}
                         InputLabelProps={{ shrink: true }}
                     />
                     <TextField
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="หมวด"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.category}
                          name="category"
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                          sx={{ gridColumn: "span 1" }}
                          InputLabelProps={{ shrink: true }}
                      />      

                        <KeyboardDatePicker
                          id="date-picker-dialog"
                          label="เลือกวันที่"
                          inputVariant="outlined"
                          format="d MMMM yyyy" // ใช้ format ปกติ (แค่บังคับรูปแบบ)
                          value={values.unformatdate ? new Date(values.unformatdate) : new Date()}
                          onChange={(value) => setFieldValue("date", value)}
                          onBlur={handleBlur}
                          name="date"
                          fullWidth
                          KeyboardButtonProps={{ "aria-label": "change date" }}
                          margin="normal"
                          sx={{ gridColumn: "span 1" }}
                          InputLabelProps={{ shrink: true }}
                          // ใช้ labelFunc เพื่อแสดงผลเป็น พ.ศ.
                          labelFunc={(date) => formatThaiDateBuddhistEra(date)}
                        />
                     </Box>
                </Box>

                      <Box display="flex" justifyContent="start"
                          sx={{
                            mt: "20px", 
                            gridColumn: "span 4"
                        }}                    
                      >

                          <Box mr="20px">     
                           { values.file_obj ? 
                                <img src={values.file_obj} style={{ width: '300px' }} />
                            : <Item image={values?.image}/> }           
                          </Box>                            
                          <Box>
                                <Button  
                                    variant="contained"
                                    component="label"
                                sx={{
                                    backgroundColor: colors.blueAccent[700],
                                    color: colors.grey[100],
                                    width: '135px',
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    mr: "10px",
                                    mb: "10px",
                                    '&:hover': {backgroundColor: colors.blueAccent[800]}
                                }}
                            > 
                                เลือกรูป
                                <input                           
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFieldValue('file', e.target.files[0]); // for upload image
                                    setFieldValue(
                                    'file_obj',
                                    URL.createObjectURL(e.target.files[0])
                                    ); // for preview image
                                }}
                                type='file'
                                name='image'
                                multiple
                                accept='image/*'                           
                                hidden
                                />                              
                            </Button>    
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

export default StudentEdit