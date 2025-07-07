/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import KeplerGl from '@kepler.gl/components';
import { addDataToMap,toggleSplitMap } from "@kepler.gl/actions";
import { processGeojson } from '@kepler.gl/processors';
// import klc_geojson from '../../data/land_kanglerngchan.json';
import { Box,Button, Checkbox, InputLabel,MenuItem,FormControl,Select,TextField,FormControlLabel,Typography,useTheme  } from "@mui/material"
import klc_config from '../../data/klc_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {wrapTo, forwardTo} from '@kepler.gl/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header";
import { green } from '@mui/material/colors';
import { tokens } from '../../theme';
// import { updateMap, updateVisData, querySuccess, setMapConfig } from '../../app-reducer'
import {createAction} from 'redux-actions';
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import { visStateUpdaters, mapStateUpdaters } from '@kepler.gl/reducers';
import {ActionTypes, updateMap } from '@kepler.gl/actions';

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVICE_URL

const setMapPerspective = createAction('SET_MAP_PERSPECTIVE'); 
// const updateKeplerMap = createAction('[ActionTypes.UPDATE_MAP]'); 
// const { togglePerspectiveUpdater } = mapStateUpdaters

const StyledMapConfigDisplay = styled.div`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
  background-color: ${theme.sidePanelBg};
  font-size: 11px;
  width: 300px;
  color: ${theme.textColor};
  word-wrap: break-word;
  height: 35%;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
`;

const herbals = [
  'กล้วยน้ำว้า',
  'มะม่วง',
  'ไผ่เลี้ยง',
  'พริก',
  'มะเขือเปราะ',
  'ข้าวโพด',
  'ตะไคร้',
  'มะนาว',
  'มะพร้าว',
  'ขมิ้นชัน',
  'ไพล',
  'พุทรา',
];

