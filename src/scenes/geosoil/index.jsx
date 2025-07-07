/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch,connect, useSelector } from "react-redux";
// import KeplerGl from '@kepler.gl/components';
import { addDataToMap,toggleSplitMap,togglePerspective, replaceDataInMap } from "@kepler.gl/actions";
import { Processors, processGeojson } from '@kepler.gl/processors';
// import klc_geojson from '../../data/land_kanglerngchan.json';
import { Box,Checkbox,Button, InputLabel,MenuItem,FormControl,Select,TextField,FormControlLabel,Typography,useTheme  } from "@mui/material"
import soikmk_config from '../../data/soilmk_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {wrapTo, forwardTo, updateMap} from '@kepler.gl/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header";
import { tokens } from '../../theme';
// import { updateMap, updateVisData, querySuccess  } from '../../app-reducer'
import KeplerGlSchema from '@kepler.gl/schemas';
import {createAction} from 'redux-actions';
import {injectComponents, PanelHeaderFactory,SidebarFactory, MapLegendFactory} from '@kepler.gl/components';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import CustomSidebarFactory from 'components/keplergl/CustomSidebarFactory'

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVICE_URL

const updateVisState = createAction('UPDATE_VIS_STATE');
const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const updateColorField = createAction('UPDATE_COLOR_FIELD');

const myCustomHeaderFactory = () => CustomHeaderFactory

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory],
  [SidebarFactory, CustomSidebarFactory],
]);


const GeoSoil = (props) => {
// console.log('SidebarFactory',SidebarFactory)
// console.log('MapLegendFactory',MapLegendFactory)

  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(true);
    
    const [data, setData] = useState()

    const [ampCode, setAmpCode] = useState('01');

    const [provCode, setProvCode] = useState('01');

    const keplerGlReducer = useSelector((state) => state.keplerGl)

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    // console.log('keplerGlReducer',keplerGlReducer)   
      
     useEffect(() => {
      if (ampCode) {
         axios.get(`${serviceUrl}/api/v2/geosoil/list/${ampCode}`)
        .then(response => {
          // console.log(response.data.result)
          setData(response.data.result)
        })
        .catch(error => {console.log(error)})       
      }
        // console.log('amp_code useEffect',ampCode)
     },[ampCode])
      
      useEffect(() => {
        if (data){
          dispatch(
            wrapTo(
              "soilmk1",
                addDataToMap({
                datasets: {
                  info: {
                    label: 'Soil Mahasarakham',
                    id: 'soilmk1'
                  },
                  data: []
                },     
                config: soikmk_config
                })
          ))
          setOpen(false)
        }
      }, [dispatch,data]);
    
    // if (data) {
    //   console.log('processGeojson(data)',processGeojson(data))
    // } else {
    //   console.log('no processGeojson(data)');
    // }


    // const handleSelect = (event) => {
    //   clearData();
    //   setAmpCode(event.target.value);
    //   // dispatch(updateMap());
    //   setOpen(true)
    //   if (ampCode) {
    //     replaceData();
    //     console.log('come!!!!!!!!',ampCode)
    //   }
    // };    


    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.soilmk1)
    let mapConfig
    if (keplerGlReducer.soilmk1) {
      mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.soilmk1)
      // mapConfig.config.mapStyle.styleType = "voyagerDark";
      console.log('soilmk1 mapConfig',mapConfig)
    }



    useEffect(() => {
      if (data && ampCode) {
            dispatch(
              wrapTo(
                "soilmk1",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Soil Mahasarakham',
                      id: 'soilmk1'
                    },
                    data: processGeojson(data)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: soikmk_config
                  })
                ))
                console.log('replace data with amp_code => ',ampCode)
          }
        setOpen(false)
    },[dispatch, ampCode, data ])

    const handleSelect = async (event) => {
      setAmpCode(event.target.value);
      // console.log('event.target.value',event.target.value)
      // console.log('amp_code in handleSelect',ampCode)
    };    

    const handleSelectProv = (event) => {
      setProvCode(event.target.value);
    };  

      return (
        <Box m="20px">
              <Header title="ข้อมูลแผนที่" subtitle="ข้อมูลดิน"/>
              <Box
                            component="form"
                            sx={{
                              '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                    {/* <Button variant="contained" color="success" onClick={() => dispatch(wrapTo("soilmk1",(updateVisData(KeplerGlSchema.getDatasetToSave(keplerGlReducer.soilmk1)))))}>
                      Update visData
                    </Button>  */}


                    {/* <Button variant="contained" color="success" onClick={() => dispatch(wrapTo('soilmk1',(updateVisData(keplerGlReducer)))) }>
                      Update visData
                    </Button>                     */}

                    <Button variant="contained" color="success" onClick={() => dispatch(wrapTo('soilherbal',(updateColorField("55555")))) }>
                      Button click
                    </Button>  
                    
                    <Button variant="contained" color="success" onClick={() => dispatch(wrapTo('soilmk1',(updateVisState("voyagerDark")))) }>
                      Update MapStyle
                    </Button>  

                    {/* <Button variant="contained" color="success" onClick={() => dispatch(wrapTo('soilmk1',querySuccess(keplerGlReducer))) }>
                      Do Query Success
                    </Button>  */}

                    <Button variant="contained" color="success" onClick={() => dispatch(wrapTo('soilmk1',updateMap({latitude: 16.245516, longitude: 103.250034, width: 800, height: 1200},1))) }>
                      Update Map
                    </Button> 

                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={ampCode}
                      label="AmphueCode"
                      onChange={handleSelect}
                    >
                      <MenuItem value={""}>
                        <em>ไม่ระบุ</em>
                      </MenuItem>
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
                    <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilmk1",(toggleSplitMap)))}>
                      Toggle Split Map
                    </Button>  

                    <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilmk1",(togglePerspective)))}>
                      Toggle Perspective
                    </Button>                                         

                    <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo('soilmk1',toggleSidePanel())) }>
                      Toggle Side Panel
                    </Button> 

                      <Typography
                          variant="h5"
                          color={colors.greenAccent[400]}
                      >
                              รหัสอำเภอ {ampCode} รหัสจังหวัด {provCode}
                      </Typography>
              </Box>
              <Box height={ isSidebar ? "76vh" : "81vh" } borderRadius="4px" sx={{overflow: "hidden"}} >
              <Backdrop
                  sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="soilmk1"d
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
                </Box>
          </Box>
      );
    }


export default GeoSoil;