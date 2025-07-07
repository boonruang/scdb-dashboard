import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box,Typography } from '@mui/material'
  
const ThankyouReg = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate('/login')
  },2000)


    return <Box m="20px" display="flex">
              <Box height="80vh" width="100%" textAlign="center"  alignContent='center'>
              <Typography variant="h1" component="h2">
                ขอบคุณครับ
              </Typography>
              </Box>
          </Box>
}

export default ThankyouReg