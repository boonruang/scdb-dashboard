import { useEffect, useState } from "react";
// import useSWR from "swr";
// import Item from './Item'
import { useSelector, useDispatch } from "react-redux";
import { setStateFarmergroupToSelected, } from '../actions/farmergroup.action'
import { getHerbalByKeyword  } from '../actions/herbal.action'
import { getHerbalSelectedById } from '../actions/herbalselectedmap.action'
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

  const handleClick = (selectedProp) => {
    setIsDetail(!isDetail)
    console.log('isDetail',isDetail)
    console.log('selectedProp',selectedProp)
    dispatch(getHerbalSelectedById(selectedProp.id))
  }

  return (
    <Box  key={result.id} display="flex" justifyContent="space-between" alignItems="center">
      <Box sx={{ m: 1,cursor: 'pointer' }} 
      onClick={() => handleClick(result)}
      >
        <Divider sx={{ mb: 1 }}/>
          <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 1, maxWidth: 140 }} >
            <Box>
              <Typography variant="h6" color={colors.greenAccent[400]}>
                {result?.herbalname && result.herbalname}
              </Typography>                
            </Box>
            {/* <Box>
              <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                ชื่อสามัญ
              </Typography>              
              <Typography ml="5px" variant="body2" display='inline'>
              {result?.commonname && result.commonname}
              </Typography>                   
            </Box> */}
            <Box>
              <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                ชื่อวิทยาฯ
              </Typography>              
              <Typography ml="5px" variant="body2" display='inline'>
              {result?.scientificname && result.scientificname}
              </Typography>                   
            </Box>    
            {/* <Box>
              <Typography variant="body2" color={colors.greenAccent[600]} display='inline'>
                ชื่ออื่นๆ
              </Typography>              
              <Typography ml="5px" variant="body2" display='inline'>
              {result?.othername && result.othername}
              </Typography>                   
            </Box>                       */}
          </Box>    
          {/* <Divider sx={{ mt: 1.5 }}/> */}
      </Box>

      <Box justifyContent="center" alignItems="center" sx={{ m: 1}}>
          <Box component="img"
              sx={{
                Height: 100,
                width: 100,
                // minHeight: 55,
                // maxHeight: 80,
                borderRadius: 0.5,
              }}    
              alt="The photo of farmergroup"  
              src={result?.image ? imagesUrl+ result?.image : imagesUrl+"image6.jpg"}
              >
          </Box>
      </Box>
    </Box>
  )
}


const SoilHerbalsList = ({searchTerm}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const StyledListDisplay = styled.div`
  position: absolute;
  z-index: 100;
  top: 45px;
  left: 0px;
  background-color:${colors.primary[400]}
  font-size: 11px;
  /* width: 300px; */
  width: 300px;
  word-wrap: break-word;
  /* height: 100%; */
  min-height: 60px;
  max-height: 100%;
  /* padding: 10px; */
  overflow-x: hidden;
  overflow-y: auto;
  `;

  const dispatch = useDispatch()

  useEffect(() => {
    if (searchTerm !== '') {
      dispatch(getHerbalByKeyword(searchTerm))
    }
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.herbalReducer)
  // const { soilherbal } = useSelector((state) => state.keplerGl)

  // if (result) {
  //   console.log('see result',result)
  // }
  
  let content
  if (isFetching) content = <Box>Loading...</Box>
  else if (isError) content = <Box>Something went wrong..</Box>
  else if (result) {
    const results = result
    content = (
      <StyledListDisplay>
          {
            Object.values(results).map(result => {
              return <Item key={result.id} result={result} />
            })
          }
      </StyledListDisplay>  
    )
  } else {
    content = (
      <StyledListDisplay>
        อุ้ย หาไม่เจออ่ะ
      </StyledListDisplay>      
    )
  } 
  return content
}
export default SoilHerbalsList