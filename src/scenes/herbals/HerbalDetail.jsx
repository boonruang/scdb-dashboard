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
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addHerbal } from '../../actions/herbal.action'
import { useNavigate,useParams,useLocation } from 'react-router-dom'


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

const HerbalDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  console.log('Herbal add row', location.state.row)

  
  const isNonMobile = useMediaQuery("(min-width:600px)")  

    const [selectedImages, setSelectedImages] = useState([])
  
    useEffect(() => {
      if (location?.state?.row?.herbalimages) {
        const apiImages = location.state.row.herbalimages.map((item, index) => ({
          id: `api-${index}`,
          url: imagesUrl+item.image, // ถ้าไม่ใช่ full URL ให้ต่อ path เอง
        }));
        setSelectedImages(apiImages);
      }
    }, []);

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
      </Box>
    ));
  }    


  // const [snackBarOpen, setSnackBarOpen] = useState(false)

  // const [roleSelected, setRoleSelected] = useState('1')

  // const { result } = useSelector((state) => state.app.roleReducer)


      return <Box m="20px">
        <Header title="รายละเอียดข้อมูลสมุนไพร"  />
                <form >
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
                            label="ชื่อสมุนไพร"
                            value={location.state.row.herbalname}
                            name="herbalname"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อสามัญ"
                            value={location.state.row.commonname}
                            name="commonname"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อวิทยาศาสตร์"
                            value={location.state.row.scientificname}
                            name="scientificname"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อตามท้องถิ่น(ชื่ออื่นๆ)"
                            value={location.state.row.othername}
                            name="othername"
                            sx={{ gridColumn: "span 1" }}
                        />   

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลักษณะ"
                            value={location.state.row.charactername}
                            name="charactername"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สรรพคุณ"
                            value={location.state.row.propertyname}
                            name="propertyname"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />     

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ประโยชน์"
                            value={location.state.row.benefit}
                            name="benefit"
                            multiline="true"
                            minRows="2"
                            sx={{ gridColumn: "span 1" }}
                        />  

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="โรคพืช"
                            value={location.state.row.disease}
                            name="disease"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                                 
                             
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วิธีกำจัด"
                            value={location.state.row.eliminate}
                            name="eliminate"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                         
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ข้อมูลทางเภสัชวิทยา"
                            value={location.state.row.pharmacology}
                            name="pharmacology"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="คุณค่าทางโภชนาการ ต่อ 100 กรัม"
                            value={location.state.row.nutritive}
                            name="nutritive"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                         
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ข้อควรระวัง"
                            value={location.state.row.caution}
                            name="caution"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />


                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วิธีแปรรูป"
                            value={location.state.row.process}
                            name="process"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ข้อมูลเพิ่มเติม"
                            value={location.state.row.more}
                            name="more"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />   
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วิธีใช้"
                            value={location.state.row.instruction}
                            name="instruction"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การเลือกซื้อและการเก็บรักษา"
                            value={location.state.row.purchasing}
                            name="purchasing"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />     
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="คุณภาพ"
                            value={location.state.row.quality}
                            name="quality"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การแปรรูปเบื้องต้น"
                            value={location.state.row.basicprocess}
                            name="basicprocess"
                            multiline="true"
                            minRows="2"                               
                            sx={{ gridColumn: "span 1" }}
                        />  
                      <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สารสำคัญ"
                            value={location.state.row.chemotype}
                            name="chemotype"
                            multiline="true"
                            minRows="2"                               
                            sx={{ gridColumn: "span 1" }}
                        />                                                  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="อายุการเก็บเกี่ยว"
                            value={location.state.row.harvestperiod }
                            name="harvestperiod "
                            multiline="true"
                            minRows="2"
                            sx={{ gridColumn: "span 1" }}
                        />      
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ช่วงเวลาการปลูก"
                            value={location.state.row.plantrange }
                            name="plantrange"
                            multiline="true"
                            minRows="2"                               
                            sx={{ gridColumn: "span 1" }}
                        />                                                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ช่วงเวลาการเก็บเกี่ยว"
                            value={location.state.row.harvestrange }
                            name="harvestrange"
                            multiline="true"
                            minRows="2"                               
                            sx={{ gridColumn: "span 1" }}
                        />                                                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ราคาสมุนไพร (วัตถุดิบ)"
                            value={location.state.row.rawprice }
                            name="rawprice"
                            multiline="true"
                            minRows="2"                               
                            sx={{ gridColumn: "span 1" }}
                        />                                
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ราคาสมุนไพร (สำหรับแปรเป็นรูปยา)"
                            value={location.state.row.productprice }
                            name="productprice"
                            multiline="true"
                            minRows="2"                               
                            sx={{ gridColumn: "span 1" }}
                        />                                
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="คำแนะนำในการรับประทาน"
                            value={location.state.row.consumption}
                            name="consumption"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                         
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="องค์ประกอบทางเคมี"
                            value={location.state.row.chemical}
                            name="chemical"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การทดสอบทางคลินิก"
                            value={location.state.row.clinicaltest}
                            name="clinicaltest"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />                         
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ค่า pH ที่เหมาะสม"
                            value={location.state.row.ph}
                            name="ph"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="พื้นที่เหมาะสมในการปลูก"
                            value={location.state.row.soil}
                            name="soil"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="หมายเหตุ"
                            value={location.state.row.remark}
                            name="remark"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />   
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="อ้างอิง"
                            value={location.state.row.referencename}
                            name="referencename"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
                        />        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ที่มาของข้อมูล"
                            value={location.state.row.source}
                            name="source"
                            multiline="true"
                            minRows="2"                            
                            sx={{ gridColumn: "span 1" }}
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
                            <Item image={location.state.row.image}/>
                          </Box>                         */}
                          <Box>
                            {renderPhotos(selectedImages)}
                          </Box>                           
                          <Box>
        
                          </Box>
                      </Box> 
                      <Box display="flex" justifyContent="start"
                        sx={{
                          gridColumn: "span 2"
                      }}                    
                    >

                        <Button  
                            // onClick={handleCancelButtonClick}
                            onClick={() => (navigate(-1))}
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
                            กลับ
                        </Button>    
                        </Box>                
                        {/* <MuiSnackbar message="ยังไม่เปิดการเพิ่มข้อมูลตอนนี้" duration={4000} /> */}
                        {/* <MuiSnackbar message="บันทึกสำเร็จ" duration={4000} /> */}
                  </Box>   
                </form>

    </Box >
}

export default HerbalDetail