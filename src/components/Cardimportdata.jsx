import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box,Typography,useTheme,CardActionArea,Grid  } from "@mui/material"
import { tokens } from '../theme';
import {Card,CardMedia,CardContent,Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IosShareIcon from '@mui/icons-material/IosShare';

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Item = ( {result} ) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const fileInputRef = useRef(null);

  const dispatch = useDispatch()

  // const ImportExcelButton = (url) => {
  //       window.location.href = url
  // }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("ไฟล์ที่เลือก:", file.name);
      // TODO: เขียนโค้ดนำไฟล์ไปประมวลผล เช่น อ่าน Excel
    }
  };

  return (
    <Grid item xs={12} sm={4} ms={4} >
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
                    onChange={handleFileChange}
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
                      <IosShareIcon sx={{ mr: "10px" }} />
                      นำเข้าไฟล์ Excel
                  </Button>               
              </CardContent>
          </CardActionArea>
        </Card>
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