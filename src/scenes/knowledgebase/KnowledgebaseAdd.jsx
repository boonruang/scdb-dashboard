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
  } from '@mui/material'

import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Header from "../../components/Header"
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addKnowledgebase } from '../../actions/knowledgebase.action'
import { useNavigate } from 'react-router-dom'
import MessageBox from 'components/MessageBox'

const initialValues = {
    name: "",
}

const userSchema = yup.object().shape({
    name: yup.string().required("ต้องใส่"),
    author: yup.string().required("ต้องใส่"),
    journal: yup.string().required("ต้องใส่"),
    type: yup.string().required("ต้องใส่"),
    press: yup.string().required("ต้องใส่"),
    publishyear: yup.string().required("ต้องใส่").matches(/^[0-9]{4}$/,"ต้องประกอบด้วยตัวเลข 4 หลัก"),
    edition: yup.string().required("ต้องใส่").matches(/^[0-9]{1}$/,"ต้องประกอบด้วยตัวเลข"),
}) // end yup

const KnowledgebaseAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const INITIAL_CENTER = { lat: 16.1850896, lng: 103.3026461}
  const INITIAL_ZOOM = 12
  const [center, setCenter] = useState(INITIAL_CENTER);

  //  if (result) {
  //   console.log('role result',result)
  //  }

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
        <Header title="เพิ่มข้อมูล" subtitle="เพิ่มข้อมูลองค์ความรู้การแพทย์แผนไทย" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('name', values.name)
              formData.append('author', values.author)
              formData.append('journal', values.journal)
              formData.append('type', values.type)
              formData.append('press', values.press)
              formData.append('publishyear', values.publishyear)
              formData.append('edition', values.edition)
              formData.append('attachment', values.attachment)
              formData.append('reference', values.reference)
              formData.append('status', 'true')
              console.log('values',values)
              dispatch(addKnowledgebase(navigate, formData))
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
                        label="เรื่อง"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.name}
                        name="name"
                        multiline={true}
                        minRows="2"                        
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ชื่อผู้แต่ง"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.author}
                         name="author"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.author && !!errors.author}
                         helperText={touched.author && errors.author}
                         sx={{ gridColumn: "span 2" }}
                     />       
                    <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ปีที่ตีพิมพ์"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.publishyear}
                         name="publishyear"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.publishyear && !!errors.publishyear}
                         helperText={touched.publishyear && errors.publishyear}
                         sx={{ gridColumn: "span 2" }}
                     />       
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="พิมพ์ครั้งที่"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.edition}
                         name="edition"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.edition && !!errors.edition}
                         helperText={touched.edition && errors.edition}
                         sx={{ gridColumn: "span 2" }}
                     />     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="สำนักพิมพ์"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.journal}
                         name="journal"
                         multiline={true}
                         minRows="2"                       
                         error={!!touched.journal && !!errors.journal}
                         helperText={touched.journal && errors.journal}
                         sx={{ gridColumn: "span 2" }}
                     />     
                     
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="สถานที่พิมพ์"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.press}
                         name="press"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.press && !!errors.press}
                         helperText={touched.press && errors.press}
                         sx={{ gridColumn: "span 2" }}
                     />     
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="ประเภท"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.type}
                         name="type"
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.type && !!errors.type}
                         helperText={touched.type && errors.type}
                         sx={{ gridColumn: "span 2" }}
                     />                                         
 
                     <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="อ้างอิง"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.reference}
                         name="reference"     
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.reference && !!errors.reference}
                         helperText={touched.reference && errors.reference}
                         sx={{ gridColumn: "span 2" }}
                     /> 

                      <TextField
                         fullWidth
                         variant="filled"
                         type="text"
                         label="เอกสารแนบ"
                         onBlur={handleBlur}
                         onChange={handleChange}
                         value={values.attachment}
                         name="attachment"     
                         multiline={true}
                         minRows="2"                         
                         error={!!touched.attachment && !!errors.attachment}
                         helperText={touched.attachment && errors.attachment}
                         sx={{ gridColumn: "span 2" }}
                     /> 
                      
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

export default KnowledgebaseAdd