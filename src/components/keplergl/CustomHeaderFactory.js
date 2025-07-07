import React from 'react'
import { Typography, useTheme  } from "@mui/material"
import { tokens } from '../../theme';

function CustomHeaderFactory() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
        <Typography
          variant="h5"
          sx={{ textAlign: 'center' }}
          color={colors.greenAccent[400]}
        >
              HerbHuk
        </Typography>      
  )
}

export default CustomHeaderFactory