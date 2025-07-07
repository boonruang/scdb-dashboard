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
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { updateFarmer, getFarmerById } from '../../actions/farmerseleted.action'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfirmBox from 'components/ConfirmBox'

const initialValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    status: true,
    // role: 1,
}

const userSchema = yup.object().shape({
    username: yup.string().required("ต้องใส่"),
    // password: yup.string().required("ต้องใส่"),
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
})

const onSubmit = async (values, { setSubmitting }) => {
    let formData = new FormData()
    formData.append('id', values.id)
    formData.append('firstname', values.firstname)
    formData.append('lastname', values.lastname)
    formData.append('cid', values.cid)
    formData.append('username', values.cid)
    formData.append('password', values.password)
    formData.append('hno', values.hno)
    formData.append('moo', values.moo)
    formData.append('tambon', values.tambon)
    formData.append('amphoe', values.amphoe)
    formData.append('province', values.province)
    formData.append('postcode', values.postcode)
    formData.append('tel', values.tel)
    formData.append('status', 'true')
    formData.append('reject', 'false')
    formData.append('latitude', values.latitude)
    formData.append('longitude', values.longitude)
    // เลือกประเภทการลงทะเบียน 1 เกตรกร 2 ผู้ประกอบการ 3 ปราชญ์
    formData.append('register_type',values.register_type)
    // ใช้เก็บข้อมูลปราชญ์
    formData.append('register_data',values.register_data) 
    // เก็บข้อมูลการลงทะเบียน เกษตรกร 
    formData.append('farmer_type',values.farmer_type)              
    formData.append('collaborativefarmId',values.collaborativefarmId)
    // เก็บข้อมูลการลงกลุ่มเกษตร
    formData.append('farmergroupId',values.farmergroupId)
    // เก็บข้อมูลการลงทะเบียน ผู้ประกอบการ
    formData.append('entrepreneur_type',values.entrepreneur_type)
    formData.append('entrepreneurherbal_data',values.entrepreneurherbal)
    formData.append('entrepreneurtraditionalmedicine_data',values.entrepreneurtraditionalmedicine)

    console.log('Edit form values: ',values)
//   dispatch(updateFarmer(navigate, formData))
    setSubmitting(false)
}

            // onSubmit={async (values, { setSubmitting }) => {

            // }}

const _FarmerEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  // console.log('farmer id', location.state.id)
  console.log('farmer row', location.state.row)

  const { result } = useSelector((state) => state.app.roleReducer)

  const isNonMobile = useMediaQuery("(min-width:600px)")

  const [formValues, setFormValues] = useState(null)
  const [open, setOpen] = useState(false)
  const [farmerId, setFarmerId] = useState(null)

  const message = 'ทำการปรับปรุงข้อมูลเรียบร้อยแล้ว'

  useEffect(() => {
    dispatch(getFarmerById(location.state.row.id))
  },[dispatch, location.state.row.id])



  const farmerselectedReducer = useSelector((state) => state.app.farmerselectedReducer)

    if (farmerselectedReducer?.selectedResult) {
        console.log('location.state.row.id', location.state.row.id)
        console.log('farmerselectedReducer?.selectedResult', farmerselectedReducer?.selectedResult)
    }


//   useEffect(() => {
//       setFormValues(location.state.row)
//       setFarmerId(location.state.row.id)
//   })


//   if (formValues) {
//     console.log('formValues', formValues)
//   }


