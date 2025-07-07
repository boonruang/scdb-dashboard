import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField,
    Select,
    MenuItem,
    Typography
  } from '@mui/material'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from '../../actions/role.action'
import { addUser } from '../../actions/user.action'
import { useNavigate, useLocation } from 'react-router-dom'
import { isValidDate } from '@fullcalendar/core/internal'
import { Formik, Field, Form, FieldArray } from 'formik'
import { TextField as txtField } from 'formik-material-ui'
import RemoveIcon from '@mui/icons-material/Remove';
import MessageBox from 'components/MessageBox'


const UsersDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  
  console.log('location state row',location.state.row)
 
    const isNonMobile = useMediaQuery("(min-width:600px)")

    return <Box m="20px">
        <Header title="รายละเอียดข้อมูลผู้ใช้" subtitle="รายละเอียดข้อมูลผู้ใช้ในระบบ"/>
              <Box mt="40px" >
                  <Box sx={{ m: '5px'}} >
                    <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        mt: "20px",
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                    }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัส"
                            value={location.state.row.id}
                            name="id"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อเข้าระบบ"
                            value={location.state.row.username}
                            name="username"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        {/* <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="รหัสผ่าน"
                            value={location.state.row.password}
                            name="password"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />    */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อ"
                            value={location.state.row.firstname}
                            name="firstname"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="นามสกุล"
                            value={location.state.row.lastname}
                            name="lastname"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                        
                      <Select
                          labelId="label-select-status"
                          id="select-status"
                          // value={roleSelected}
                          // onChange={handleRoleSelection}
                          value={location.state.row.status}
                          name='status'
                          disabled
                          sx={{ gridColumn: "span 2" }}
                        >
                          <MenuItem key="1" value={true}>Active</MenuItem>
                          <MenuItem key="2" value={false}>Inactive</MenuItem>
                      </Select>   

                    </Box>
                  </Box>

                <Box mt="20px"
                    borderRadius="3px"
                    sx={{
                        border: 1,
                        borderColor: colors.greenAccent[600],
                    }}> 
                    <Box ml="20px" mt="20px" >
                        <Typography>
                            สิทธิ์ของสมาชิก
                        </Typography>            
                    </Box>   
                                     
                    <Box mt="10px"
                        // borderRadius="3px"
                        // sx={{
                        //     border: 1,
                        //     borderColor: colors.greenAccent[600],
                        // }}
                        >                         
                      {location.state.row.roles.map((item, index) => (                   
                        <Box  key={index} mt="10px"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        borderRadius="3px"
                        sx={{
                            padding: "10px 20px",
                            mr: "10px",
                            mb: "10px",                                
                            // border: 1,
                            // borderColor: colors.greenAccent[600],
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}>

                            <TextField
                                fullWidth
                                variant="filled"
                                label="รหัส"
                                value={item.id}
                                sx={{ gridColumn: "span 2" }}
                                disabled
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="กลุ่ม"
                                value={item.name}
                                sx={{ gridColumn: "span 2" }}
                                disabled
                            />                             
                          
                        </Box>
                      ))}  
                    </Box>
                    </Box> 
                  <Box>

              </Box>

                    <Box display="flex" justifyContent="start"
                      sx={{
                        mt: "20px",
                      }} 
                    >
                        <Button  
                            onClick={() => navigate(-1)}
                            type='button'
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.blueAccent[700]}
                            }}
                        >
                            กลับ
                        </Button>                 
                </Box>                    
        </Box>
    </Box >
}

export default UsersDetail