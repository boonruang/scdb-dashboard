import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHerbalByKeyword } from '../actions/herbal.action'
import { Box,Typography,useTheme,CardActionArea,Grid  } from "@mui/material"
import { tokens } from '../theme';
import {Card,CardMedia,CardContent,Button } from '@mui/material';
import { getHerbalSelectedById } from '../actions/herbalselected.action'
import CircularProgress from '@mui/material/CircularProgress';
import IosShareIcon from '@mui/icons-material/IosShare';

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Item = ( {result} ) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  const ExportExcelButton = (url) => {
    window.location.href = url
  }

  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}} style={{ marginBottom: "5px"}}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="100"
              image={imagesUrl+result.image}
              alt="herbal"
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
 
                  <Button  onClick={() => ExportExcelButton(result.export)}
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
                      ส่งออกไฟล์ Excel
                  </Button>               
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
        )
      }

const Cardexportdata = ({mockExportData}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getHerbalByKeyword(searchTerm))
  //   console.log('useEffect is called', searchTerm)
  // },[dispatch,searchTerm])

  // const { result, isFetching, isError } = useSelector((state) => state.app.herbalReducer)
  
  let content

 if (mockExportData ) {
    // const results = result?.features
    content = (
      <Grid container spacing={5} style={{ marginTop: "20px"}}>
          {
            Object.values(mockExportData).map(result => {
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