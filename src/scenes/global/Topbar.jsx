import { Box, IconButton, useTheme, Menu, MenuItem, Modal, Button, TextField, Typography, Snackbar } from "@mui/material"
import React, { useContext, useState, useEffect } from "react"
import { ColorModeContext, tokens } from "../../theme"
import PersonOutlined from "@mui/icons-material/PersonOutlined"
import { useDispatch, useSelector } from "react-redux"
import * as loginActions from '../../actions/login.action'
import * as farmerActions from '../../actions/farmer.action'
import { useNavigate } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';

const Topbar = () => {
    const theme = useTheme()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const { result } = useSelector((state) => state.app.loginReducer)

    const farmerReducer = useSelector((state) => state.app.farmerReducer)

const [anchorEl, setAnchorEl] = useState(null)
const open = Boolean(anchorEl)
const [openModal, setOpenModal] = useState(false)
const [username, setUsername] = useState("")
const [roles, setRoles] = useState([])
const [currentPassword, setCurrentPassword] = useState("")
const [newPassword, setNewPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [error, setError] = useState("")
const [snackBarOpen, setSnackBarOpen] = useState(false)

useEffect(() => {
    setUsername(result?.username)
},[result?.username])

useEffect(() => {
    setRoles(result?.roles)
},[result?.roles])

const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
}

const handleClose = () => {
    setAnchorEl(null)
}

const handleLogout = () => {
    dispatch(loginActions.logout({navigate},roles))
}

const handleOpenChangePassword = () => {
    setOpenModal(true)
}

const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
    return
    }
    setSnackBarOpen(false)
}

const MuiSnackbar = ({message,duration}) => {

    const action = (
    <React.Fragment>
        <Button color="secondary" size="small" onClick={handleSnackbarClose}>
        ปิด
        </Button>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
    );    

    return (
    <React.Fragment>
    <Snackbar message={message}
        autoHideDuration={duration}
        open={snackBarOpen}
        onClose={handleSnackbarClose}
        severity="success"
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
        }}
        action={action}
    /> 
    </React.Fragment> 
    )
} 

const handleChangePassword = () => {

    handleClose()
        
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!currentPassword || !newPassword || !confirmPassword) {
        setError("กรุณากรอกข้อมูลให้ครบทุกช่อง")
        return
    }

    if (newPassword !== confirmPassword) {
        setError("รหัสผ่านใหม่ไม่ตรงกัน")
        return
    }

    // dispatch action ไปที่ backend
    dispatch(farmerActions.changePassword({
        username,
        currentPassword,
        newPassword,
        navigate
    }))

    setSnackBarOpen(true)

    // reset state
    setOpenModal(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError("")
}

const handleCancel = () => {
    setOpenModal(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError("")
}
    return ( isSidebar && (<Box display="flex" justifyContent="end" p={2} pb={0}>
        {/* ICONS */}
        <Box display="flex">
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
                <MenuItem onClick={handleOpenChangePassword}>เปลี่ยนรหัสผ่าน</MenuItem>
                <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
            </Menu>
              {/* Change Password Modal */}
              <Modal
                    open={openModal}
                    onClose={handleCancel}
                    aria-labelledby="change-password-modal"
                    aria-describedby="change-password-form"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            right: '5%',
                            width: 350,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 3,
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6">เปลี่ยนรหัสผ่าน</Typography>

                        <TextField
                            fullWidth
                            type="password"
                            label="รหัสผ่านเดิม"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="รหัสผ่านใหม่"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="ยืนยันรหัสผ่านใหม่"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mt: 2 }}
                        />

                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                            <Button variant="outlined" onClick={handleCancel}>ยกเลิก</Button>
                            <Button variant="contained" onClick={handleChangePassword}>ตกลง</Button>
                        </Box>
                    </Box>
                </Modal>     
        </Box>
        <MuiSnackbar message={farmerReducer?.isChangeSuccess ? "เปลี่ยนรหัสผ่านสำเร็จ" : "เปลี่ยนรหัสผ่านไม่สำเร็จ"} duration={6000} />      
    </Box>)
    )
}

export default Topbar