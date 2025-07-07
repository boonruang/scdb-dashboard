import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import useSWR from "swr";
// import Item from './Item'
// import { getMarketplaceByKeyword } from '../actions/marketplace.action'
import { getFarmergroupByKeyword } from '../actions/farmergroupmap.action'
import { Box,Typography,IconButton,useTheme,Divider  } from "@mui/material"
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';
import { tokens } from '../theme';
import PlaceIcon from '@mui/icons-material/Place';
import { gridVisibleColumnDefinitionsSelector } from "@mui/x-data-grid";
import { wrapTo, updateMap } from '@kepler.gl/actions'


const Item = ({ result }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  const handleClick = (props) => {
    // console.log('clicked',props)
    dispatch(wrapTo('farmergroup',updateMap({latitude: props.lat, longitude: props.long, zoom: 12})))
  }

  return (
      <Box  backgroundColor={colors.primary[400]} key={result.properties.Id} sx={{ m: 1 }} >
          <Divider sx={{ mb: 1 }}/>
          <Box
              sx={{ m: 1,cursor: 'pointer' }} 
              onClick={() => handleClick({lat: result.properties.latitude, long: result.properties.longitude})}              
          >
            <Box
                display="flex"
                // backgroundColor={colors.blueAccent[400]}
                borderRadius="3px"
                // justifyContent="center"
                alignItems="center"
            >
                <IconButton type="button" sx={{ p: 1 }} >
                    <PlaceIcon />
                </IconButton>
                <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                >
                        {result.properties.farmergroupname}
                </Typography>            
            </Box>     
            <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 2 }} >
              <Box>{result.properties.tambon} {result.properties.herbal}</Box>
              <Box>{result.properties.amphoe} {result.properties.province} {result.properties.postcode}</Box>
              <Box>{result.properties.facility} {result.properties.utility} </Box>
            </Box> 
          </Box>             
      </Box>

  )
}


const FarmergroupList = ({searchTerm}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const StyledMapConfigDisplay = styled.div`
  position: absolute;
  z-index: 100;
  /* top: 0px; */
  top: 45px;
  left: 0px;
  background-color: ${colors.primary[400]};
  font-size: 11px;
  width: 300px;
  color: ${theme.textColor};
  word-wrap: break-word;
  /* height: 100%; */
  min-height: 60px;
  max-height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  `;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFarmergroupByKeyword(searchTerm))
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.farmergroupmapReducer)
  if (result) {
    console.log('see result check',result)
  }
  
  let content
  if (isFetching) content = <Box>Loading...</Box>
  else if (isError) content = <Box>Something went wrong..</Box>
  else if (result?.features ) {
    const results = result?.features
    content = (
      <StyledMapConfigDisplay>
          {
            Object.values(results).map(result => {
              return <Item key={result.properties.Id} result={result} />
            })
            }
      </StyledMapConfigDisplay>  
    )
  } else {
    content = (
      <StyledMapConfigDisplay>
        อุ้ย หาไม่เจออ่ะ
      </StyledMapConfigDisplay>      
    )
  } 
  return content
}
export default FarmergroupList