import { useEffect } from "react";
// import useSWR from "swr";
// import Item from './Item'
import { useSelector, useDispatch } from "react-redux";
import { getMarketplaceByKeyword } from '../actions/marketplace.action'
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
    dispatch(wrapTo('mkplc',updateMap({latitude: props.lat, longitude: props.long, zoom: 12})))
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
                        {result.properties.marketplacename}
                </Typography>            
            </Box>     
            <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 2 }} >
              <Box>{result.properties.address} {result.properties.tambon} {result.properties.amphoe}</Box>
              <Box>{result.properties.province} {result.properties.postcode}</Box>
            </Box> 
          </Box>             
      </Box>

  )
}


const MarketplaceList = ({searchTerm}) => {
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
    dispatch(getMarketplaceByKeyword(searchTerm))
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.marketplaceReducer)
  // if (result) {
  //   console.log('see result',result)
  // }
  
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
export default MarketplaceList