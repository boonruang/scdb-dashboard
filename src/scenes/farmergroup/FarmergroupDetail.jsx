import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField,
    Select,
    MenuItem,
    CardActionArea,
    Grid,
    Typography,
    styled
  } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
// import { getFarmergroupherbalByFarmergroupId } from '../../actions/farmergroup.action'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckboxWithLabel, TextField as txtField } from 'formik-material-ui'


const FarmergroupDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const location = useLocation()

  const [data, setData] = useState([])

  console.log('Famergroup detail row',location.state.row)
  console.log('Famergroup detail row herbals',location.state.row.herbals)
  console.log('Famergroup detail row farmers',location.state.row.farmers)

//   useEffect(() => {
//     dispatch(getFarmergroupherbalByFarmergroupId)
//   },[dispatch])


//   const farmergroupherbalReducer = useSelector((state) => state.app.farmergroupherbalReducer)


//   useEffect(() => {
//     setData(farmergroupherbalReducer.result)
//   },[farmergroupherbalReducer.result])

//   if (data) {
//     console.log('famergroupherbal data', data)
//   }



    const isNonMobile = useMediaQuery("(min-width:600px)")


    return <Box m="20px">
        <Header title="แสดงรายละเอียดข้อมูลกลุ่มเกษตรกร" />
                    <Box mt="10px" mb="10px">
                        <Typography>
                            ข้อมูลเบื้องต้น
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
                            label="รหัส"
                            value={location.state.row.id}
                            name="id"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อกลุ่ม"
                            value={location.state.row.farmergroupname}
                            name="farmergroupname"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="เลขที่"
                            value={location.state.row.hno}
                            name="hno"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="หมู่ที่"
                            value={location.state.row.moo}
                            name="moo"
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="บ้าน"
                            value={location.state.row.village}
                            name="village"
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
                            value={location.state.row.amphoe}
                            name="amphoe"
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
                            label="ประธานกลุ่ม"
                            value={location.state.row.leader}
                            name="leader"
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
                            label="จำนวนสมาชิก"
                            value={location.state.row.member}
                            name="member"
                            sx={{ gridColumn: "span 1" }}
                        />                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="โครงสร้างพื้นฐานของกลุ่ม"
                            value={location.state.row.facility}
                            name="facility"
                            sx={{ gridColumn: "span 1" }}
                        />                        

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สาธารณูประโภคในกลุ่ม"
                            value={location.state.row.utility}
                            name="utility"
                            sx={{ gridColumn: "span 1" }}
                        />                        

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ละติจูด"
                            value={location.state.row.latitude}
                            name="latitude"
                            sx={{ gridColumn: "span 1" }}
                        />   
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลองจิจูด"
                            value={location.state.row.longitude}
                            name="longitude"
                            sx={{ gridColumn: "span 1" }}
                        />                                                
                         
                    </Box>
                    <Box mt="20px"
                        borderRadius="3px"
                        sx={{
                            border: 1,
                            borderColor: colors.greenAccent[600],
                        }}>       
						<Box mt="20px" sx={{ m: '5px'}} >
                            <Typography>
                                ข้อมูลสมุนไพร
                            </Typography>
                        </Box>                                           
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
                                value={item.farmergroupherbals.area}
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
                                value={item.farmergroupherbals.output}
                                name="_output"
                                sx={{ gridColumn: "span 2" }}
                            />           
                            
                            <TextField
                                fullWidth
                                variant="filled"
                                // component={txtField}
                                label="คาดการณ์ผลผลิต (กก./ปี)"
                                // name={`plantation[${index}].area`} 
                                value={item.farmergroupherbals.area * item.farmergroupherbals.output}
                                name="_area" 
                                sx={{ gridColumn: "span 2" }}
                            />                                             
                        </Box>
                      ))}  
                    </Box>

                    <Box mt="20px"
                        borderRadius="3px"
                        sx={{
                            border: 1,
                            borderColor: colors.greenAccent[600],
                        }}>       
						<Box mt="20px" sx={{ m: '5px'}} >
                            <Typography>
                                ข้อมูลสมาชิก
                            </Typography>
                        </Box>                                           
                      {location?.state?.row?.farmers?.map((item, index) => (                   
                        <Box  key={index} mt="10px"
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(6, minmax(0, 1fr))"
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
                                label="ชื่อ"
                                value={`${item.id} ${item.firstname}`}
                                name="_herbalname"
                                sx={{ gridColumn: "span 2" }}
                            /> 

                            <TextField
                                fullWidth
                                variant="filled"
                                label="นามสกุล"
                                value={item.lastname}
                                name="_area" 
                                sx={{ gridColumn: "span 2" }}
                            /> 
                      
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                // component={txtField}
                                label="รหัสบัตรประชาชน"
                                // name={`plantation[${index}].output`} 
                                value={item.cid}
                                name="_cid"
                                sx={{ gridColumn: "span 2" }}
                            />                           
                        </Box>
                      ))}  
                    </Box>                                        
                    <Box 
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}                    
                    >

                      <Box display="flex" justifyContent="start"
                        sx={{
                          mt: '20px',
                          gridColumn: "span 2"
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

export default FarmergroupDetail