/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch,connect, useSelector } from "react-redux";
// import KeplerGl from '@kepler.gl/components';
import { addDataToMap,toggleSplitMap,togglePerspective, replaceDataInMap } from "@kepler.gl/actions";
import { Processors, processGeojson } from '@kepler.gl/processors';
// import klc_geojson from '../../data/land_kanglerngchan.json';
import { Box,Checkbox,Button, InputLabel,MenuItem,FormControl,Select,TextField,FormControlLabel,Typography,useTheme  } from "@mui/material"
import saltmk_config from '../../data/saltmk_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {wrapTo, forwardTo} from '@kepler.gl/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header";
import { tokens } from '../../theme';
// import { updateMap, updateVisData, querySuccess,clickToTogglePerspective  } from '../../app-reducer'
import KeplerGlSchema from '@kepler.gl/schemas';
import {createAction} from 'redux-actions';
import {injectComponents, PanelHeaderFactory,SidebarFactory} from '@kepler.gl/components';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import CustomSidebarFactory from 'components/keplergl/CustomSidebarFactory'

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVICE_URL

const updateVisState = createAction('UPDATE_VIS_STATE');
const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');

const myCustomHeaderFactory = () => CustomHeaderFactory

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory],
  [SidebarFactory, CustomSidebarFactory],
]);

const GeoSalt = (props) => {
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(true);
    
    const [data, setData] = useState()

    const [Id, setId] = useState('6');

    const [provCode, setProvCode] = useState('01');

    const keplerGlReducer = useSelector((state) => state.keplerGl)

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    // console.log('keplerGlReducer',keplerGlReducer)   

    useEffect(() => {
      axios.get(`${serviceUrl}/api/v2/geosalt/sidebar/list/all`)
      .then(response => {
        // console.log(response.data.result)
        setData(response.data.result)
      })
      .catch(error => {console.log(error)})
   },[])    
      
     useEffect(() => {
      if (Id) {
         axios.get(`${serviceUrl}/api/v2/geosalt/sidebar/list/${Id}`)
        .then(response => {
          // console.log(response.data.result)
          setData(response.data.result)
        })
        .catch(error => {console.log(error)})       
      }
        // console.log('amp_code useEffect',Id)
     },[Id])
      
      useEffect(() => {
        if (data){
          dispatch(
            wrapTo(
              "salt",
                addDataToMap({
                datasets: {
                  info: {
                    label: 'Salt Mahasarakham',
                    id: 'saltmk1'
                  },
                  data: []
                },     
                config: saltmk_config
                })
          ))
          setOpen(false)
        }
      }, [dispatch,data]);
    
    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.salkmk1)

    useEffect(() => {
      if (data) {
            dispatch(
              wrapTo(
                "salt",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Salt Mahasarakham',
                      id: 'saltmk1'
                    },
                    data: processGeojson(data)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: saltmk_config
                  })
                ))
          }
        setOpen(false)
    },[dispatch,data])


    let mapConfig
    if (keplerGlReducer.salt) {
      mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.salt)
      // mapConfig.config.mapStyle.styleType = "voyagerDark";
      console.log('salt mapConfig',mapConfig)
    }

    const handleSelect = async (event) => {
      setId(event.target.value);
      // console.log('event.target.value',event.target.value)
      // console.log('amp_code in handleSelect',Id)
    };    

    const handleSelectProv = (event) => {
      setProvCode(event.target.value);
    };  

      return (
        <Box m="20px">
              <Header title="ข้อมูลคราบเกลือ" />
              <Box
                            component="form"
                            sx={{
                              '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                          >

                    {/* <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={Id}
                      label="AmphueCode"
                      onChange={handleSelect}
                    >
                      <MenuItem value={""}>
                        <em>ไม่ระบุ</em>
                      </MenuItem>
                      <MenuItem value={1} defaultChecked>บริเวณที่พบคราบเกลือบนผิวดินมากกว่า 50%</MenuItem>
                      <MenuItem value={2}>บริเวณที่พบคราบเกลือบนผิวดิน 10-50%</MenuItem>
                      <MenuItem value={3}>บริเวณที่พบคราบเกลือบนผิวดิน 1-10%</MenuItem>
                      <MenuItem value={4}>บริเวณที่พบคราบเกลือบนผิวดินน้อยกว่า 1%</MenuItem>
                      <MenuItem value={5}>บริเวณที่สูง มีหินเกลือรองรับอยู่ข้างล่าง</MenuItem>
                      <MenuItem value={6}>บริเวณที่ไม่มีผลกระทบจากคราบเกลือ</MenuItem>

                    </Select> */}

                    <Select
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
                    </Select>   

                    {/* <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("salt",(toggleSplitMap)))}>
                      Toggle Split Map
                    </Button>  

                    <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("salt",(togglePerspective)))}>
                      Toggle Perspective
                    </Button>                                         

                    <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo('salt',toggleSidePanel())) }>
                      Toggle Side Panel
                    </Button>  */}

                  {/* <Typography
                      variant="h5"
                      color={colors.greenAccent[400]}
                  >
                          รหัสอำเภอ {Id} รหัสจังหวัด {provCode}
                  </Typography> */}
              </Box>
                  <Box height={ isSidebar ? "76vh" : "81vh" } width="100%" borderRadius="4px" sx={{overflow: "hidden"}} >
                    <Backdrop
                        sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                      >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                    {/* { (provCode == "01") ? ( 
                      <AutoSizer>
                        {({height, width}) => (
                        <KeplerGl
                        id="salt"
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
                    ) : undefined } */}

                { (provCode == "01") ? ( 
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="คราบเกลือจังหวัดมหาสารคาม"
                    src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/salts/CS_%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%B2%E0%B8%A1.jpg"
                  />
                ) : undefined }
                { (provCode == "02") ? ( 
                    <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="คราบเกลือจังหวัดขอนแก่น"
                    src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/salts/CS_%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99.jpg"
                  />
                ) : undefined }
                
                { (provCode == "03") ? ( 
                  <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="คราบเกลือจังหวัดาฬสินธุ์"
                  src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/salts/CS_%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99.jpg"
                />                  
                ) : undefined }

                { (provCode == "04") ? ( 
                  <Box
                  component="img"
                  sx={{
                    width: "100%",
                  }}
                  alt="คราบเกลือจังหวัดร้อยเอ็ด"
                  src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/salts/CS_%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%94.jpg"
                />                  
                ) : undefined }

                </Box>
          </Box>
      );
    }


export default GeoSalt;