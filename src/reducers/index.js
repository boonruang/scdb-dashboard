import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./login.reducer";
import marketplaceReducer from "./marketplace.reducer";
import farmerReducer from "./farmer.reducer";
import farmerselectedReducer from "./farmerselected.reducer";
import registerReducer from "./register.reducer";
import farmergroupReducer from "./farmergroup.reducer";
import farmergroupmapReducer from "./farmergroupmap.reducer";
import herbalReducer from "./herbal.reducer";
import geosoilReducer from "./geosoil.reducer";
import geosaltReducer from "./geosalt.reducer";
import herbalrecommendedReducer from "./herbalrecommended.reducer";
import herbalselectedReducer from "./herbalselected.reducer";
import herbalselectedmapReducer from "./herbalselectedmap.reducer";
import herbalpriceReducer from "./herbalprice.reducer";
import herbalpriceyearReducer from "./herbalpriceyear.reducer";
import dashboardReducer from "./dashboard.reducer";
import userReducer from "./user.reducer";
import userSelectedReducer from "./userSelected.reducer";
import roleReducer from "./role.reducer";
import philosopherReducer from "./philosopher.reducer";   
import collaborativefarmReducer from "./collaborativefarm.reducer";   
import entrepreneurherbalReducer from "./entrepreneurherbal.reducer";   
import entrepreneurmedicalReducer from "./entrepreneurmedical.reducer";   
import entrepreneumedicalmapReducer from "./entrepreneumedicalmap.reducer";   
import outsourceReducer from "./outsource.reducer";   
import outsourcemapReducer from "./outsourcemap.reducer";   
import researchinnovationReducer from "./researchinnovations.reducer";   
import herbalmarketplaceReducer from "./herbalmarketplace.reducer";   
import herbalmarketplacemapReducer from "./herbalmarketplacemap.reducer";   
import knowledgebaseReducer from "./knowledgebase.reducer";   
import manufacturerReducer from "./manufacturer.reducer";   
import manufacturermapReducer from "./manufacturermap.reducer";   
import logReducer from "./log.reducer";   
import producttypeReducer from "./producttype.reducer";   
import entretypeReducer from "./entretype.reducer";   
import servicetypeReducer from "./servicetype.reducer";   
import ownertypeReducer from "./ownertype.reducer";   
import producetypeReducer from "./producetype.reducer";   
import standardtypeReducer from "./standardtype.reducer";   
import herbalpaginationReducer from "./herbal.pagination.reducer";   
import postReducer from "./post.reducer";   

export default combineReducers({
  appReducer,
  loginReducer,
  marketplaceReducer,
  farmerReducer,
  farmerselectedReducer,
  farmergroupReducer,
  farmergroupmapReducer,
  herbalReducer,
  geosoilReducer,
  geosaltReducer,
  herbalrecommendedReducer,
  herbalselectedReducer,
  herbalselectedmapReducer,
  herbalpriceReducer,
  herbalpriceyearReducer,
  dashboardReducer,
  userReducer,
  userSelectedReducer,
  roleReducer,
  registerReducer,
  philosopherReducer,
  collaborativefarmReducer,
  entrepreneurherbalReducer,
  entrepreneurmedicalReducer,
  entrepreneumedicalmapReducer,
  outsourceReducer,
  outsourcemapReducer,
  researchinnovationReducer,
  herbalmarketplaceReducer,
  herbalmarketplacemapReducer,
  knowledgebaseReducer,
  manufacturerReducer,
  manufacturermapReducer,
  logReducer,
  producttypeReducer,
  entretypeReducer,
  servicetypeReducer,
  ownertypeReducer,
  producetypeReducer,
  standardtypeReducer,
  herbalpaginationReducer,
  postReducer,
})