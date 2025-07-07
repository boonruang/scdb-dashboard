import { useState } from 'react'
import { Box, Typography,useTheme } from "@mui/material"
import { tokens } from '../../theme'
import Header from "../../components/Header"
import { server } from '../../constants/index'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'

const Maps = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const position = { lat: 16.245270, lng: 103.250519}
    
    const [open, setOpen] = useState(false)

    return <Box m="20px">
        <Header title="คาดการณ์ภัยพิบัติ" subtitle="ข้อมูลน้ำท่วม-ภัยแล้ง" />

            <APIProvider apiKey={server.GOOGLEMAPS_API}>
                <Typography>
                    Google Maps
                </Typography>
                <Box height="80vh" width="100%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
                    <Map defaultZoom={10} center={position} mapId={server.GOOGLEMAPS_ID}>
                        <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                            <Pin />
                        </AdvancedMarker>
                        {open && 
                        <InfoWindow position={position} onCloseClick={ () => setOpen(false)}>
                            <Typography>I'm in Mahasarakham University</Typography>    
                        </InfoWindow>
                        }
                    </Map>
                </Box>
            </APIProvider>

        </Box>
}

export default Maps