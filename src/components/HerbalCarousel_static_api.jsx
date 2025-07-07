import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { HerbalCard } from './HerbalCard';
import { responsive } from '../data/mockCarouselData';
import { Box, Typography } from '@mui/material'

import { useTheme } from '@mui/material'
import { tokens } from '../theme';
import { useEffect } from 'react';
import { getHerbals } from 'actions/herbal.action';

const HerbalCarousel = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getHerbals)
  },[dispatch])

  const { result } = useSelector((state) => state.app.herbalReducer)

  const herbals = result.map(item => (
    <HerbalCard key={item.id} item={item}/>
  ))

  return (
    <Box> 
      <Typography gutterBottom variant="h3" component="div" color={colors.primary[400]}>
        สมุนไพรของกลุ่มเกษตรกร
      </Typography>
      <Box >
          <Carousel
          swipeable={false}
          draggable={false}
          infinite={true} responsive={responsive}>          
            {herbals}
          </Carousel>
      </Box>
    </Box>
  );

}

export default HerbalCarousel