const GeoLand = () => {
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(true);
    
    const [data, setData] = useState()

    const [ludesen, setLudesen] = useState('');

    const keplerGlReducer = useSelector((state) => state.keplerGl)    

    const [herbalName, setHerbalName] = useState([]);

    const [provCode, setProvCode] = useState('01')

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setHerbalName(value);
    };

    useEffect(() => {
      axios.get(`${serviceUrl}/api/v2/geoland/list/all`)
      .then(response => {
        // console.log(response.data.result)
        setData(response.data.result)
      })
      .catch(error => {console.log(error)})
      console.log('i am get list/all')
   },[])
      
     useEffect(() => {
      if (ludesen) {
        axios.get(`${serviceUrl}/api/v2/geoland/list/${ludesen}`)
        .then(response => {
          // console.log(response.data.result)
          setData(response.data.result)
        })
        .catch(error => {console.log(error)})
        console.log('i am get list/:ludesen')
      }
     },[ludesen])
      
      useEffect(() => {
        if (data){
          dispatch(
            wrapTo(
              'land',
                addDataToMap({
                datasets: {
                  info: {
                    label: 'Land',
                    id: 'klc1'
                  },
                  data: []
                },     
                config: klc_config
                })
              )
          )
          setOpen(false)
        }
      }, [dispatch,data]);
    
    // if (data) {
    //   console.log('processGeojson(data) geoland',processGeojson(data))
    // } else {
    //   console.log('no processGeojson(data) geoland');
    // }
    
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (data) {
            dispatch(
              wrapTo(
                "land",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Land',
                      id: 'klc1'
                    },
                    data: processGeojson(data)
                  },            
                  config: klc_config
                  })
                ))
          }
        setOpen(false)
    },[dispatch, data ])

    const handleSelect = async (event) => {
      setLudesen(event.target.value);
      // console.log('event.target.value',event.target.value)
      // console.log('amp_code in handleSelect',ampCode)
    };  

    const handleSelectProv = (event) => {
      setProvCode(event.target.value);
    };  

    
    const readConfig = () => {
      console.log('Map Config', keplerGlReducer.land)
    }

      return (
        <Box m="20px">
              <Header title="ข้อมูลแผนที่" subtitle="การใช้ดิน"/>
              <Box component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                      {/* <FormControlLabel control={<Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={{
                            color: green[800],
                            '&.Mui-checked': {
                              color: green[600],
                            },
                          }}
                        />
                        } label="แบ่งแผนที่" /> */}
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={ludesen}
                      label="Ludesen"
                      onChange={handleSelect}
                    >
                      <MenuItem value={""}>
                        <em>ไม่ระบุ</em>
                      </MenuItem>
                      <MenuItem value={"Paddy field"} defaultChecked>พื้นที่นา</MenuItem>
                      <MenuItem value={"Field crop"}>พืชไร่</MenuItem>
                      <MenuItem value={"Perennial crop"}>ไม้ยืนต้น</MenuItem>
                      <MenuItem value={"Orchard"}>ไม้ผล</MenuItem>
                      <MenuItem value={"Pasture and farm house"}>ทุ่งหญ้าเลี้ยงสัตว์และโรงเรือนเลี้ยงสัตว์</MenuItem>
                      <MenuItem value={"Village"}>หมู่บ้าน</MenuItem>
                      <MenuItem value={"Artificial water body"}>แหล่งน้ำที่สร้างขึ้น</MenuItem>
                    </Select>
                    
                      <TextField id="outlined-basic" label="ตำบล" variant="outlined" />
                      <TextField id="outlined-basic" label="อำเภอ" variant="outlined" />
                      <TextField id="outlined-basic" label="จังหวัด" variant="outlined" />


                    {/* <Button variant="contained" color="success" onClick={() => dispatch(wrapTo('land',setMapConfig(keplerGlReducer))) }>
                      บันทึกการตั้งค่า
                    </Button>                          */}
                    <Button variant="contained" color="success" onClick={() => readConfig() }>
                      อ่านค่า
                    </Button>                      

                    <Button variant="contained" color="success" onClick={() => {dispatch(wrapTo('land',setMapPerspective()))}}>
                      set pecspective
                    </Button>  

                    <Button variant="contained" color="success" onClick={() => {dispatch(wrapTo('land',updateMap({latitude: 16.245516, longitude: 103.250034, width: 800, height: 1200}, 1)))}}>
                    UPDATE_MAP
                    </Button>  

                      <Typography
                          variant="h5"
                          color={colors.greenAccent[400]}
                      >
                              {ludesen}
                      </Typography>
              </Box>
              <Box height={ isSidebar ? "78vh" : "84vh" } width="100%" borderRadius="4px" sx={{overflow: "hidden"}} >
              <Backdrop
                  sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="land"
                    mapboxApiAccessToken={mapBoxKey}
                    height={height}               
                    width={width}
                    sx={{
                      "& .mapboxgl-children": {
                        style : {
                          height: "0%"
                        }
                      }
                    }}                    
                    />
                    )}
                  </AutoSizer >
                  <StyledMapConfigDisplay>
                    <CustomHeaderFactory />   
                    <Box component="form"
                          sx={{
                            '& > :not(style)': { mt: 5 },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 250, maxWidth: 300, minHeight: 300, maxHeight: 600 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                          สุมนไพร
                        </InputLabel>
                        <Select
                          multiple
                          native
                          value={herbalName}
                          onChange={handleChangeMultiple}
                          label="Native"
                          inputProps={{
                            id: 'select-multiple-native',
                          }}
                          sx={{ mb: 5 }}
                        >
                          {herbals.map((herbal) => (
                            <option key={herbal} value={herbal}>
                              {herbal}
                            </option>
                          ))}
                        </Select>
                        {/* <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={provCode}
                            label="ProvinceCode"
                            onChange={handleSelectProv}
                          >
                            <MenuItem value={""}>
                              <em>ไม่ระบุ</em>
                            </MenuItem>
                            <MenuItem value={"01"} defaultChecked>จ.มหาสารคาม</MenuItem>
                            <MenuItem value={"02"}>จ.ขอนแก่น</MenuItem>
                            <MenuItem value={"03"}>จ.กาฬสินธุ์</MenuItem>
                            <MenuItem value={"04"}>จ.ร้อยเอ็ด</MenuItem>
                          </Select>  */}
                      </FormControl>
                    </Box>
                  </StyledMapConfigDisplay>                  
                </Box>
          </Box>
      );
    }

    export default GeoLand;