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
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../actions/user.action'
import { useNavigate, useLocation } from 'react-router-dom'

const initialValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    status: true,
    role: 1,
}

const userSchema = yup.object().shape({
    username: yup.string().required("ต้องใส่"),
    password: yup.string().required("ต้องใส่"),
    firstname: yup.string().required("ต้องใส่"),
    lastname: yup.string().required("ต้องใส่"),
    status: yup.boolean().required("required"),
    role: yup.string().required("ต้องใส่"),
})

const _FarmerDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  // console.log('farmer id', location.state.id)
  console.log('farmer row', location.state.row)

  const { result } = useSelector((state) => state.app.roleReducer)

  const isNonMobile = useMediaQuery("(min-width:600px)")

    return <Box m="20px">
        <Header title="ข้อมูลเกษตรกร" subtitle="รายละเอียดข้อมูลเกษตรกร" />

                <form >
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

                        {/* ROW 1 */}

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลำดับ"
                            value={location.state.row.id}
                            name="id"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัส"
                            value={location.state.row.username}
                            name="username"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อ"
                            value={location.state.row.firstname}
                            name="firstname"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
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
                            disabled
                        />   

                        {/* ROW 2 */}

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="บ้านเลขที่"
                            value={location.state.row.hno}
                            name="hno"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="หมู่"
                            value={location.state.row.moo}
                            name="moo"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ตำบล"
                            value={location.state.row.tambon}
                            name="tambon"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="อำเภอ"
                            value={location.state.row.amphoe}
                            name="amphoe"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />
                     

                        {/* ROW 3 */}

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="จังหวัด"
                            value={location.state.row.province}
                            name="province"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />  
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="เบอร์โทร"
                            value={location.state.row.tel}
                            name="tel"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                          
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รหัสบัตรประชาชน"
                            value={location.state.row.cid}
                            name="cid"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ใบรับรอง"
                            value={ (location.state.row.cert && location.state.row.cert.length > 0) ? location.state.row.cert : 'ไม่ระบุ'}
                            name="cert"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        /> 

                        {/* ROW 3 */}        

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วันที่ได้รับ"
                            value={(location.state.row.cert_date && location.state.row.cert_date.length > 0) ? location.state.row.cert_date : 'ไม่ระบุ'}
                            name="cert_date"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="วันหมดอายุ"
                            value={(location.state.row.cert_expire_date && location.state.row.cert_expire_date.length > 0) ? location.state.row.cert_expire_date : 'ไม่ระบุ'}
                            name="cert_expire_date"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ละติจูด"
                            value={location.state.row.latitude ?? 'ไม่ระบุ'}
                            name="latitude"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลองจิจูด"
                            value={location.state.row.longitude ?? 'ไม่ระบุ'}
                            name="longitude"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
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

                        {/* ROW 1 */}

                        {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="พื้นที่ในการปลูกสมุนไพร(ไร่)"
                            value={(location.state.row.area && location.state.row.area.length > 0) ? location.state.row.area : 'ไม่ระบุ'}
                            name="area"
                            sx={{ gridColumn: "span 1" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        /> 

                         <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สมุนไพรที่ปลูก"
                            value={(location.state.row.herbal && location.state.row.herbal.length > 0) ? location.state.row.herbal : 'ไม่ระบุ'}
                            name="herbal"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        /> 

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ปริมาณการผลิต(กก./ปี)"
                            value={(location.state.row.output && location.state.row.output.length > 0 )? location.state.row.output : 'ไม่ระบุ'}
                            name="output"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />  */}
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

                        {/* ROW 1 */}


                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="กลุ่มเกษตรกร"
                            value={(location.state.row.farmergroupId && location.state.row.farmergroupId.length > 0) ? location.state.row.farmergroupId : 'ไม่ระบุ'}
                            name="farmergroupId"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="กลุ่มเกษตรกรแปลงใหญ่"
                            value={(location.state.row.collaborativefarmId && location.state.row.collaborativefarmId.length > 0) ? location.state.row.collaborativefarmId : 'ไม่ระบุ'}
                            name="collaborativefarmId"
                            sx={{ gridColumn: "span 2" }}
                            InputLabelProps={{ shrink: true }}
                            disabled
                        />                                                         

                      </Box>  
                    </Box>                  
                    <Box display="flex" justifyContent="end" mt='10px'>
                    <Button  
                        // type='submit'
                        onClick={() => (navigate(-1))}
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
                        กลับ
                    </Button>
                  </Box>  
                </Box>                
                </form>
    </Box >
}

export default _FarmerDetail