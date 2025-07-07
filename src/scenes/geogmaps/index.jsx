import { Box } from "@mui/material"
import Header from "../../components/Header"
import GeoMapIframe from "components/GeoMapIframe"

const GeoGmaps = () => {

    return <Box m="20px">
        <Header title="ข้อมูลแผนที่" subtitle="พิกัดตำแหน่ง" />
        <GeoMapIframe
            url="https://thunbergii.app.carto.com/map/38143baa-eb58-4998-99bb-1ed8ecfd31c0"
        />
        </Box>
}

export default GeoGmaps