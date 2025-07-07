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
import { useNavigate } from 'react-router-dom'
import { isValidDate } from '@fullcalendar/core/internal'
import { Formik, Field, Form, FieldArray } from 'formik'
import { TextField as txtField } from 'formik-material-ui'
import RemoveIcon from '@mui/icons-material/Remove';
import MessageBox from 'components/MessageBox'

const emptyRole = { roleId: 0 }

const initialValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    status: true,
    roles: [emptyRole]
    // role: 1,
}

const userSchema = yup.object().shape({
    username: yup.string().required("ต้องใส่"),
    password: yup.string().required("ต้องใส่").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "ต้องประกอบด้วยอักษรภาษาอังกฤษตัวใหญ่ ตัวเล็ก และตัวเลข รวมกันต้องไม่น้อยกว่า 8 ตัวอักษร"
      ),
    password2: yup.string().required("ต้องใส่").oneOf([yup.ref('password'), null], 'รหัสผ่านต้องเหมือนกัน'),
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
    // status: yup.boolean().required("required"),
    // role: yup.string().required("ต้องใส่"),
})

const UsersAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [roleSelected, setRoleSelected] = useState('1')
  const [roles, setRoles] = useState([])

  const [open, setOpen] = useState(false)

  const roleReducer = useSelector((state) => state.app.roleReducer)

  useEffect(() => {
    dispatch(getRoles())
  },[dispatch])

  useEffect(() => {
    setRoles(roleReducer.result)
  },[roleReducer.result])

  // if (roles) {
  //   console.log('roles',roles)
  // }

   const handleSubmitButton = (values) => {
    setOpen(true)
    // console.log(values)
   }

 
    const isNonMobile = useMediaQuery("(min-width:600px)")

    return <Box m="20px">
        <Header title="เพิ่มผู้ใช้" subtitle="เพิ่มผู้ใช้ในระบบ" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('username', values.username)
              formData.append('password', values.password)
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('status', values.status)
              formData.append('roles', JSON.stringify(values.roles)) 
              dispatch(addUser(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Box mt="40px" sx={{ m: '5px'}} >
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
                            label="ชื่อเข้าระบบ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="รหัสผ่าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }}
                        />   
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="ยืนยันรหัสผ่าน"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password2}
                            name="password2"
                            error={!!touched.password2 && !!errors.password2}
                            helperText={touched.password2 && errors.password2}
                            sx={{ gridColumn: "span 2" }}
                        /> 
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstname}
                            name="firstname"
                            error={!!touched.firstname && !!errors.firstname}
                            helperText={touched.firstname && errors.firstname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="นามสกุล"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastname}
                            name="lastname"
                            error={!!touched.lastname && !!errors.lastname}
                            helperText={touched.lastname && errors.lastname}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                      {/* <Select
                          labelId="label-select-status"
                          id="select-status"
                          // value={roleSelected}
                          // onChange={handleRoleSelection}
                          value={values.status}
                          onChange={handleChange}
                          name='status'
                          onBlur={handleBlur}
                        >
                          <MenuItem key="1" value={true}>Active</MenuItem>
                          <MenuItem key="2" value={false}>Inactive</MenuItem>
                      </Select>    */}
                      {/* <Select
                          labelId="label-select-role"
                          id="select-role"
                          value={values.role}
                          onChange={handleChange}
                          name='role'
                          onBlur={handleBlur}
                          label="กรุณาเลือกกลุ่ม"
                          error={!!touched.role && !!errors.role}
                          helperText={touched.role && errors.role}
                        >
                         { result?.map(item => {
                          return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                         })}
                      </Select>            
                                                                           */}
                    </Box>
                  </Box>

                    <FieldArray name='roles'>
                     {({push, remove, }) => (
                    <React.Fragment >
                    <Box mt="20px"display="flex" sx={{ gridColumn: "span 2" }}>
                        <Button  disabled={isSubmitting} onClick={() => push(emptyRole)}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.greenAccent[800]}
                            }}
                        >
                            <AddIcon sx={{ mr: "10px" }} />
                            เพิ่มกลุ่ม
                        </Button> 
                    </Box>      
                                     
                    <Box mt="10px"
                        borderRadius="3px"
                        sx={{
                            border: 1,
                            borderColor: colors.greenAccent[600],
                        }}>                         
                      {values.roles.map((_, index) => (                   
                        <Box  key={index} mt="10px"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        borderRadius="3px"
                        sx={{
                            padding: "10px 20px",
                            mr: "10px",
                            mb: "10px",                                
                            // border: 1,
                            // borderColor: colors.greenAccent[600],
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}>

                            <Field
                                fullWidth
                                variant="filled"
                                type="text"
                                label="กลุ่มสิทธิ์"
                                select
                                name={`roles[${index}].roleId`} 
                                defaultValue=""
                                component={txtField}
                                sx={{ gridColumn: "span 2" }} >
                                { roles && roles.map((role,key) => (
                                <MenuItem key={key} value={role.id} >
                                    {role.id} {role.name}
                                </MenuItem>  
                            ))}                          
                            </Field>                              
                          
                            <Box display="flex" justifySelf="center" sx={{ gridColumn: "span 2" }}>
                                <Button  disabled={isSubmitting} onClick={() => push(emptyRole)}
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        width: '100px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        // padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.greenAccent[800]}
                                    }}
                                >
                                    <AddIcon sx={{ mr: "10px" }} />
                                </Button>  
                                <Button  disabled={isSubmitting} onClick={() => remove(index)}
                                    sx={{
                                        backgroundColor: colors.redAccent[700],
                                        color: colors.grey[100],
                                        width: '100px',
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        // padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.redAccent[800]}
                                    }}
                                >
                                    <RemoveIcon sx={{ mr: "10px" }} />
                                </Button>  
                            </Box>                          
                        </Box>
                      ))}  
                    </Box>
                    </React.Fragment> 
                    )} 
                    </FieldArray>
                  <Box>

                {/* <Box>
                    <pre>{JSON.stringify({values, errors, isSubmitting}, null, 4)}</pre>                                          
                </Box>                     */}
              </Box>

                    <Box display="flex" justifyContent="start"
                      sx={{
                        mt: "20px",
                      }} 
                    >
                        <Button  onClick={handleSubmitButton}
                            type='submit'
                            // disabled={isSubmitting}
                            disabled={!(dirty && isValid)}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                width: '135px',
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "20px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.blueAccent[700]}
                            }}
                        >
                            บันทึก
                        </Button>
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
                            ยกเลิก
                        </Button>                 
                </Box>                    
                </Form>
            )}
        </Formik>
        <MessageBox
        open={open}
        closeDialog={() => setOpen(false)}
        submitFunction={() => setOpen(false)}
        message={"ดำเนินการเรียบร้อยแล้ว"}
        />        
    </Box >
}

export default UsersAdd