const handleSubmitButton = () => {
    setOpen(true)
}

    return <Box m="20px">
        <Header title="แก้ไขข้อมูลเกษตรกร" subtitle="รายละเอียดข้อมูลเกษตรกร" />

        <Formik
            // onSubmit={onSubmit}
            onSubmit={{}}
            enableReinitialize={true}
            initialValues={farmerselectedReducer?.selectedResult ? farmerselectedReducer?.selectedResult : {}}
            validationSchema={userSchema}        
            // initialValues={formValues || initialValues}
        >

        {({ values, errors, touched, isValid, dirty, handleBlur, handleChange, handleSubmit }) => (
        // console.log('Formik props', formik)
            <Form onSubmit={handleSubmit}>
                <Box>
                    <Box >
                      <Box sx={{ m: '5px'}} >
                        <Typography>
                          เกษตรกร
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลำดับ"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.id}
                            name="id"
                            error={!!touched.id && !!errors.id}
                            helperText={touched.id && errors.id}                            
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัส"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}                               
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อ"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.firstname}
                            name="firstname"
                            error={!!touched.firstname && !!errors.firstname}
                            helperText={touched.firstname && errors.firstname}                              
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="นามสกุล"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.lastname}
                            name="lastname"
                            error={!!touched.lastname && !!errors.lastname}
                            helperText={touched.lastname && errors.lastname}                                
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />   

                    <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="บ้านเลขที่"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.hno}
                            name="hno"
                            error={!!touched.hno && !!errors.hno}
                            helperText={touched.hno && errors.hno}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="หมู่"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.moo}
                            name="moo"
                            error={!!touched.moo && !!errors.moo}
                            helperText={touched.moo && errors.moo}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ตำบล"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.tambon}
                            name="tambon"
                            error={!!touched.tambon && !!errors.tambon}
                            helperText={touched.tambon && errors.tambon}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="อำเภอ"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.amphoe}
                            name="amphoe"
                            error={!!touched.amphoe && !!errors.amphoe}
                            helperText={touched.amphoe && errors.amphoe}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="จังหวัด"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.province}
                            name="province"
                            error={!!touched.province && !!errors.province}
                            helperText={touched.province && errors.province}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="เบอร์โทร"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.tel}
                            name="tel"
                            error={!!touched.tel && !!errors.tel}
                            helperText={touched.tel && errors.tel}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัสบัตรประชาชน"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.cid}
                            name="cid"
                            error={!!touched.cid && !!errors.cid}
                            helperText={touched.cid && errors.cid}                                   
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ใบรับรอง"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.cert}
                            name="cert"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        /> 

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วันที่ได้รับ"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.cert_date}
                            name="cert_date"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วันหมดอายุ"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.cert_expire_date}
                            name="cert_expire_date"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ละติจูด"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.latitude}
                            name="latitude"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลองจิจูด"
                            onBlur={handleBlur}
                            onChange={handleChange}                            
                            value={values?.longitude}
                            name="longitude"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />   


                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัสไปรษณีย์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.postcode}
                            name="postcode"     
                            disabled                      
                            error={!!touched.postcode && !!errors.postcode}
                            helperText={touched.postcode && errors.postcode}
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                         

                    </Box> 

                </Box> 

                <Box mt='40px'>
                    <Box sx={{ m: '5px'}} >
                      <Typography>
                        สมุนไพร
                      </Typography>
                    </Box>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >


                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="พื้นที่ในการปลูกสมุนไพร(ไร่)"
                            onBlur={handleBlur}
                            onChange={handleChange}   
                            value={values?.area}
                            name="area"
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สมุนไพรที่ปลูก"
                            onBlur={handleBlur}
                            onChange={handleChange}   
                            value={values?.herbal}
                            name="herbal"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ปริมาณการผลิต(กก./ปี)"
                            onBlur={handleBlur}
                            onChange={handleChange}   
                            value={values?.output}
                            name="output"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />  
                      </Box>  
                    </Box>                   

                <Box mt='40px'>
                  <Box sx={{ m: '5px'}} >
                    <Typography>
                      การเป็นสมาชิก
                    </Typography>
                  </Box>
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
                            label="กลุ่มเกษตรกร"
                            onBlur={handleBlur}
                            onChange={handleChange}   
                            value={values?.farmergroupId}
                            name="farmergroupId"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="กลุ่มเกษตรกรแปลงใหญ่"
                            onBlur={handleBlur}
                            onChange={handleChange}   
                            value={values?.collaborativefarmId}
                            name="collaborativefarmId"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                        />                                                         

                      </Box>  
                    </Box>                  
                    
                    <Box 
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        mt="20px"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}                    
                    >

                        <Box display="flex" justifyContent="start"
                            sx={{
                            gridColumn: "span 2"
                            }}                    
                        >
                                <Button  onClick={handleSubmitButton}
                                    type='submit'
                                    disabled={!(dirty && isValid)}
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        mr: "20px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.greenAccent[800]}
                                    }}
                                >
                                    บันทึก
                                </Button>
                                <Button  
                                    onClick={() => (navigate(-1))}
                                    type='button'
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        color: colors.grey[100],
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        mr: "10px",
                                        mb: "10px",
                                        '&:hover': {backgroundColor: colors.greenAccent[800]}
                                    }}
                                >
                                    ยกเลิก
                                </Button>    
                        </Box>
                    </Box>
                </Box>                
            </Form>
            )
        }                
        </Formik>
        <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        message={message}
        // title={farmerId}
        />
    </Box >
}

export default _FarmerEdit