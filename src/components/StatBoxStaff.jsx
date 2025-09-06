import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme"
import ProgressCircle from "./ProgressCircle"


const StatBoxStaff = ({ title, subtitle, icon }) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="center">
                <Box>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100], textAlign: 'center' }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ color: colors.greenAccent[500], textAlign: 'center' }}
                    >
                        {subtitle}
                    </Typography>                    
                </Box>
            </Box>
        </Box>
    )
}

export default StatBoxStaff