import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField,
    Select,
    MenuItem,
    CardActionArea,
    Grid,
    Typography
  } from '@mui/material'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import { getHerbalSelectedById, updateHerbal } from 'actions/herbalselected.action'

const initialValues = {
    herbalname: "",
    commonname: "",
    scientificname: "",
    othername: "",
}

const userSchema = yup.object().shape({
    herbalname: yup.string().required("ต้องใส่"),
    commonname: yup.string().required("ต้องใส่"),
    scientificname: yup.string().required("ต้องใส่"),
    // othername: yup.string().required("ต้องใส่"),
})

const imagesUrl = process.env.REACT_APP_IMAGES_URL

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

const HerbalEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  
 const location = useLocation()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [roleSelected, setRoleSelected] = useState('1')
  
  const [selectedImages, setSelectedImages] = useState([])

  useEffect(() => {
    if (location?.state?.row?.herbalimages) {
      const apiImages = location.state.row.herbalimages.map((item, index) => ({
        id: `api-${index}`,
        url: imagesUrl+item.image, // ถ้าไม่ใช่ full URL ให้ต่อ path เอง
        file: null,
        from: 'api',
        originalName: item.image,
      }));
      setSelectedImages(apiImages);
    }
  }, []);


  const { result } = useSelector((state) => state.app.roleReducer)

 
  console.log('Herbal detail row', location.state.row)

  // const {id} = useParams();
  // console.log('param id: ',id); 

  useEffect(()=> {
    console.log('selectedImages in Effect',selectedImages)
  },[selectedImages]) 

  useEffect(() => {
    // dispatch(getHerbalSelectedById(id))
    dispatch(getHerbalSelectedById(location.state.row.id))
    console.log('getHerbalSelectedById is running in useEffect')
  },[dispatch, location.state.row.id])
  
  const herbalselected = useSelector((state) => state.app.herbalselectedReducer)

  if (herbalselected?.selectedResult) {
    console.log('herbalselected resulted',herbalselected?.selectedResult)
    // initialValues = herbalselected?.selectedResult
  }

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const localImages = files.map((file, index) => ({
      id: `local-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file: file,
      from: 'local',
    }));
  
    setSelectedImages((prev) => [...prev, ...localImages]);
  };
  
  const handleRemovePhoto = (id) => {
    setSelectedImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };  

  const renderPhotos = (source = selectedImages) => {
    return source.map((photo, index) => (
      <Box
        key={photo.id}
        sx={{
          position: 'relative',
          display: 'inline-block',
          mr: 1,
          mb: 1,
        }}
      >
        <img
          src={photo.url}
          alt={`photo-${index}`}
          style={{
            width: '320px',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
        <IconButton
          size="small"
          onClick={() => handleRemovePhoto(photo.id)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    ));
  };


   const handleSubmitButton = (values) => {
    setSnackBarOpen(true)
    console.log(values)
   }

   const handleCancelButtonClick = () => {
    // navigate('/herbals/list')
    navigate(-1)
   }

   const handleRoleSelection = (e) => {
    setRoleSelected(e.target.value)
   }

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setSnackBarOpen(false)
    }

    const MuiSnackbar = ({message,duration}) => {
  
      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            ปิด
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );    
  
      return (
        <React.Fragment>
        <Snackbar message={message}
          autoHideDuration={duration}
          open={snackBarOpen}
          onClose={handleSnackbarClose}
          severity="success"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          action={action}
        /> 
        </React.Fragment> 
      )
    }    
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
        // dispatch(addUser(navigate,values))
    }

    return <Box m="20px">
        <Header title="ปรับปรุงข้อมูลสมุนไพร" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('id', values.id)
              formData.append('herbalname', values.herbalname)
              formData.append('commonname', values.commonname)
              formData.append('scientificname', values.scientificname)
              formData.append('othername', values.othername)
              // formData.append('image', values.file)
              // console.log('selectedImages onSubmit',selectedImages)
              selectedImages.forEach((img) => {
                if (img.from === 'local' && img.file) {
                  formData.append('images', img.file);
                }
              });
          
              const apiImageNames = selectedImages
                .filter((img) => img.from === 'api')
                .map((img) => img.originalName);
              formData.append('existingImages', JSON.stringify(apiImageNames));

              formData.append('ph', values.ph)
              formData.append('soil', values.soil)
              formData.append('disease', values.disease)
              formData.append('charactername', values.charactername)
              formData.append('propertyname', values.propertyname)
              formData.append('eliminate', values.eliminate)
              formData.append('pharmacology', values.pharmacology)
              formData.append('nutritive', values.nutritive)
              formData.append('caution', values.caution) 
              formData.append('benefit', values.benefit)
              formData.append('process', values.process)
              formData.append('more', values.more)
              formData.append('instruction', values.instruction)
              formData.append('purchasing', values.purchasing)
              formData.append('quality', values.quality)
              formData.append('harvestperiod', values.harvestperiod)
              formData.append('consumption', values.consumption)
              formData.append('chemical', values.chemical)
              formData.append('clinicaltest', values.clinicaltest)
              formData.append('remark', values.remark)
              formData.append('source', values.source)
              formData.append('referencename', values.referencename)
              formData.append('plantrange', values.plantrange)
              formData.append('harvestrange', values.harvestrange)
              formData.append('chemotype', values.chemotype)
              formData.append('basicprocess', values.basicprocess)            
              formData.append('rawprice', values.rawprice)
              formData.append('productprice', values.productprice)                
              dispatch(updateHerbal(navigate, formData))
              setSubmitting(false)
            }}
            // initialValues={initialValues}
            enableReinitialize
            initialValues={herbalselected?.selectedResult ? herbalselected?.selectedResult: {}}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, dirty, isValid, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
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
                            label="รหัส"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.id}
                            name="id"
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                            disabled={true}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อสมุนไพร"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.herbalname}
                            name="herbalname"
                            error={!!touched.herbalname && !!errors.herbalname}
                            helperText={touched.herbalname && errors.herbalname}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อสามัญ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.commonname}
                            name="commonname"
                            error={!!touched.commonname && !!errors.commonname}
                            helperText={touched.commonname && errors.commonname}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อวิทยาศาสตร์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.scientificname}
                            name="scientificname"
                            error={!!touched.scientificname && !!errors.scientificname}
                            helperText={touched.scientificname && errors.scientificname}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อตามท้องถิ่น(ชื่ออื่นๆ)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.othername}
                            name="othername"
                            error={!!touched.othername && !!errors.othername}
                            helperText={touched.othername && errors.othername}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />   
                                                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลักษณะของสมุนไพร"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.charactername}
                            name="charactername"
                            multiline={true}
                            minRows="2"
                            error={!!touched.charactername && !!errors.charactername}
                            helperText={touched.charactername && errors.charactername}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />                               
 
                        {/* สรรพคุณ propertyname                    */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สรรพคุณ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.propertyname}
                            name="propertyname"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.propertyname && !!errors.propertyname}
                            helperText={touched.propertyname && errors.propertyname}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />                         
                        {/* ประโยชน์ (สรรพคุณ)จากส่วนประกอบต่างๆ benefit                    */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ประโยชน์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.benefit}
                            name="benefit"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.benefit && !!errors.benefit}
                            helperText={touched.benefit && errors.benefit}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="โรคพืช"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.disease}
                            name="disease"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.disease && !!errors.disease}
                            helperText={touched.disease && errors.disease}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        /> 

                      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วิธีกำจัด"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.eliminate}
                            name="eliminate"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.eliminate && !!errors.eliminate}
                            helperText={touched.eliminate && errors.eliminate}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        /> 

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ข้อมูลทางเภสัชวิทยา"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.pharmacology}
                            name="pharmacology"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.pharmacology && !!errors.pharmacology}
                            helperText={touched.pharmacology && errors.pharmacology}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        /> 

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="คุณค่าทางโภชนาการ ต่อ 100 กรัม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.nutritive}
                            name="nutritive"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.nutritive && !!errors.nutritive}
                            helperText={touched.nutritive && errors.nutritive}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        /> 

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ข้อควรระวัง"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.caution}
                            name="caution"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.caution && !!errors.caution}
                            helperText={touched.caution && errors.caution}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วิธีแปรรูป"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.process}
                            name="process"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.process && !!errors.process}
                            helperText={touched.process && errors.process}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ข้อมูลเพิ่มเติม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.more}
                            name="more"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.more && !!errors.more}
                            helperText={touched.more && errors.more}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />     

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วิธีใช้"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.instruction}
                            name="instruction"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.instruction && !!errors.instruction}
                            helperText={touched.instruction && errors.instruction}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การเลือกซื้อและการเก็บรักษา"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.purchasing}
                            name="purchasing"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.purchasing && !!errors.purchasing}
                            helperText={touched.purchasing && errors.purchasing}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />     


                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="คุณภาพ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.quality}
                            name="quality"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.quality && !!errors.quality}
                            helperText={touched.quality && errors.quality}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        /> 
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การแปรรูปเบื้องต้น"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.basicprocess}
                            name="basicprocess"
                            multiline={true}
                            minRows="2"                               
                            error={!!touched.basicprocess && !!errors.basicprocess}
                            helperText={touched.basicprocess && errors.basicprocess}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />  
                      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สารสำคัญ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.chemotype}
                            name="chemotype"
                            multiline={true}
                            minRows="2"                               
                            error={!!touched.chemotype && !!errors.chemotype}
                            helperText={touched.chemotype && errors.chemotype}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />                                                  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="อายุการเก็บเกี่ยว"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.harvestperiod }
                            name="harvestperiod"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.harvestperiod  && !!errors.harvestperiod }
                            helperText={touched.harvestperiod  && errors.harvestperiod }
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />     
    
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ช่วงเวลาการปลูก"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.plantrange }
                            name="plantrange"
                            multiline={true}
                            minRows="2"                               
                            error={!!touched.plantrange  && !!errors.plantrange }
                            helperText={touched.plantrange  && errors.plantrange }
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />     
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ช่วงเวลาการเก็บเกี่ยว"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.harvestrange }
                            name="harvestrange"
                            multiline={true}
                            minRows="2"                               
                            error={!!touched.harvestrange  && !!errors.harvestrange }
                            helperText={touched.harvestrange  && errors.harvestrange }
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />                                
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ราคาสมุนไพร (วัตถุดิบ)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.rawprice }
                            name="rawprice"
                            multiline={true}
                            minRows="2"                               
                            error={!!touched.rawprice  && !!errors.rawprice }
                            helperText={touched.rawprice  && errors.rawprice }
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />     
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ราคาสมุนไพร (สำหรับแปรเป็นรูปยา)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.productprice }
                            name="productprice"
                            multiline={true}
                            minRows="2"                               
                            error={!!touched.productprice  && !!errors.productprice }
                            helperText={touched.productprice  && errors.productprice }
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        /> 
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="คำแนะนำในการรับประทาน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.consumption}
                            name="consumption"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.consumption && !!errors.consumption}
                            helperText={touched.consumption && errors.consumption}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />        

                      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="องค์ประกอบทางเคมี"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.chemical}
                            name="chemical"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.chemical && !!errors.chemical}
                            helperText={touched.chemical && errors.chemical}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การทดสอบทางคลินิก"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.clinicaltest }
                            name="clinicaltest"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.clinicaltest  && !!errors.clinicaltest }
                            helperText={touched.clinicaltest  && errors.clinicaltest }
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />     

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ค่า pH ที่เหมาะสม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.ph}
                            name="ph"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.ph && !!errors.ph}
                            helperText={touched.ph && errors.ph}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />  

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="พื้นที่เหมาะสมในการปลูก"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.soil}
                            name="soil"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.soil && !!errors.soil}
                            helperText={touched.soil && errors.soil}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />   

                      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="หมายเหตุ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.remark}
                            name="remark"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.remark && !!errors.remark}
                            helperText={touched.remark && errors.remark}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />  

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การอ้างอิง"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.referencename}
                            name="referencename"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.referencename && !!errors.referencename}
                            helperText={touched.referencename && errors.referencename}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />                         

                      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ที่มาของข้อมูล"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.source}
                            name="source"
                            multiline={true}
                            minRows="2"                            
                            error={!!touched.source && !!errors.source}
                            helperText={touched.source && errors.source}
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />         
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
                         
                          {/* <Box mr="20px">     
                          {
                            location.state.row.herbalimages && location.state.row.herbalimages.map((item) => {
                              // <Item image={item.image}/> 
                              <Box>{item.image}</Box>
                            })
                          }           
                          </Box>  */}
                          {/* <Box>
                            {
                              location.state.row.herbalimages.map((item) => {
                                console.log('555',item.image);
                                return <Item image={item.image}/>
                              })
                            }
                          </Box>  */}
                          <Box>
                            {renderPhotos(selectedImages)}
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
                                  key={selectedImages.length}                         
                                  onChange={(e) => {
                                    e.preventDefault();
                                    handleImageChange(e)
                                    setFieldValue('file', e.target.files); // for upload image
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
                      <Box display="flex" justifyContent="start"
                        sx={{
                          gridColumn: "span 1"
                      }}                    
                    >
                        <Button  onClick={handleSubmitButton}
                            type='submit'
                            // disabled={!isSubmitting}
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
                            onClick={handleCancelButtonClick}
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
                        <MuiSnackbar message="บันทึกสำเร็จ" duration={4000} />
                  </Box>   
                </form>
            )}
        </Formik>
    </Box >
}

export default HerbalEdit