import { Typography, Box, useTheme } from "@mui/material"
import { tokens } from '../theme'
import { useSelector } from "react-redux"

const Header = ({ title, subtitle }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const sidebarState = useSelector((state) => state.app.appReducer)

    return ( <Box mb="10px">
        <Typography
            variant="h4"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
        >
            {title}
        </Typography>
        <Typography
            variant="h5"
            color={colors.greenAccent[400]}
        >
            {subtitle}
        </Typography>
    </Box>
    )
}

export default Header