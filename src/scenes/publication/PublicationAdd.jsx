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
import { addPublication } from '../../actions/publication.action'
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
    publication_type: yup.string().required("ต้องใส่"),
    email: yup.string().required("ต้องใส่"),
    office_location: yup.string().required("ต้องใส่"),
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

const PublicationAdd = () => {

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
              dispatch(addPublication(navigate, formData))
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
                        label="ชื่อเรื่อง"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.title}
                        title="title"
                        error={!!touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="วารสาร"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.journal_name}
                        name="journal_name"
                        error={!!touched.journal_name && !!errors.journal_name}
                        helperText={touched.journal_name && errors.journal_name}
                        sx={{ gridColumn: "span 1" }}
                    />       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ปีที่ตีพิมพ์"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.publication_year}
                        name="publication_year"
                        error={!!touched.publication_year && !!errors.publication_year}
                        helperText={touched.publication_year && errors.publication_year}
                        sx={{ gridColumn: "span 1" }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="คลอไทล์"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.quartile}
                        name="quartile"
                        error={!!touched.quartile && !!errors.quartile}
                        helperText={touched.quartile && errors.quartile}
                        sx={{ gridColumn: "span 1" }}
                    />                       
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ฐานข้อมูล"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.database_source}
                        name="database_source"
                        error={!!touched.database_source && !!errors.database_source}
                        helperText={touched.database_source && errors.database_source}
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

export default PublicationAdd