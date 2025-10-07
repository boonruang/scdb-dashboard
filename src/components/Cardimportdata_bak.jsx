import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box,Typography,useTheme,CardActionArea,Grid  } from "@mui/material"
import { tokens } from '../theme';
import {Card,CardMedia,CardContent,Button,TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IosShareIcon from '@mui/icons-material/IosShare';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import UploadProgresBar from 'components/UploadProgresBar'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { uploadFile } from "actions/staffuploadfile.action";
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const initialValues = {
    project_name: "",
}

const userSchema = yup.object().shape({
    // project_name: yup.string().required("ต้องใส่"),
}) 


const Item = ( {result} ) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const fileInputRef = useRef(null);

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])


  const navigate = useNavigate()

  const handleButtonClick = () => {
    fileInputRef.current.click();
    // setOpen(false)
  };

  const handleCancleClick = () => {
    setOpen(false)
  };

  const handleProcessClick = () => {
    console.log('processing')
    // setOpen(true)
  };


  const handleSubmitButton = (values) => {
  setOpen(false)
  // console.log(values)
  }  

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log("ไฟล์ที่เลือก:", file.name);
  //     // TODO: เขียนโค้ดนำไฟล์ไปประมวลผล เช่น อ่าน Excel
  //   }
  // };

const handleFileUpload = (e) => {
  const reader = new FileReader();
  reader.readAsBinaryString(e.target.files[0])
  reader.onload = (e) => {
  const data = e.target.result
  const workbook = XLSX.read(data, { type: "binary"})
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const parsedData = XLSX.utils.sheet_to_json(sheet)
  setData(parsedData)
  }
}  

if (data) {
  console.log('data: ',data)
}


  return (
    <Grid item xs={12} sm={4} ms={4} >
      <Formik
          // onSubmit={handleFormSubmit}
          onSubmit={async (values, { setSubmitting }) => {
            let formData = new FormData()
            formData.append('exceldata', Object.entries(data))
            // formData.append('project_name', values.project_name)
            console.log('values',values)
            dispatch(uploadFile(navigate, formData))
            setSubmitting(false)
          }}
          initialValues={initialValues}
          validationSchema={userSchema}
      >
        {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>

        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}} style={{ marginBottom: "5px"}}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="200"
              image={imagesUrl+result.image}
              alt="scdb"
              style={{borderRadius: '5px'}}
            />            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
                {result.id} {result.name.substring(0, 50)}
                </Typography>
                <Box>
                  <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
                  {result.description.substring(0, 70)}
                  </Typography>
                </Box>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                 
                  <Button  onClick={handleButtonClick}
                      sx={{
                          backgroundColor: colors.blueAccent[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          mr: "10px",
                          mb: "5px",
                          '&:hover': {backgroundColor: colors.blueAccent[800]}
                      }}
                  >
                      <BrowserUpdatedIcon sx={{ mr: "10px" }} />
                      เลือกไฟล์
                  </Button>     
                  {/* <Button  onClick={handleProcessClick}
                      sx={{
                          backgroundColor: colors.greenAccent[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          mr: "10px",
                          mb: "5px",
                          '&:hover': {backgroundColor: colors.greenAccent[800]}
                      }}
                  >
                      <IosShareIcon sx={{ mr: "10px" }} />
                      นำเข้า
                  </Button>   
                  { open ? 
                  <Button  onClick={handleCancleClick}
                      sx={{
                          backgroundColor: colors.redAccent[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          mr: "10px",
                          mb: "5px",
                          '&:hover': {backgroundColor: colors.redAccent[800]}
                      }}
                  >
                      <CancelIcon sx={{ mr: "10px" }} />
                      ยกเลิก
                  </Button>  
                  : undefined } */}

                  <Button  onClick={handleSubmitButton}
                      type='submit'
                      sx={{
                          backgroundColor: colors.greenAccent[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          mr: "10px",
                          mb: "5px",
                          '&:hover': {backgroundColor: colors.greenAccent[800]}
                      }}
                  >
                      <SaveIcon sx={{ mr: "10px" }} />
                      บันทึก
                  </Button>  

               {/* { open ? <UploadProgresBar /> : undefined } */}

              </CardContent>
          </CardActionArea>
        </Card>
                </form>
            )}
        </Formik>        
      </Grid>
        )
      }

const Cardexportdata = ({mockImportData}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()
  
  let content

 if (mockImportData ) {
    content = (
      <Grid container spacing={5} style={{ marginTop: "20px"}}>
          {
            Object.values(mockImportData).map(result => {
              return <Item key={result.id} result={result} />
            })
          }
      </Grid>  
    )
  } else {
    content = (
      <Box>
        อุ้ย หาไม่เจออ่ะ
      </Box>      
    )
  } 
  return content
}
export default Cardexportdata