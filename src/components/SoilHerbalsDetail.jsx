import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography,IconButton,useTheme, MenuItem,Select  } from "@mui/material"
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';
import { tokens } from '../theme';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ParkIcon from '@mui/icons-material/Park';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import StatHerbalBox from "./StatHerbalBox";
import { setPlantingSelection,setAmphoeSelection,setSoilFieldSelection } from '../actions/herbalselected.action'

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const CardDetail = ({selectedResult}) => {

  const dispatch = useDispatch()

  console.log('CardDetail is called in SoilHerbalDetail')
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // const [ampCode, setAmpCode] = useState('01');
  const [provCode, setProvCode] = useState('01');  

  // const [selectedValue, setSelectedValue] = useState('soil');
  // const [soilSelection, setSoilSelection] = useState('fertility')

  const { plantingSelected, amphoeSelected, soilFieldSelected } = useSelector((state) => state.app.herbalselectedReducer)

  // useEffect(() => {
  //   dispatch(setPlantingSelection(selectedValue))
  // },[dispatch,selectedValue])  

  const handlesoilSelection = (event) => {
    // setSoilSelection(event.target.value);
    dispatch(setSoilFieldSelection(event.target.value));
  };

  const handleRadioButtonChange = (event) => {
    // setSelectedValue(event.target.value);
    dispatch(setPlantingSelection(event.target.value))
  };


  const handleAmphoeSelection = async (event) => {
    dispatch(setAmphoeSelection(event.target.value))    
  };    

  const handleSelectProv = (event) => {
    setProvCode(event.target.value);
  };   

  // if (selectedValue) {
  //   console.log('selectedValue',selectedValue)
  // }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor : colors.primary[400] }}>
      <CardMedia
        sx={{ height: 160 }}
        image= { imagesUrl + selectedResult?.image}
        // title={selectedResult.herbalname}
      />
      <CardContent sx={{ p: "10px 10px", mt: "2px"}}>
        <Box sx={{ pt: "10px" }}>
        <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
        {selectedResult.herbalname}
        </Typography>
        <Divider sx={{ mb: 1}}/>        
        <Box>
            <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
              ชื่อสามัญ
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            {selectedResult.commonname}
            </Typography>                   
        </Box> 
        <Box>
            <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
              ชื่อวิทยาศาสตร์
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            {selectedResult?.scientificname}
            </Typography>                   
        </Box>                
        <Box mb='5px'>
            <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
              ชื่ออื่นๆ
            </Typography>              
            <Typography ml="5px" variant="h7" display='inline'>
            {selectedResult?.othername}
            </Typography>                   
        </Box>                
        <Divider sx={{ mb: 1}}/>
          <Typography variant="h6" m="10px 0px" color={colors.greenAccent[400]}>
              ความต้องการทรัพยากรดิน
          </Typography>  
         {/* GRID & CHARTS */}
         <Box
                display="grid"
                gridTemplateRows="repeat(2, 1fr)"
                gridAutoRows="140px"
                gap="10px"
            >    
              { selectedResult?.soil &&     
              <Box
                      gridColumn="span 3"
                      // backgroundColor={colors.primary[400]}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                  >
                      <StatHerbalBox
                          title="55"
                          subtitle="ดินเหมาะแก่การปลูก"
                          increase={selectedResult?.soil}
                          progress="0.75"
                          icon={
                              <ParkIcon
                                  sx={{
                                      color: colors.greenAccent[600],
                                      fontSize: "26px"
                                  }}
                              />
                          }
                      />                    
              </Box> }
              { selectedResult?.ph && 
              <Box
                    gridColumn="span 3"
                    // backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatHerbalBox
                        title="27"
                        subtitle="ค่า pH"
                        progress="0.30"
                        increase={selectedResult?.ph}
                        icon={
                            <PeopleOutlinedIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
              </Box> }
            </Box>
            <Box sx={{mt:"5px"}}>
                <Divider sx={{ mb: 1}}/>
                  <Typography gutterBottom variant="h6" component="div" color={colors.greenAccent[400]}>
                    บริเวณเหมาะสมในการปลูก (ข้อมูลกรมที่ดิน)  
                  </Typography>        
                  <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="plant-selection-label"
                          name="plant-selection"
                          value={plantingSelected}
                          onChange={handleRadioButtonChange}
                        >
                          <FormControlLabel value="soil" control={<Radio color='secondary' />} label="ข้อมูลดิน" />
                          <FormControlLabel value="salt" control={<Radio color='secondary' disabled/>} label=" คราบเกลือ" />
                        </RadioGroup>
                        {plantingSelected === 'soil' ? (
                          <>
                        <Typography gutterBottom variant="h6" component="div" color={colors.greenAccent[400]}>
                          แสดงข้อมูลตาม  
                        </Typography>                                             
                          <RadioGroup
                            row
                            aria-labelledby="soil-option-label"
                            name="soil-option"
                            value={soilFieldSelected}
                            onChange={handlesoilSelection}
                          >
                            <FormControlLabel value="fertility" control={<Radio color='secondary' />} label="ความอดุมสมบูรณ์" />
                            <FormControlLabel value="ph" control={<Radio color='secondary' />} label="ความเป็นกรดด่าง" />
                            <FormControlLabel value="texture" control={<Radio color='secondary' />} label="เนื้อดิน" />
                          </RadioGroup>                    
                          </> ) : undefined}          
                  </FormControl>   

                </Box>   
                <Box sx={{mt:"10px"}}>
                    <Divider sx={{ mb: 1}}/>
                    <Typography gutterBottom variant="h6" component="div" color={colors.greenAccent[400]}>
                      ระบุพื้นที่ 
                    </Typography>  
                </Box>   
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Box sx={{mt:"10px"}}>
                    <FormControl  variant="filled" size="small">
                      <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={provCode}
                          // label="ProvinceCode"
                          onChange={handleSelectProv}
                        >
                          {/* <MenuItem value={""}>
                            <em>ไม่ระบุ</em>
                          </MenuItem> */}
                          <MenuItem value={"01"} defaultChecked>จ.มหาสารคาม</MenuItem>
                          {/* <MenuItem value={"02"}>จ.ขอนแก่น</MenuItem>
                          <MenuItem value={"03"}>จ.กาฬสินธุ์</MenuItem>
                          <MenuItem value={"04"}>จ.ร้อยเอ็ด</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Box>              
                  <Box sx={{mt:"10px"}}>
                    <FormControl  variant="filled" size="small">
                      <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={amphoeSelected}
                          // label="AmphueCode"
                          onChange={handleAmphoeSelection}
                        >
                          {/* <MenuItem value={""}>
                            <em>ไม่ระบุ</em>
                          </MenuItem> */}
                          <MenuItem value={"01"} defaultChecked>อ.เมืองมหาสารคาม</MenuItem>
                          <MenuItem value={"02"}>อ.แกดำ</MenuItem>
                          <MenuItem value={"03"}>อ.โกสุมพิสัย</MenuItem>
                          <MenuItem value={"04"}>อ.กันทรวิชัย</MenuItem>
                          <MenuItem value={"05"}>อ.เชียงยืน</MenuItem>
                          <MenuItem value={"06"}>อ.บรบือ</MenuItem>
                          <MenuItem value={"07"}>อ.นาเชือก</MenuItem>
                          <MenuItem value={"08"}>อ.พยัคฆภูมิพิสัย</MenuItem>
                          <MenuItem value={"09"}>อ.วาปีปทุม</MenuItem>
                          <MenuItem value={"10"}>อ.นาดูน</MenuItem>
                          <MenuItem value={"11"}>อ.ยางสีสุราช</MenuItem>
                          <MenuItem value={"12"}>อ.กุดรัง</MenuItem>
                          <MenuItem value={"13"}>อ.ชื่นชม</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>  
                </Box>                   
            </Box>                        
      </CardContent>
      <Divider sx={{ m: '5px 10px'}}/>
    </Card>    
  )
}


