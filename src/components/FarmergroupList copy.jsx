import { useEffect, useState } from "react";
// import useSWR from "swr";
// import Item from './Item'
import { useSelector, useDispatch } from "react-redux";
import { getFarmergroupByKeyword, setStateFarmergroupToSelected, getFarmergroupById } from '../actions/farmergroupmap.action'
import { Box,Typography,IconButton,useTheme  } from "@mui/material"
import styled from 'styled-components'
// import {theme} from '@kepler.gl/styles';
import { tokens } from '../theme';
import PlaceIcon from '@mui/icons-material/Place';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { wrapTo, updateMap } from '@kepler.gl/actions'

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
    // dispatch(setStateFarmergroupToSelected(selectedProp))
    dispatch(getFarmergroupById(selectedProp.Id))
    dispatch(wrapTo('farmergroup',updateMap({latitude: selectedProp.latitude, longitude: selectedProp.longitude, zoom: 12})))
  
  }

  return (
    <Box  key={result.properties.Id} display="flex" justifyContent="space-between" alignItems="center">
      <Box sx={{ m: 1,cursor: 'pointer' }} 
      onClick={() => handleClick(result.properties)}
      >
        <Divider sx={{ mb: 1 }}/>
          <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 1, maxWidth: 140 }} >
            <Box>
              <Typography
                variant="h6"
                color={colors.greenAccent[400]}
                >
                {result.properties.farmergroupname}
              </Typography>                
            </Box>
            <Box>{result.properties.no} {result.properties.moo} {result.properties.village}</Box>
            <Box>{result.properties.tambon} {result.properties.amphoe}</Box>
            <Box>{result.properties.province} {result.properties.postcode}</Box>
          </Box>    
          {/* <Divider sx={{ mt: 1.5 }}/> */}
      </Box>

      <Box justifyContent="center" alignItems="center" sx={{ m: 1}}>
          <Box component="img"
              sx={{
                minHeight: 55,
                maxHeight: 80,
                borderRadius: 0.5,
              }}    
              alt="The photo of farmergroup"  
              src={result.properties.image ? imagesUrl+ result.properties.image : imagesUrl+"image6.jpg"}
              >
          </Box>
      </Box>
    </Box>
  )
}


const FarmergroupList = ({searchTerm}) => {
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
    dispatch(getFarmergroupByKeyword(searchTerm))
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.farmergroupmapReducer)
  // if (result) {
  //   console.log('see result',result)
  // }
  
  let content
  if (isFetching) content = <Box>Loading...</Box>
  else if (isError) content = <Box>Something went wrong..</Box>
  else if (result?.features ) {
    const results = result?.features
    content = (
      <StyledListDisplay>
          {
            Object.values(results).map(result => {
              return <Item key={result.properties.Id} result={result} />
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
export default FarmergroupList