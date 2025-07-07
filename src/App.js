import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { Routes,Route, useNavigate } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashbaord from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Philosophers from "./scenes/philosophers";
import Entrepreneurherbals from "./scenes/entrepreneurherbals";
import EntrepreneurherbalAdd from "./scenes/entrepreneurherbals/EntrepreneurherbalAdd";
import EntrepreneurherbalEdit from "./scenes/entrepreneurherbals/EntrepreneurherbalEdit";
import EntrepreneurherbalDetail from "./scenes/entrepreneurherbals/EntrepreneurherbalDetail";

import Entrepreneurmedical from "./scenes/entrepreneurmedical";
import Entrepreneurmedicalmap from "./scenes/entrepreneurmedical/map";
import EntrepreneurmedicalAdd from "./scenes/entrepreneurmedical/EntrepreneurmedicalAdd";
import EntrepreneurmedicalEdit from "./scenes/entrepreneurmedical/EntrepreneurmedicalEdit";
import EntrepreneurmedicalDetail from "./scenes/entrepreneurmedical/EntrepreneurmedicalDetail";
import Farmersregister from "./scenes/farmer/Farmersregister";
import Farmersreset from "./scenes/farmer/Farmersreset";
// import Farmersreject from "./scenes/farmers/Farmersreject";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Herbals from "./scenes/herbals";
// import Researchers from "./scenes/researchers";
import Researchinnovations from "./scenes/researchinnovations";
import ResearchinnovationAdd from "./scenes/researchinnovations/ResearchinnovationAdd";
import ResearchinnovationEdit from "./scenes/researchinnovations/ResearchinnovationEdit";
import ResearchinnovationDetail from "./scenes/researchinnovations/ResearchinnovationDetail";
import Knowledgebase from "./scenes/knowledgebase";
import KnowledgebaseAdd from "./scenes/knowledgebase/KnowledgebaseAdd";
import KnowledgebaseEdit from "./scenes/knowledgebase/KnowledgebaseEdit";
import KnowledgebaseDetail from "./scenes/knowledgebase/KnowledgebaseDetail";
import FarmerGroup from "scenes/farmergroup";
// import BusinessGroup from "scenes/businessgroup";
import Outsources from "scenes/outsources";
import OutsourcesAdd from "scenes/outsources/OutsourcesAdd";
import OutsourcesEdit from "scenes/outsources/OutsourcesEdit";
import OutsourcesDetail from "scenes/outsources/OutsourcesDetail";
import Manufacturer from "scenes/manufacturer";
import ManufacturerAdd from "scenes/manufacturer/ManufacturerAdd";
import ManufacturerEdit from "scenes/manufacturer/ManufacturerEdit";
import ManufacturerDetail from "scenes/manufacturer/ManufacturerDetail";
import Manufacturermap from "scenes/manufacturer/map";
import Outsourcemap from "scenes/outsources/map";
import Exportdata from "scenes/exportdata";
import Geomap from "scenes/geomap";
// import GeoGmaps from "scenes/geogmaps";
import GeoLand from "scenes/geoland";
import GeoSoil from "scenes/geosoil";
import GeoSalt from "scenes/geosalt";
// import Postcode from "scenes/postcode";
import Collaborativefarm from "scenes/collaborativefarms";
// import Collaborativefarmlist from "scenes/collaborativefarms/list";
import CollaborativefarmAdd from "scenes/collaborativefarms/CollaborativefarmAdd";
import CollaborativefarmEdit from "scenes/collaborativefarms/CollaborativefarmEdit";
import CollaborativefarmDetail from "scenes/collaborativefarms/CollaborativefarmDetail";
import Doughtfloodmap from "scenes/doughtfloodmap";
import ThankyouReg from 'components/Thankyoupage'
import Terms from 'components/Terms'
import Registration from 'components/Registration'
import Forgetpassword from 'components/Forgetpassword'
import Login from 'components/Login'
import Admin   from 'components/Admin'
// import Logout from 'components/Logout'
// import Marketplace from "scenes/marketplace";
import Herbalmarketplace from "scenes/herbalmarketplace";
import MarketplaceAdd from "scenes/herbalmarketplace/MarketplaceAdd";
import MarketplaceEdit from "scenes/herbalmarketplace/MarketplaceEdit";
import MarketplaceDetail from "scenes/herbalmarketplace/MarketplaceDetail";
import Herbalmarketplacemap from "scenes/herbalmarketplace/map";
import Farmergroupmap from "scenes/farmergroup/map";
import FarmergroupAdd from "scenes/farmergroup/FarmergroupAdd";
import FarmergroupEdit from "scenes/farmergroup/FarmergroupEdit";
import FarmergroupDetail from "scenes/farmergroup/FarmergroupDetail";
import Autocomplate from "scenes/farmergroup/Auto";
import Farmergroup from "scenes/farmergroup";
import HerbalCarousel from "components/HerbalCarousel";
import HerbalAdd from "scenes/herbals/HerbalAdd";
import HerbalEdit from "scenes/herbals/HerbalEdit";
import HerbalDetail from "scenes/herbals/HerbalDetail";
// import MarketplaceAdd from "scenes/marketplace/MarketplaceAdd";
import HerbalsList from "scenes/herbals/list";
import SoilHerbals from "scenes/soillherbals";
import MapMsk from "scenes/soillherbals/map_msk";
import Layout from "components/Layout";
import Unauthorized from "components/Unauthorized";
import SecureRoute from "components/SecureRoute";
import { ROLES } from './constants/index'
import { useEffect } from "react";
import * as loginActions from 'actions/login.action'
// import Users from "scenes/users/index";
import UsersList from "scenes/users/list";
import UsersAdd from "scenes/users/add";
import Log from "scenes/log";
import UsersEdit from "scenes/users/edit";
// import Farmers from "./scenes/farmers";
// import FarmerDetail from "scenes/farmers/detail";
// import FarmerEdit from "scenes/farmers/edit";
// import FarmerAdd from "scenes/farmers/add";
import Farmer from "./scenes/farmer";
import FarmerDetail from "scenes/farmer/FarmerDetail";
import FarmerEdit from "scenes/farmer/FarmerEdit";
import FarmerAdd from "scenes/farmer/FarmerAdd";

