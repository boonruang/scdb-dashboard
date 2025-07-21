import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { Routes,Route, useNavigate } from 'react-router-dom';
import Dashbaord from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import ThankyouReg from 'components/Thankyoupage'
import Terms from 'components/Terms'
// import Registration from 'components/Registration'
// import Forgetpassword from 'components/Forgetpassword'
import Login from 'components/Login'
import Admin   from 'components/Admin'
import Layout from "components/Layout";
import Unauthorized from "components/Unauthorized";
import SecureRoute from "components/SecureRoute";
import { ROLES } from './constants/index'
import { useEffect } from "react";
import * as loginActions from 'actions/login.action'
import StudentList from "scenes/student";
import UsersList from "scenes/users/list";
import UsersAdd from "scenes/users/add";
import Log from "scenes/log";
import UsersEdit from "scenes/users/edit";
import UsersDetail from "scenes/users/detail";

function App() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('App Created')
    dispatch(loginActions.reLogin({navigate}))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
  <Routes>
      <Route path="/thankyoureg" element={<ThankyouReg />} />
      <Route path="/terms" element={<Terms />} />
      {/* <Route path="/registration" element={<Registration />} /> */}
      {/* <Route path="/forgetpassword" element={<Forgetpassword />} /> */}
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
          <Route path="system/log" element={<Log />} />
          <Route path="users/add" element={<UsersAdd />} />
          <Route path="users/detail" element={<UsersDetail />} />
          <Route path="users/edit" element={<UsersEdit />} />
          <Route path="users/list" element={<UsersList />} />
          <Route path="student" element={<StudentList />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="geography" element={<Geography />} />

          <Route path="form" element={<Form />} />
        </Route>
        <Route element={<SecureRoute allowedRoles={[ROLES.Admin]} /> }>
         {/* Admin here */}
        </Route>
      </Route>
  </Routes>

  )
}

export default App;