const SoilHerbalsDetail = ({props}) => {
  // const dispatch = useDispatch()

  const StyledDetailDisplay = styled.div`
  /* display: none; */
  position: absolute;
  z-index: 100;
  top: 35px;
  left: 302px;
  /* background-color: ${theme.sidePanelBg}; */
  font-size: 11px;
  width: 370px;
  color: ${theme.textColor};
  word-wrap: break-word;
  /* height: 99%; */
  min-height: 60px;
  max-height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 10px;
  `;

  const { selectedResult, isSelectedFetching , isSelectedError } = useSelector((state) => state.app.herbalselectedmapReducer)

  // if (selectedResult) {
  //   console.log('see selectedResult in SoilHerbalDetail',selectedResult)
  // }
  
  let content
  if (isSelectedFetching) content = <Box>Loading...</Box>
  else if (isSelectedError) content = <Box>Something went wrong..</Box>
  else if (selectedResult) {
  content = (
      <StyledDetailDisplay>
          {/* <CardDetail selectedResult={selectedResult} /> */}
          <CardDetail selectedResult={selectedResult} />
      </StyledDetailDisplay>  
    )
  } else {
    content = (
      <StyledDetailDisplay>
        อุ้ย หาไม่เจออ่ะ
      </StyledDetailDisplay>      
    )
  } 
  return content
}
export default SoilHerbalsDetail