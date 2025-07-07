import { Box } from "@mui/material"
import Header from "../../components/Header"
import GeoMapIframe from "components/GeoMapIframe"

const Doughtfloodmap = () => {

    return <Box m="20px">
        <Header title="คาดการณ์ภัยพิบัติ" subtitle="ข้อมูลน้ำท่วม-ภัยแล้ง" />
        <GeoMapIframe
            url="../drougthfloodmap.html"
        />
        </Box>
}

export default Doughtfloodmap