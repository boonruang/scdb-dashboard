import { Box, useTheme } from "@mui/material"
import { tokens } from '../theme'
import Iframe from 'react-iframe'

const GeoMapIframe = ({ url }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return <Box height="80vh" width="100%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
            <Iframe url={url}
              width="100%"
              height="100%"
              id=""
              className=""
              display="block"
              position="relative"
              />        
        </Box>

}

export default GeoMapIframe