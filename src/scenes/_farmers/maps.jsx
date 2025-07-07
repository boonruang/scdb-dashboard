import { useState } from 'react'
import { Box, Typography,useTheme } from "@mui/material"
import { tokens } from '../../theme'
import Header from "../../components/Header"
import { server } from '../../constants/index'
import {
    APIProvider,
    Map,
    Marker,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps'

const Maps = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    
    const INITIAL_CENTER = { lat: 16.245270, lng: 103.250519}
    const INITIAL_ZOOM = 12
    
    const [center, setCenter] = useState(INITIAL_CENTER);

    return <Box m="20px">
        <Header title="พิกัดแปลงเกษตรกร" />

            <APIProvider apiKey={server.GOOGLEMAPS_API}>
                <Typography>
                    Google Maps { center.lat+' '+center.lng}
                </Typography>
                <Box height="80vh" width="100%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
                    <Map mapId={server.GOOGLEMAPS_ID}
                        defaultCenter={INITIAL_CENTER}
                        defaultZoom={INITIAL_ZOOM}
                        gestureHandling={'greedy'}
                        disableDefaultUI={false}>
                        <Marker
                        position={center}
                        draggable
                        onDrag={e =>
                            setCenter({lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0})
                        }
                        />
                    </Map>                        
                </Box>
            </APIProvider>

        </Box>
}

export default Maps