import { Box, useTheme } from "@mui/material"
import { tokens } from "../theme"

const ProgressCircle = ({ progress = "0.75", size = "60", color }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const angle = progress * 360
    const fillColor   = color || colors.greenAccent[500]
    const trackColor  = colors.yellowAccent[500]

    return (
        <Box
            sx={{
                background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                    conic-gradient(transparent 0deg ${angle}deg, ${trackColor} ${angle}deg 360deg),
                    ${fillColor}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    )
}

export default ProgressCircle