// import Maps from "scenes/farmers/maps";
// import Multistep from "scenes/farmers/multiStep";
// import FieldArray from "scenes/farmers/FieldArray";
// import FarmerApproveDetail from "scenes/farmer/Farmerapprovedetail";
// import FarmerPasswordResetDetail from "scenes/farmer/Farmerpasswordresetdetail";
// import FarmerRejectDetail from "scenes/farmer/Farmerrejectdetail";
// import YupValidation from "scenes/farmers/YupValidation";
import UsersDetail from "scenes/users/detail";
import PhilosopherAdd from "scenes/philosophers/PhilosopherAdd";
import PhilosopherEdit from "scenes/philosophers/PhilosopherEdit";
import PhilosopherDetail from "scenes/philosophers/PhilosopherDetail";

import Posts from "scenes/posts";
import PostAdd from "scenes/posts/PostAdd";
import PostEdit from "scenes/posts/PostEdit";
import PostDetail from "scenes/posts/PostDetail";

function App() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('App Created')
    dispatch(loginActions.reLogin({navigate}))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
  <Routes>
      {/* <Route path="/logout" element={<Logout />} /> */}
      <Route path="/thankyoureg" element={<ThankyouReg />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/backoffice" element={<Admin />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route path="/" element={<Layout />}>

        <Route element={<SecureRoute allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} /> }>
          <Route path="/" element={<Dashbaord />} />
          <Route path="dashboard" element={<Dashbaord />} />
        </Route>

        <Route element={<SecureRoute allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} /> }>
          <Route path="team" element={<Team />} />
          <Route path="contacts" element={<Contacts />} />
          {/* <Route path="researchers" element={<Researchers />} /> */}
          <Route path="researchinnovations" element={<Researchinnovations />} />
          <Route path="researchinnovations/add" element={<ResearchinnovationAdd />} />
          <Route path="researchinnovations/edit" element={<ResearchinnovationEdit />} />
          <Route path="researchinnovations/detail" element={<ResearchinnovationDetail />} />
          <Route path="knowledgebase" element={<Knowledgebase />} />
          <Route path="knowledgebase/add" element={<KnowledgebaseAdd />} />
          <Route path="knowledgebase/edit" element={<KnowledgebaseEdit />} />
          <Route path="knowledgebase/detail" element={<KnowledgebaseDetail />} />
          <Route path="philosophers" element={<Philosophers />} />
          <Route path="philosophers/add" element={<PhilosopherAdd />} />
          <Route path="philosophers/edit" element={<PhilosopherEdit />} />
          <Route path="philosophers/detail" element={<PhilosopherDetail />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/add" element={<PostAdd />} />
          <Route path="posts/edit" element={<PostEdit />} />
          <Route path="posts/detail" element={<PostDetail />} />          
          <Route path="entrepreneurherbals" element={<Entrepreneurherbals />} />
          <Route path="entrepreneurherbals/add" element={<EntrepreneurherbalAdd />} />
          <Route path="entrepreneurherbals/edit" element={<EntrepreneurherbalEdit />} />
          <Route path="entrepreneurherbals/detail" element={<EntrepreneurherbalDetail />} />
          <Route path="entrepreneurmedical" element={<Entrepreneurmedical />} />
          <Route path="entrepreneurmedical/map" element={<Entrepreneurmedicalmap />} />
          <Route path="entrepreneurmedical/add" element={<EntrepreneurmedicalAdd />} />
          <Route path="entrepreneurmedical/edit" element={<EntrepreneurmedicalEdit />} />
          <Route path="entrepreneurmedical/detail" element={<EntrepreneurmedicalDetail />} />
          {/* farmer is new componets for rework */}
          <Route path="farmer" element={<Farmer />} />
          <Route path="farmer/detail" element={<FarmerDetail />} />
          <Route path="farmer/edit" element={<FarmerEdit />} />
          <Route path="farmer/add" element={<FarmerAdd />} />
          {/* end farmer */}
          <Route path="farmer/register" element={<Farmersregister />} />
          <Route path="farmer/reset" element={<Farmersreset />} />
          {/* <Route path="farmers/reject" element={<Farmersreject />} /> */}
          {/* <Route path="farmers/maps" element={<Maps />} /> */}
          {/* <Route path="farmers" element={<Farmers />} />
          <Route path="farmer/detail" element={<FarmerDetail />} />
          <Route path="farmers/edit" element={<FarmerEdit />} />
          <Route path="farmers/add" element={<FarmerAdd />} /> */}
          {/* <Route path="farmers/yub" element={<YupValidation />} /> */}
          {/* <Route path="farmers/approvedetail" element={<FarmerApproveDetail/>}/>
          <Route path="farmers/passwordresetdetail" element={<FarmerPasswordResetDetail/>}/>
          <Route path="farmers/rejectdetail" element={<FarmerRejectDetail />} /> */}
          {/*<Route path="farmers/multistep" element={<Multistep />} />
          <Route path="farmers/fieldarray" element={<FieldArray />} /> */}
          <Route path="farmergroup/map" element={<Farmergroupmap />} />
          <Route path="farmergroup/add" element={<FarmergroupAdd />} />
          <Route path="farmergroup/edit" element={<FarmergroupEdit />} />
          <Route path="farmergroup/detail" element={<FarmergroupDetail />} />
          <Route path="farmergroup/auto" element={<Autocomplate />} />
          <Route path="farmergroup" element={<Farmergroup />} />
          {/* <Route path="businessgroup" element={<BusinessGroup />} /> */}
          <Route path="outsources" element={<Outsources />} />
          <Route path="outsources/add" element={<OutsourcesAdd />} />
          <Route path="outsources/edit" element={<OutsourcesEdit />} />
          <Route path="outsources/detail" element={<OutsourcesDetail />} />
          <Route path="manufacturer" element={<Manufacturer />} />
          <Route path="manufacturer/add" element={<ManufacturerAdd />} />
          <Route path="manufacturer/edit" element={<ManufacturerEdit />} />
          <Route path="manufacturer/detail" element={<ManufacturerDetail />} />
          <Route path="manufacturer/map" element={<Manufacturermap />} />
          <Route path="outsources/map" element={<Outsourcemap />} />
          <Route path="herbalcarousel" element={<HerbalCarousel />} />
          <Route path="exportdata" element={<Exportdata />} />
          <Route path="herbals" element={<Herbals />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="system/log" element={<Log />} />
          <Route path="users/add" element={<UsersAdd />} />
          <Route path="users/detail" element={<UsersDetail />} />
          <Route path="users/edit" element={<UsersEdit />} />
          <Route path="users/list" element={<UsersList />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="geography" element={<Geography />} />
          <Route path="geomap" element={<Geomap />} />
          <Route path="geoland" element={<GeoLand />} />
          <Route path="geosoil" element={<GeoSoil />} />
          <Route path="geosalt" element={<GeoSalt />} />
          {/* <Route path="marketplace" element={<Marketplace />} /> */}
          {/* <Route path="marketplace/add" element={<MarketplaceAdd />} /> */}
          <Route path="herbals/marketplace/map" element={<Herbalmarketplacemap />} />
          <Route path="herbals/marketplace" element={<Herbalmarketplace />} />
          <Route path="herbals/marketplace/add" element={<MarketplaceAdd />} />
          <Route path="herbals/marketplace/edit" element={<MarketplaceEdit />} />
          <Route path="herbals/marketplace/detail" element={<MarketplaceDetail />} />
          <Route path="herbalcarousel" element={<HerbalCarousel />} />
          <Route path="herbals/add" element={<HerbalAdd />} />
          <Route path="herbals/edit" element={<HerbalEdit />} />
          <Route path="herbals/detail" element={<HerbalDetail />} />
          <Route path="herbals/list" element={<HerbalsList />} />
          <Route path="soilMapMsk" element={<MapMsk />} />
          <Route path="soilherbals" element={<SoilHerbals />} />
          <Route path="form" element={<Form />} />
          <Route path="collaborativefarm" element={<Collaborativefarm />} />
          {/* <Route path="collaborativefarm/list" element={<Collaborativefarmlist />} /> */}
          <Route path="collaborativefarm/add" element={<CollaborativefarmAdd />} />
          <Route path="collaborativefarm/edit" element={<CollaborativefarmEdit />} />
          <Route path="collaborativefarm/detail" element={<CollaborativefarmDetail />} />
          <Route path="doughtfloodmap" element={<Doughtfloodmap />} />
        </Route>
        <Route element={<SecureRoute allowedRoles={[ROLES.Admin]} /> }>
         {/* Admin here */}
        </Route>
      </Route>
  </Routes>

  )
}

export default App;
