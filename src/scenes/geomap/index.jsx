/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch,connect, useSelector } from "react-redux";
import { addDataToMap,toggleSplitMap,togglePerspective, replaceDataInMap } from "@kepler.gl/actions";
import { Processors, processGeojson } from '@kepler.gl/processors';
import { Box,Checkbox,Button, InputLabel,MenuItem,FormControl,Select,TextField,FormControlLabel,Typography,useTheme, InputBase,IconButton  } from "@mui/material"
import mkplc_config from '../../data/mkplc_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {wrapTo, forwardTo} from '@kepler.gl/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header";
import { tokens } from '../../theme';
// import { updateMap, updateVisData, querySuccess  } from '../../app-reducer'
import KeplerGlSchema from '@kepler.gl/schemas';
import {createAction} from 'redux-actions';
import {injectComponents, PanelHeaderFactory,SidebarFactory} from '@kepler.gl/components';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import CustomSidebarFactory from 'components/keplergl/CustomSidebarFactory'
import SearchIcon from "@mui/icons-material/Search"
import PlaceIcon from '@mui/icons-material/Place';
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';
import { uiStateLens } from '@kepler.gl/reducers';
import { green } from '@mui/material/colors';
import { Column } from 'react-virtualized';

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVICE_URL

// const updateVisState = createAction('UPDATE_VIS_STATE');
// const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const closeMapLegend = createAction('HIDE_AND_SHOW_MAP_LEGEND');
    
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
/* height: 100%; */
min-height: 60px;
max-height: 100%;
padding: 10px;
`;

const myCustomHeaderFactory = () => CustomHeaderFactory

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory],
  [SidebarFactory, CustomSidebarFactory],
]);

const Geomap = (props) => {


  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(true);
    
    const [data, setData] = useState()

    const [Id, setId] = useState('');

    const [textSearch, setTextSearch] = useState('all');

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    // console.log('keplerGlReducer',keplerGlReducer)   

    useEffect(() => {
      axios.get(`${serviceUrl}/api/v2/marketplace/list/all`)
      .then(response => {
        // console.log(response.data.result)
        setData(response.data.result)
      })
      .catch(error => {console.log(error)})
   },[])    
      
     useEffect(() => {
      if (Id) {
         axios.get(`${serviceUrl}/api/v2/marketplace/list/${Id}`)
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
              "mkplc",
                addDataToMap({
                datasets: {
                  info: {
                    label: 'Salt Mahasarakham',
                    id: 'saltmk1'
                  },
                  data: []
                },     
                config: mkplc_config
                })
          ))
          setOpen(false)
        }
        dispatch(wrapTo('mkplc',closeMapLegend()))
      }, [dispatch,data]);
    
    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.salkmk1)

    useEffect(() => {
      if (data) {
            dispatch(
              wrapTo(
                "mkplc",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Marketplace',
                      id: 'mkplc1'
                    },
                    data: processGeojson(data)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: mkplc_config
                  })
                ))
          }
        setOpen(false)
    },[dispatch,data])

    useEffect(() => {
      axios.get(`${serviceUrl}/api/v2/marketplace/list/${textSearch}`)
      .then(response => {
        // console.log(response.data.result)
        setData(response.data.result)
      })
      .catch(error => {console.log(error)})      

    },[textSearch])

    let arrayDataItems
    if (data) {
      arrayDataItems = data.features.map(item => 
      <Box  backgroundColor={colors.primary[400]} key={item.properties.Id} sx={{ m: 1 }} >
        <Box
            display="flex"
            // backgroundColor={colors.blueAccent[400]}
            borderRadius="3px"
            // justifyContent="center"
            alignItems="center"
        >
            <IconButton type="button" sx={{ p: 1 }} >
                <PlaceIcon />
            </IconButton>
            <Typography
            variant="h5"
            color={colors.greenAccent[400]}
            >
                    {item.properties.marketplacename}
            </Typography>            
        </Box>     
        <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 2 }} >
          <Box>{item.properties.address}, {item.properties.tambon}, {item.properties.amphoe}</Box>
          <Box>{item.properties.province}, {item.properties.postcode}</Box>
        </Box>    
      </Box>
      // console.log('data.features', item.properties.address)
      )
    }

      return (
        <Box m="20px">
            <Header title="ข้อมูลแผนที่" subtitle="แหล่งขาย" />
              <Box  display="flex" justifyContent="space-between" component="form" 
                            sx={{
                              '& > :not(style)': { ml: 0, mb: 1, width: '30ch'},
                            }}
                            noValidate
                            autoComplete="off"
                          >
                    {/* SEARCH BAR */}
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="3px"
                    >
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="ค้นหา" />
                        <IconButton type="button" sx={{ p: 1 }} >
                            <SearchIcon />
                        </IconButton>
                    </Box>     
              </Box>
              <Box height={ isSidebar ? "82vh" : "86vh" } width="100%" borderRadius="4px" sx={{overflow: "hidden"}} >
              <Backdrop
                  sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="mkplc"
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
                    { arrayDataItems }
                  </StyledMapConfigDisplay>                              
                </Box>
          </Box>
      );
    }


export default Geomap;