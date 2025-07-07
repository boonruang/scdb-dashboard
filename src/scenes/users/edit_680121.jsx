import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField,
    Select,
    MenuItem
  } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { editUser } from '../../actions/user.action'
import { useNavigate,useParams, useLocation } from 'react-router-dom'
import { getUser } from 'actions/userSelected.action';

let initialValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    status: true,
    roles: [],
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
    // roles: yup.string().required("ต้องใส่"),
})

const UsersEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [roleSelected, setRoleSelected] = useState('1')

  const { result } = useSelector((state) => state.app.roleReducer)
  const userSelected = useSelector((state) => state.app.userSelectedReducer)


    useEffect(() => {
      dispatch(getUser(location.state.row.id))
      console.log('getUser is running in useEffect')
    },[dispatch,location.state.row.id])

   const handleSubmitButton = (values) => {
    setSnackBarOpen(true)
    // console.log(values)
   }

   const handleRoleSelection = (e) => {
    setRoleSelected(e.target.value)
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
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
        dispatch(editUser(navigate,values))
    }

    return <Box m="20px">
        <Header title="แก้ไขข้อมูล" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('id', values.id)
              formData.append('username', values.username)
              formData.append('password', values.password)
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('status', values.status)
              formData.append('roles', values.roles)
              dispatch(editUser(navigate, formData))
              setSubmitting(false)
            }}
            enableReinitialize
            initialValues={userSelected?.result ? userSelected?.result: {}}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, dirty, isValid, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัส"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.id}
                            name="id"
                            error={!!touched.id && !!errors.id}
                            helperText={touched.id && errors.id}
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            InputLabelProps={{ shrink: true }}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                      <Select
                          labelId="label-select-status"
                          id="select-status"
                          // value={roleSelected}
                          // onChange={handleRoleSelection}
                          value={values.status}
                          onChange={handleChange}
                          name='status'
                          onBlur={handleBlur}
                          error={!!touched.status && !!errors.status}
                          helperText={touched.status && errors.status}                          
                        >
                         <MenuItem value={true}>Active</MenuItem>
                         <MenuItem value={false}>Inactive</MenuItem>

                      </Select>   
                      <Select
                          labelId="label-select-role"
                          id="select-role"
                          value={values.roles}
                          onChange={handleChange}
                          name='roles'
                          onBlur={handleBlur}
                          error={!!touched.roles && !!errors.roles}
                          helperText={touched.roles && errors.roles}                          
                        >
                         { result?.map(item => {
                          return <MenuItem key={item.id} value={item.id} >{item.name}</MenuItem>
                         })}
                      </Select>                                                                
                    </Box>
                <Box display="flex" justifyContent="start"
                      sx={{
                        mt: "20px",
                      }} 
                    >
                    <Button  onClick={handleSubmitButton}
                        disabled={!(dirty && isValid)}
                        type='submit'
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
                    <MuiSnackbar message="บันทึกข้อมูลสำเร็จ" duration={4000} />                    
                </Box>                    
                </form>
            )}
        </Formik>
    </Box >
}

export default UsersEdit