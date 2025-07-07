import { Box } from "@mui/material"
import Header from "../../components/Header"
import LineChart from "../../components/LineChart"

const Line = () => {

    return <Box m="20px">
        <Header title="แผนภูมิเส้น" subtitle="แผนภูมิเส้นแบบพื้นฐาน" />
        <Box height="70vh">
            <LineChart />
        </Box>
    </Box>
}

export default Line