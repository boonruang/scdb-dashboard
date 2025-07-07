/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { processGeojson } from '@kepler.gl/processors';
import { Box, useTheme, InputBase,IconButton,Button  } from "@mui/material"
import fmg_config from '../../data/fmg_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Header from "../../components/Header";
import { tokens } from '../../theme';
import {createAction} from 'redux-actions';
import {injectComponents, PanelHeaderFactory,SidebarFactory} from '@kepler.gl/components';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import CustomSidebarFactory from 'components/keplergl/CustomSidebarFactory'
import SearchIcon from "@mui/icons-material/Search"
import useDebounce from 'hooks/useDebounce';
import FarmergroupList from '../../components/FarmergroupList'
import { addDataToMap, wrapTo, updateMap, removeDataset as removeDatasetFromKepler } from '@kepler.gl/actions'
// import useSWR from 'swr'
import KeplerGlSchema from '@kepler.gl/schemas';
import { showSidebar } from 'actions/app.action';
import { getHerbals } from 'actions/herbal.action';
import FarmergroupDetail from 'components/FarmergroupDetail';
import HerbalCarousel from 'components/HerbalCarousel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setStateFarmergroupSelectedToFetching } from 'actions/farmergroup.action'

const mapBoxKey = process.env.REACT_APP_MAPBOX_API

const updateVisState = createAction('UPDATE_VIS_STATE');
// const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const closeMapLegend = createAction('HIDE_AND_SHOW_MAP_LEGEND');
  
const myCustomHeaderFactory = () => CustomHeaderFactory

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory],
  [SidebarFactory, CustomSidebarFactory],
]);

const Farmergroupmap = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [isSearcBoxOpen, setIsSearcBoxOpen] = useState(true)

    const [isFarmerBoxOpen, setIsFarmerBoxOpen] = useState(false)
    
    const [isHerbalBoxOpen, setIsHerbalBoxOpen] = useState(false)
    
    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const { result, selectedResult } = useSelector((state) => state.app.farmergroupReducer)

    // if (result) {
    //   console.log('result check',result)
    // }

    // const { mkplc } = useSelector((state) => state.keplerGl)

    // if (mkplc) {
    //   console.log('mkplc',mkplc)
    // }
    
    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.mkplc)

    // useEffect(() => {
    //   dispatch(getHerbals())
    // },[dispatch])

    useEffect(() => {
      // when farmergroup state change (click)
      if (selectedResult) {
        setIsFarmerBoxOpen(true)
      }
    },[selectedResult])

    useEffect(() => {
      if (result) {
            dispatch(removeDatasetFromKepler('fmg1'))
            dispatch(
              wrapTo(
                "farmergroup",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Farmergroup',
                      id: 'fmg1'
                    },
                    data: processGeojson(result)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: fmg_config
                  })
                ))
          dispatch(wrapTo('farmergroup',closeMapLegend()))
          console.log('i am running in useEffect ')
          setTimeout(() => {
            dispatch(wrapTo('farmergroup',updateVisState()))
            // dispatch(showSidebar(false))
          },500)
        }
    },[dispatch,result])

    const handleSearchClick = () => {
      setIsSearcBoxOpen(!isSearcBoxOpen)
      dispatch(setStateFarmergroupSelectedToFetching())        
    }    

    const handleFarmerClick = () => {
      setIsFarmerBoxOpen(!isFarmerBoxOpen)
    }    

    const handleHerbalClick = () => {
      setIsHerbalBoxOpen(!isHerbalBoxOpen)
    }    

      return (
        <Box m="20px">
            <Header title="ข้อมูลกลุ่มเกษตรกร" subtitle="กลุ่มเกษตรกรสมุนไพร" />
              <Box  height={ isSidebar ? "86vh" : "90vh" } width="100%" sx={{overflow: "hidden"}}>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="farmergroup"
                    mapboxApiAccessToken={mapBoxKey}
                    height={height}               
                    width={width}
                    sx={{
                      "& .mapboxgl-children": {
                        style : {
                          height: "0%"
                        }}
                      }}                    
                    />
                    )}
                  </AutoSizer >                   

                  <Box 
                    sx={{ position: 'absolute', p: 0.5, left: isSearcBoxOpen ? 295 : 0, top: 5, backgroundColor: '#ec8a2f',cursor: 'pointer' }} 
                    onClick={() => handleSearchClick()}>
                      {isSearcBoxOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                  </Box>  

                    {isSearcBoxOpen ? <Box  display="flex" justifyContent="space-between" component="form" 
                                  sx={{
                                    '& > :not(style)': { height: 45, width: '33.5ch', position: 'absolute', top: 0, left: 0},
                                  }}
                                  noValidate
                                  autoComplete="off"
                                >
                          {/* SEARCH BAR */}
                          <Box
                              display="flex"
                              backgroundColor={colors.primary[400]}
                          >
                              <InputBase autoFocus sx={{ ml: 2,p: 1, flex: 1 }} placeholder="ค้นหา" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                              <IconButton type="button" sx={{ p: 1 }} >
                                  <SearchIcon />
                              </IconButton>
                          </Box>   
                    </Box>  : undefined }

                    {isSearcBoxOpen ? <FarmergroupList searchTerm={debouncedSearchValue} /> : undefined}

                   { selectedResult ? <Box 
                    sx={{ position: 'absolute', p: 1, left: isFarmerBoxOpen && selectedResult ? 655 : 300, top: 45, backgroundColor: '#458048',cursor: 'pointer' }} 
                    onClick={() => handleFarmerClick()}>
                      {isFarmerBoxOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </Box> : undefined }

                  { isFarmerBoxOpen && selectedResult ? <FarmergroupDetail /> : undefined }

                  {
                   isHerbalBoxOpen && selectedResult?.herbals ? 
                   <AutoSizer>
                   {({height, width}) => (
                   <Box sx={{ height: 150, width: 1250, position: 'absolute', bottom: 220, left: ((width-300-1250)/2)+300, zIndex: 9 }}>
                    <HerbalCarousel  />
                   </Box>
                   )}
                   </AutoSizer>
                   : undefined 
                  }     

                  { selectedResult?.herbals.length > 0 ? 
                   <AutoSizer>
                   {({height, width}) => (                  
                      <Box 
                        sx={{ position: 'absolute', p: 1, left: ((width-300-1250)/2)+300, bottom: isHerbalBoxOpen ? 333 : 0, backgroundColor: '#458048',cursor: 'pointer',zIndex: 10 }} 
                        onClick={() => handleHerbalClick()}>
                          {isHerbalBoxOpen ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                      </Box>
                   )}
                   </AutoSizer>                  
                  : undefined }                  
              </Box>
          </Box>
      );
    }


export default Farmergroupmap;