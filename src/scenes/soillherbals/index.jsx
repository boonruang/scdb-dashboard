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

const SoilHerbals = (props) => {
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
      axios.get(`${serviceUrl}/api/v2/SoilHerbals/sidebar/list/all`)
      .then(response => {
        // console.log(response.data.result)
        setData(response.data.result)
      })
      .catch(error => {console.log(error)})
   },[])    
      
     useEffect(() => {
      if (Id) {
         axios.get(`${serviceUrl}/api/v2/SoilHerbals/sidebar/list/${Id}`)
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
              <Header title="ข้อมูลดิน" subtitle="ความเหมาะสมของดิน" />
              <Box
                            component="form"
                            sx={{
                              '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                          >

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

              </Box>
                  {/* <Box height={ isSidebar ? "76vh" : "81vh" } width="100%" borderRadius="4px" sx={{overflow: "hidden"}} > */}
                  <Box height={ isSidebar ? "76vh" : "81vh" } width="100%" borderRadius="4px">
                    <Backdrop
                        sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                      >
                      <CircularProgress color="inherit" />
                    </Backdrop>


                { (provCode == "01") ? ( 
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                    }}
                    alt="ข้อมูลดินจังหวัดมหาสารคาม"
                    src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/soillherbals/soil_msk.jpg"
                  />
                ) : undefined }
                { (provCode == "02") ? ( 
                    <Box
                    component="img"
                    sx={{
                      width: "100%",
                    }}
                    alt="ข้อมูลดินจังหวัดขอนแก่น"
                    src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/soillherbals/soil_khonkaen.jpg"
                  />
                ) : undefined }
                
                { (provCode == "03") ? ( 
                  <Box
                  component="img"
                  sx={{
                    width: "100%",
                  }}
                  alt="ข้อมูลดินจังหวัดาฬสินธุ์"
                  src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/soillherbals/soil_kalasin.jpg"
                />                  
                ) : undefined }

                { (provCode == "04") ? ( 
                  <Box
                  component="img"
                  sx={{
                    width: "100%",
                  }}
                  alt="ข้อมูลดินจังหวัดร้อยเอ็ด"
                  src="https://herbhuk.sgp1.digitaloceanspaces.com/herbals/soillherbals/soil_roi-et.jpg"
                />                  
                ) : undefined }

                </Box>
          </Box>
      );
    }


export default SoilHerbals;