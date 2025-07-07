import { useEffect, useState } from "react";
// import useSWR from "swr";
// import Item from './Item'
import { useSelector, useDispatch } from "react-redux";
// import { setStateFarmergroupToSelected, } from '../actions/farmergroup.action'
// import { getHerbalByKeyword  } from '../actions/herbal.action'                
// import { getHerbalSelectedById  } from '../actions/herbalselected.action'                
import { getHerbalByRecommended } from '../actions/herbalrecommended.action'                
import { Box,Typography,IconButton,useTheme  } from "@mui/material"
import styled from 'styled-components'
// import {theme} from '@kepler.gl/styles';
import { tokens } from '../theme';
import PlaceIcon from '@mui/icons-material/Place';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Item = ({ result }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  const [isDetail, setIsDetail] = useState(false)

  // const handleClick = (selectedProp) => {
  //   setIsDetail(!isDetail)
  //   console.log('isDetail',isDetail)
  //   console.log('selectedProp',selectedProp)
  //   dispatch(getHerbalSelectedById(selectedProp.id))
  // }

  return (
    <Box  key={result.id} display="flex" justifyContent="space-between" alignItems="center">
      <Box sx={{ m: 1,cursor: 'pointer' }} 
      // onClick={() => handleClick(result)}
      >
        <Divider sx={{ mb: 1 }}/>
          <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 1, maxWidth: 220 }} >
            <Box>
              <Typography variant="h6" color={colors.greenAccent[400]}>
                {result.herbalname && result.herbalname.substring(0, 20)}
              </Typography>                
            </Box>
            <Box>
              <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                ความเป็นกรดด่าง
              </Typography>              
              <Typography ml="5px" variant="body2" display='inline'>
              {result.ph}
              </Typography>                   
            </Box>
            <Box>
              <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                ลักษณะดิน
              </Typography>              
              <Typography ml="5px" variant="body2" display='inline'>
              {result.soil}
              </Typography>                   
            </Box>                         
          </Box>    
          {/* <Divider sx={{ mt: 1.5 }}/> */}
      </Box>

      {/* <Box justifyContent="center" alignItems="center" sx={{ m: 1}}>
          <Box component="img"
              sx={{
                Height: 100,
                width: 100,
                // minHeight: 55,
                // maxHeight: 80,
                borderRadius: 0.5,
              }}    
              alt="The photo of farmergroup"  
              src={result.image ? imagesUrl+ result.image : imagesUrl+"image6.jpg"}
              >
          </Box>
      </Box> */}
    </Box>
  )
}

