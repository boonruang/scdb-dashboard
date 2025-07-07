import { createStore, combineReducers,applyMiddleware, compose } from "redux";
import { enhanceReduxMiddleware, visStateUpdaters, mapStyleUpdaters, combinedUpdaters } from "@kepler.gl/reducers";
import { customizedKeplerGlReducer } from "customizedKeplerGlReducer";

import appReducer from "./reducers";
import logger from 'redux-logger'
import {thunk} from 'redux-thunk'

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer,
  app: appReducer
});

const composedReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VISSTAT_DATASET':
      return {
        ...state,
        keplerGl: {
          ...state.keplerGl,
          soilherbal: {
            ...state.keplerGl.soilherbal,
            visState: visStateUpdaters.updateVisDataUpdater(state.keplerGl.soilherbal.visState, 
              {datasets: action.payload}
            )    
          }
        }
      }
      case 'ADD_DATASET_CONFIG_MAP':
        return {
          ...state,
          keplerGl: {
            ...state.keplerGl,
            // pass in kepler.gl instance state to combinedUpdaters
            soilherbal: combinedUpdaters.addDataToMapUpdater(
             state.keplerGl.soilherbal,
             {
               payload: {
                 datasets: action.payload.datasets,
                 options: {readOnly: true},
                 config: action.payload.config,
                }
              }
            )
          }
        };    
        case 'CLICK_BUTTON':
          return {
            ...state,
            keplerGl: {
              ...state.keplerGl,
              soilherbal: {
                 ...state.keplerGl.soilherbal,
                 visState: visStateUpdaters.enlargeFilterUpdater(
                   state.keplerGl.soilherbal.visState,
                   {idx: 0}
                 )
              }
            }
          };
    // case 'UPDATE_COLOR_FIELD':
    //   //not work
    //   return {
    //     ...state,
    //     keplerGl: {
    //       ...state.keplerGl,
    //       soilherbal: {
    //         ...state.keplerGl.soilherbal,
    //         test1: '12345',
    //         // visState: visStateUpdaters.updateVisDataUpdater(state.keplerGl.soilherbal.visState, {
    //         //   datasets: action.payload
    //         // })    
    //         visState: visStateUpdaters.interactionConfigChangeUpdater(
    //           state.keplerGl.soilherbal.visState,
    //           {
    //             ...state.keplerGl.soilherbal.visState.interactionConfig,
    //             tooltip: {enabled: true},
    //           }),
    //       }
    //       // soilherbal: {
    //       //    ...state.keplerGl.soilherbal,
    //       //    visState: visStateUpdaters.enlargeFilterUpdater(
    //       //      state.keplerGl.soilherbal.visState,
    //       //      {idx: 0}
    //       //    )
    //       // }
    //     }
    //   }
    //   case 'UPDATE_MAP_CONTROLS':
    //     // work
    //     return {
    //       ...state,
    //       keplerGl: {
    //         ...state.keplerGl,
    //         soilherbal: {
    //            ...state.keplerGl.soilherbal,
    //            mapStyle: mapStyleUpdaters.mapConfigChangeUpdater(state.keplerGl.soilherbal.mapStyle,
    //              {payload: {visibleLayerGroups: {label: false, road: false, background: false}}}
    //            )
    //         }
    //       }
    //     };
    //     case 'UPDATE_MAP_THEME':
    //       return {
    //         ...state,
    //         keplerGl: {
    //           ...state.keplerGl,
    //           soilherbal: {
    //              ...state.keplerGl.soilherbal,
    //              mapStyle: mapStyleUpdaters.mapStyleChangeUpdater(state.keplerGl.soilherbal.mapStyle,
    //                {payload: {styleType: 'VoyagerDark'}}
    //              )
    //           }
    //         }
    //       };        
    default: 
    break;
  }
  return reducers(state, action);
 };

// const middlewares = enhanceReduxMiddleware([]);

// export const middlewares = enhanceReduxMiddleware([thunk, routerMiddleware(browserHistory)]);

const middlewares = enhanceReduxMiddleware([thunk]);

const enhancers = [applyMiddleware(...middlewares,logger)];

const initialState = {};

let composeEnhancers = compose;


if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsDenylist: [
      '@@kepler.gl/MOUSE_MOVE',
      '@@kepler.gl/UPDATE_MAP',
      '@@kepler.gl/LAYER_HOVER'
    ]
  });
}


 

// export default createStore(reducers, initialState, composeEnhancers(...enhancers));
export default createStore(composedReducer, initialState, composeEnhancers(...enhancers));