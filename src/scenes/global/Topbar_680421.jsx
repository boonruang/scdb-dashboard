import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { ColorModeContext, tokens } from "../../theme"
import InputBase from "@mui/material/InputBase"
import LightModeOutlined from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlined from "@mui/icons-material/SettingsOutlined"
import PersonOutlined from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { useDispatch, useSelector } from "react-redux"
import * as loginActions from '../../actions/login.action'
import { useNavigate } from "react-router-dom"

const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const { result } = useSelector((state) => state.app.loginReducer)

//   console.log('isSidebar',isSidebar)    

const [anchorEl, setAnchorEl] = useState(null)
const open = Boolean(anchorEl)
const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
}

const handleClose = () => {
    setAnchorEl(null)
}

const handleLogout = () => {
    dispatch(loginActions.logout({navigate}))
}

    // return (<Box display="flex" justifyContent="space-between" p={2}>
    return ( isSidebar && (<Box display="flex" justifyContent="end" p={2} pb={0}>
        {/* SEARCH BAR */}
        {/* <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="ค้นหา" />
            <IconButton type="button" sx={{ p: 1 }} >
                <SearchIcon />
            </IconButton>
        </Box> */}

        {/* ICONS */}
        <Box display="flex">
            {/* <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined />
                ) : (
                    <LightModeOutlined />
                )}
            </IconButton> */}
            {/* <IconButton>
                <NotificationsOutlined />
            </IconButton> */}
            {/* <IconButton>
                <SettingsOutlined />
            </IconButton> */}
            <IconButton onClick={handleClick}>
                <PersonOutlined />
            </IconButton>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={handleClose}>{result?.username}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    </Box>)
    )
}

export default Topbar