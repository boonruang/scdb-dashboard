import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHerbalByKeyword } from '../actions/herbal.action'
import { Box,Typography,useTheme,CardActionArea,Grid  } from "@mui/material"
import { tokens } from '../theme';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { getHerbalSelectedById } from '../actions/herbalselected.action'
import CircularProgress from '@mui/material/CircularProgress';

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Item = ({ result }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  const handleClick = (selectedHerbal) => {
    console.log('selectedHerbal',selectedHerbal)
    // dispatch(setStateFarmergroupToSelected(selectedHerbal))
    dispatch(getHerbalSelectedById(selectedHerbal.id))
  }

  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}} style={{ marginBottom: "20px"}}>
          <CardActionArea onClick={() => handleClick(result)}>
            <CardMedia
              component="img"
              height="220"
              image={imagesUrl+result.image}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
                {result.herbalname && result.herbalname.substring(0, 50)}
                </Typography>
                <Box>
                  <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                  ชื่อสามัญ
                  </Typography>
                  <Typography ml="5px" variant="body2" display='inline'>
                  {result.commonname && result.commonname.substring(0, 70)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                  ชื่อวิทยาศาสตร์
                  </Typography>
                  <Typography ml="5px" variant="body2"  display='inline'>
                  {result.scientificname && result.scientificname.substring(0, 70)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                  ชื่อทั่วไป
                  </Typography>
                  <Typography ml="5px"  variant="body2" style={{display: 'inline-block'}}>
                  {result.othername && result.othername.substring(0, 70)}
                  </Typography>
                </Box>
                {/* <Typography gutterBottom variant="h6" component="div">
                  More
                </Typography> */}
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
        )
      }

const HerbalList = ({searchTerm}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHerbalByKeyword(searchTerm))
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.herbalReducer)
  
  let content
  if (isFetching) content =  <Box height="75vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>
  else if (isError) content = <Box height="75vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}>Something went wrong..</Box>
  else if (result ) {
    // const results = result?.features
    content = (
      <Grid container spacing={5} style={{ marginTop: "20px"}}>
          {
            Object.values(result).map(result => {
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
export default HerbalList