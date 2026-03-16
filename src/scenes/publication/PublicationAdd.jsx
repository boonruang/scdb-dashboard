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

const initialValues = {
    title: "",
    journal_name: "",
    publication_year: "",
    quartile: "",
    database_source: ""
}

const userSchema = yup.object().shape({
    title: yup.string().required("ต้องระบุชื่อเรื่อง"),
    journal_name: yup.string().required("ต้องระบุนิตยสาร/วารสาร"),
    publication_year: yup.number().required("ต้องระบุปีที่ตีพิมพ์"),
    quartile: yup.string().required("ต้องระบุควอไทล์"),
    database_source: yup.string().required("ต้องระบุฐานข้อมูล"),
}) 

const PublicationAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("ดำเนินการเรียบร้อยแล้ว")
  const [isSuccess, setIsSuccess] = useState(false)

   const handleSubmitButton = (values) => {
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
              formData.append('title', values.title)
              formData.append('journal_name', values.journal_name)
              formData.append('publication_year', values.publication_year)
              formData.append('quartile', values.quartile)
              formData.append('database_source', values.database_source)
              console.log('values',values)
              const res = await dispatch(addPublication(navigate, formData))
              if (res && res.success) {
                  setMsg("บันทึกข้อมูลเรียบร้อยแล้ว")
                  setIsSuccess(true)
                  setOpen(true)
              } else {
                  setMsg("เกิดข้อผิดพลาด: " + (res?.error || "ไม่สามารถบันทึกข้อมูลได้"))
                  setIsSuccess(false)
                  setOpen(true)
              }
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
                        value={values.title}
                        name="title"
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
                        value={values.journal_name}
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
                        value={values.publication_year}
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
                        value={values.quartile}
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
                        value={values.database_source}
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
                        <Button  
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
        submitFunction={() => {
            setOpen(false)
            if (isSuccess) navigate('/publication')
        }}
        message={msg}
        />          
    </Box >
    
}

export default PublicationAdd