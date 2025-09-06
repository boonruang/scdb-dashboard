import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme"
import ProgressCircle from "./ProgressCircle"


const StatBoxStudent = ({ title, subtitle, icon }) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="center">
                <Box>
                    <Typography
                        variant="h1"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100], textAlign: 'center' }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{ color: colors.greenAccent[500], textAlign: 'center' }}
                    >
                        {subtitle}
                    </Typography>                    
                </Box>
            </Box>
        </Box>
    )
}

export default StatBoxStudent