const SoilHerbalsListRight = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const HerbalRecommendBox = styled.div`
  position: absolute;
  z-index: 10;
  top: 5px;
  right: 5px;
  background-color:${colors.primary[400]}
  font-size: 11px;
  /* width: 300px; */
  width: 250px;
  /* word-wrap: break-word; */
  /* height: 100%; */
  min-height: 60px;
  max-height: 100px;
  /* padding: 10px; */
  overflow-x: hidden;
  overflow-y: auto;
  `;

  const StyledListDisplay = styled.div`
  position: absolute;
  z-index: 10;
  top: 80px;
  right: 5px;
  background-color:${colors.primary[400]}
  font-size: 11px;
  /* width: 300px; */
  width: 250px;
  word-wrap: break-word;
  /* height: 100%; */
  min-height: 0px;
  /* max-height: 100%; */
  max-height: 500px;
  /* padding: 10px; */
  overflow-x: hidden;
  overflow-y: auto;
  `;

  const dispatch = useDispatch()

  const [soilPh, setSoilPh] = useState()
  const [soilTexture, setSoilTexture] = useState()

  const { soilherbal } = useSelector((state) => state.keplerGl)

  // if (soilherbal?.visState?.clicked?.object?.properties?.ph_top) {
  //   console.log('ph_top',soilherbal?.visState?.clicked?.object?.properties?.ph_top)
  // }
  // if (soilherbal?.visState?.clicked?.object?.properties?.texture_to) {
  //   console.log('texture_to',soilherbal?.visState?.clicked?.object?.properties?.texture_to)
  // }
  
    useEffect(() => {
      if (soilherbal?.visState?.clicked?.object?.properties?.ph_top) {
      switch(soilherbal?.visState?.clicked?.object?.properties?.ph_top) {
        case 'กรดจัดมากถึงกรดจัด':
          setSoilPh('5.0-6.0')
          break;
        case 'กรดจัดมากถึงกรดปานกลาง':
          setSoilPh('5.5-6.5')
          break;
        case 'กรดจัดถึงกรดปานกลาง':
          setSoilPh('6.0-7.0')
          break;
        case 'กรดจัดถึงกรดเล็กน้อย':
          setSoilPh('6.0-7.0')
          break;
        case 'กรดปานกลางถึงกรดเล็กน้อย':
          setSoilPh('6.0-7.0')
          break;
        default:
          setSoilPh('6.0-7.0')
        }
      }

      if (soilherbal?.visState?.clicked?.object?.properties?.texture_to) {
      switch(soilherbal?.visState?.clicked?.object?.properties?.texture_to) {
        case 'ดินทรายปนดินร่วน':
          setSoilTexture('ดินทราย')
          break;
        case 'ดินร่วน':
          setSoilTexture('ดินร่วน')
          break;
        case 'ดินร่วนปนดินเหนียว':
          setSoilTexture('ดินร่วน')
          break;
        case 'ดินร่วนปนทราย':
          setSoilTexture('ดินร่วนปนทราย')
          break;
        case 'ดินร่วนปนทรายแป้ง':
          setSoilTexture('ดินร่วน')
          break;
        case 'ดินร่วนเหนียวปนทรายแป้ง':
          setSoilTexture('ดินร่วน')
          break;
        case 'ดินเหนียวปนทรายแป้ง':
          setSoilTexture('ดินเหนียว')
          break;
        default:
          setSoilTexture('เหนียว')
        }    
      }    
  },[soilherbal])

  useEffect(() => {
    dispatch(getHerbalByRecommended(soilPh, soilTexture))
    console.log('useEffect dispatch getHerbalByRecommended is called')
  },[dispatch,soilPh,soilTexture])

  const { recommendedResult, isRecommendedFetching, isRecommendedError} = useSelector((state) => state.app.herbalrecommendedReducer)

  // if (recommendedResult) {
  //   console.log('see recommendedResult',recommendedResult)
  // }
  
  let content
  if (isRecommendedFetching) content = <Box>Loading...</Box>
  else if (isRecommendedError) content = <Box>Something went wrong..</Box>
  else if (recommendedResult) {
    const results = recommendedResult
    content = (
      <div>
      <HerbalRecommendBox>
        <Box sx={{ m: '10px 15px' }}>
          <Box>
            <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
              สมุนไพรที่เหมาะปลูกในพื้นที่
            </Typography>              
          </Box>         
           <Box>
            <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
              ความเป็นกรดเป็นด่าง
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            { soilPh && soilPh}
            </Typography>                   
          </Box> 
          <Box>
            <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
              ลักษณะดิน
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            { soilTexture && soilTexture}
            </Typography>                   
          </Box>  
        </Box> 
       </HerbalRecommendBox>
        <StyledListDisplay>
            {
              Object.values(results).map(result => {
                return <Item key={result.id} result={result} />
              })
            }
        </StyledListDisplay>   
      </div>      
    )
  } else {
    content = (
      <HerbalRecommendBox>
        อุ้ย หาไม่เจออ่ะ
        <Box>
            <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
              ความเป็นกรดเป็นด่าง
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            { soilPh && soilPh}
            </Typography>                   
          </Box> 
          <Box>
            <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
              ลักษณะดิน
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            { soilTexture && soilTexture}
            </Typography>                   
          </Box>
      </HerbalRecommendBox>      
    )
  } 
  return content
}
export default SoilHerbalsListRight