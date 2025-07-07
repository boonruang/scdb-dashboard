import keplerGlReducer, { uiStateUpdaters, visStateUpdaters,mapStateUpdaters,mapStyleUpdaters  } from "@kepler.gl/reducers";
import {ActionTypes} from '@kepler.gl/actions';

export const customizedKeplerGlReducer = keplerGlReducer
.initialState({
  uiState: {
       activeSidePanel: null,  
       currentModal: null,      
       readOnly: true,    
       mapControls: {
         ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
         mapLegend: {
           show: true,
           active: true
         },        
     }
   },
   visState: {
    maxDefaultTooltips:10
   }
 })
 .plugin({
  // work
   HIDE_AND_SHOW_MAP_LEGEND: (state, action) => ({
     ...state,
     uiState: {
       ...state.uiState,
       mapControls: {
         ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
         mapLegend: {        
             show: false
         }
       }
     }
   })
 })  
 .plugin({
  // work
   HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
     ...state,
     uiState: {
       ...state.uiState,
       readOnly: !state.uiState.readOnly
     }
   })
 })
 .plugin({
   UPDATE_VIS_STATE: (state, action) => ({
     ...state,
       mapStyle: {
         ...state.mapStyle,
        //  styleType: action.payload,
       },
       visState: visStateUpdaters.updateVisDataUpdater(state.visState,
        { datasets: action.payload },
       )     
   })
 })  
 .plugin({
  UPDATE_VIS_STATE_CONFIG: (state, action) => ({
     ...state,
       mapStyle: {
         ...state.mapStyle,
       },
       visState: visStateUpdaters.updateVisDataUpdater(state.visState,
        { datasets: action.payload },
       )     
   })
 })  
 .plugin({
  // work
   SET_MAP_PERSPECTIVE: (state, action) => ({
     ...state,
     mapState: mapStateUpdaters.togglePerspectiveUpdater(state.mapState) 
   })
 }) 
 .plugin({
  // work
  TOY_5555: (state, action) => ({
    ...state,
    uiState: {
      ...state.uiState,
      mapControls: {
        ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
        mapLegend: {        
            show: false
        }
      }
    }
   })
 }) 
 .plugin({
  // not work, not error
  SET_MAP_CONFIG_UPDATE: (state, action) => ({
    ...state,
    mapStyle: {
      ...state.mapStyle,
    },
    visState: visStateUpdaters.updateVisDataUpdater(state.visState,
      { payload: action.payload.config }
    )     
   })
 }) 
 .plugin({
  // not work not error
  SET_MAP_STYLE_CHANGE: (state, action) => ({
        ...state,
        visState: {
          ...state.visState,
        },
        mapStyle: mapStyleUpdaters.mapConfigChangeUpdater(state.mapStyle,
          {payload: {styleType: 'VoyagerDark'}}
        )
   })
 }) 
 .plugin({
  // work
  SET_MAP_STAT_FIT: (state, action) => ({
        ...state,
        visState: {
          ...state.visState,
        },
        mapState: mapStateUpdaters.fitBoundsUpdater(state.mapState,
          {payload: [102.613382, 16.625779, 103.941249, 15.490105]}
        )
   })
 }) 
 .plugin({
  // not work but not error
  RCV_MAP_STAT_CONFIG: (state, action) => ({
        ...state,
        visState: {
          ...state.visState,
          checkConfig: action.payload.mapState
        },
        mapState: mapStateUpdaters.receiveMapConfigUpdater(state.mapState,
          {payload: action.payload}
        )
   })
 }) 
 .plugin({
  // not work but not error
  RCV_VIS_STAT_CONFIG: (state, action) => ({
        ...state,
        mapState: {
          ...state.mapState,
        },
        visState: visStateUpdaters.receiveMapConfigUpdater(state.visState,
          {payload: action.payload}
        )
   })
 }) 
 .plugin({
  // work
  RESET_MAP_STAT_CONFIG: (state, action) => ({
        ...state,
        visState: {
          ...state.visState,
          checkConfig: action.payload.mapState
        },
        mapState: mapStateUpdaters.resetMapConfigUpdater(state.mapState,
          {payload: action.payload}
        )
   })
 })   
//  .plugin({
//    [ActionTypes.LAYER_VISUAL_CHANNEL_CHANGE]: (state, action) => ({
//      ...state,
//      visState: visStateUpdaters.layerVisualChannelChangeUpdater() 
//     })
//   })  
//   .plugin({
//  // for listening updateMap action
//    [ActionTypes.UPDATE_MAP]: (state, action) => ({
//      ...state,
//      viewport: action.payload 
//    })
//  })  