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

const FarmerDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

//   console.log('Famergroup detail row',location.state.row)
//   console.log('Famergroup detail row herbals',location.state.row.herbals)
//   console.log('Famergroup detail row farmers',location.state.row.farmergroups)
//   console.log('Famergroup detail row farmers',location.state.row.collaborativefarmss)

  // console.log('farmer id', location.state.id)
  console.log('farmer row', location.state.row)

  const { result } = useSelector((state) => state.app.roleReducer)

  const isNonMobile = useMediaQuery("(min-width:600px)")

  return <Box m="20px">
      <Header title="รายละเอียดข้อมูลเกษตรกร" />
            <Box mt="10px" mb="10px">
                <Typography>
                    ข้อมูลเบื้องต้น
                </Typography> 
            </Box>
              <Box mt='40px'>
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
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ชื่อ"
                        value={location.state.row.firstname}
                        name="firstname"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="นามสกุล"
                        value={location.state.row.lastname}
                        name="lastname"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="รหัสบัตรประชาชน"
                        value={location.state.row.cid}
                        name="cid"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="บ้านเลขที่"
                        value={location.state.row.hno}
                        name="hno"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="หมู่"
                        value={location.state.row.moo}
                        name="moo"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ตำบล"
                        value={location.state.row.tambon}
                        name="tambon"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="อำเภอ"
                        value={location.state.row.amphure}
                        name="amphure"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="จังหวัด"
                        value={location.state.row.province}
                        name="province"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="รหัสไปรษณีย์"
                        value={location.state.row.postcode}
                        name="postcode"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="เบอร์ติดต่อ"
                        value={location.state.row.tel}
                        name="tel"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="มาตรฐานที่ได้รับ"
                        value={location.state.row.cert}
                        name="cert"
                        sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="ข้อมูลอื่นๆ"
                        value={location.state.row.other}
                        name="other"
                        sx={{ gridColumn: "span 1" }}
                    />
              </Box>

          {/* Add FieldArray here */}
            {/* plantation (relationship) with herbals */}
                        
            <Box name='herbals'>
                  <Box mt="20px" >
                      <Typography>
                          ข้อมูลสมุนไพร
                      </Typography>            
                  </Box>            

                  <Box mt="10px"
                      borderRadius="3px"
                      sx={{
                          border: 1,
                          borderColor: colors.greenAccent[600],
                      }}>                         
                    {location?.state?.row?.herbals?.map((item, index) => (                   
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

                            <TextField
                                fullWidth
                                variant="filled"
                                // component={txtField}
                                label="สมุนไพร"
                                // name={item.herbalname} 
                                value={`${item.id} ${item.herbalname}`}
                                name="_herbalname"
                                sx={{ gridColumn: "span 2" }}
                            />     
                            <TextField
                                fullWidth
                                variant="filled"
                                // component={txtField}
                                label="พื้นที่ในการปลูกสมุนไพร(ไร่)"
                                // name={`plantation[${index}].area`} 
                                value={item.farmerherbals.area}
                                name="_area" 
                                sx={{ gridColumn: "span 2" }}
                            /> 
                      
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                // component={txtField}
                                label="ปริมาณผลผลิต (กก./ไร่/ปี)"
                                // name={`plantation[${index}].output`} 
                                value={item.farmerherbals.output}
                                name="_output"
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                // component={txtField}
                                label="คาดการณ์ผลผลิต (กก./ปี)"
                                // name={`plantation[${index}].output`} 
                                value={item.farmerherbals.area * item.farmerherbals.output}
                                name="_total"
                                sx={{ gridColumn: "span 2" }}
                            />                            
                      </Box>
                  ))} 
              </Box>
 
               {/* Membership of farmergroups */}


            <Box mt="20px"
                borderRadius="3px"
                sx={{
                    border: 1,
                    borderColor: colors.greenAccent[600],
                }}> 
                  <Box mt="20px" >
                      <Typography>
                          ข้อมูลสมาชิกกลุ่มเกษตรกร
                      </Typography>            
                  </Box>            

                  <Box mt="10px"
                      borderRadius="3px"
                      sx={{
                          border: 1,
                          borderColor: colors.greenAccent[600],
                      }}>                         
                    {location?.state?.row?.farmergroups?.map((item, index) => (                   
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

                            <TextField
                                fullWidth
                                variant="filled"
                                label="กลุ่มเกษตรกร"
                                value={`${item.id} ${item.farmergroupname}`}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="หมู่บ้าน"
                                value={item.village}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="จังหวัด"
                                value={item.province}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="ประธานกลุ่ม)"
                                value={item.leader}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                      </Box>
                    ))}  
                  </Box>
                </Box>
 
                  {/* Membership of collaborativefarms */}
                <Box mt="20px"
                borderRadius="3px"
                sx={{
                    border: 1,
                    borderColor: colors.greenAccent[600],
                }}> 
                  <Box mt="20px" >
                      <Typography>
                          ข้อมูลสมาชิกกลุ่มเกษตรกรแปลงใหญ่
                      </Typography>            
                  </Box>  
                  <Box mt="10px"
                      borderRadius="3px"
                      sx={{
                          border: 1,
                          borderColor: colors.greenAccent[600],
                      }}>                         
                    {location?.state?.row?.collaborativefarms?.map((item, index) => (                   
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

                            <TextField
                                fullWidth
                                variant="filled"
                                label="กลุ่มเกษตรกรแปลงใหญ่"
                                value={`${item.id} ${item.name}`}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="หมู่บ้าน"
                                value={item.baan}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="จังหวัด"
                                value={item.province}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                            <TextField
                                fullWidth
                                variant="filled"
                                label="ประธานกลุ่ม)"
                                value={item.leader}
                                sx={{ gridColumn: "span 2" }}
                            />                                                  
                      </Box>
                    ))}  
                  </Box>
                </Box>
                </Box>
  
          {/* end fieldarray */}

                      
                  
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
                      ml: "30px",
                      gridColumn: "span 1"
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
      </Box >
</Box >
}

export default FarmerDetail