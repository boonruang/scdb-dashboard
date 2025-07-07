import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { productData, responsive } from '../data/mockCarouselData';
import { Box, Typography } from '@mui/material'

import { useTheme } from '@mui/material'
import { tokens } from '../theme';
import { useEffect } from 'react';
import { getHerbals } from 'actions/herbal.action';
import { SoilHerbalCard } from './SoilHerbalCard';

const SoilHerbalCarousel = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()


  // useEffect(() => {
  //   dispatch(getHerbals())
  // },[dispatch])

  // const { result } = useSelector((state) => state.app.herbalReducer)
  
  // if (result) {
  //   console.log('herbal result',result)
  // }

  const product = productData.map(item => (
    <SoilHerbalCard key={item.id} item={item}/>
  ))

  return (
    <Box> 
      <Typography gutterBottom variant="h3" component="div" color={colors.primary[400]}>
        สมุนไพรที่เหมาะสมในการปลูก
      </Typography>
      <Box >
          <Carousel infinite={true} responsive={responsive}>          
            {product} 
          </Carousel>
      </Box>
    </Box>
  );
}

export default SoilHerbalCarousel

