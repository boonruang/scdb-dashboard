import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { HerbalCard } from './HerbalCard';
import { productData, responsive } from '../data/mockCarouselData';
import { Box, Typography } from '@mui/material'

import { useTheme } from '@mui/material'
import { tokens } from '../theme';
import { useEffect } from 'react';
import { getHerbals } from 'actions/herbal.action';

export const HerbalCarousel = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getHerbals())
  },[dispatch])

  const { result } = useSelector((state) => state.app.herbalReducer)

  if (result) {
    console.log('herbal result',result)
  }

  const product = productData.map(item => (
    <HerbalCard key={item.id} item={item}/>
  ))

  return (
    // <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"> 
    <Box> 
      <Typography gutterBottom variant="h3" component="div" color={colors.primary[400]}>
        สมุนไพรของกลุ่มเกษตรกร
      </Typography>
      {/* <Box sx={{ maxWidth: 1200 }}> */}
      <Box >
          {/* <Carousel containerClass="carousel-container" responsive={responsive}> */}
          <Carousel infinite={true} responsive={responsive}>          
            {product} 
          </Carousel>
      </Box>
    </Box>
  );

}

