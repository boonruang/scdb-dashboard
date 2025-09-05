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
import StudentAdd from "scenes/student/StudentAdd"; 
import StudentDetail from "scenes/student/StudentDetail"; 
import StudentEdit from "scenes/student/StudentEdit"; 
import StudentgrantList from "scenes/studentgrant";
import StudentgrantAdd from "scenes/studentgrant/StudentgrantAdd"; 
import StudentgrantDetail from "scenes/studentgrant/StudentgrantDetail"; 
import StudentgrantEdit from "scenes/studentgrant/StudentgrantEdit"; 
import StaffList from "scenes/staff";
import StaffAdd from "scenes/staff/StaffAdd"; 
import StaffDetail from "scenes/staff/StaffDetail"; 
import StaffEdit from "scenes/staff/StaffEdit"; 
import StaffeducationList from "scenes/staffeducation";
import StaffeducationAdd from "scenes/staffeducation/StaffeducationAdd"; 
import StaffeducationDetail from "scenes/staffeducation/StaffeducationDetail"; 
import StaffeducationEdit from "scenes/staffeducation/StaffeducationEdit"; 

import AcademicProgramList from "scenes/academicprogram";
import AcademicProgramAdd from "scenes/academicprogram/AcademicProgramAdd"; 
import AcademicProgramDetail from "scenes/academicprogram/AcademicProgramDetail"; 
import AcademicProgramEdit from "scenes/academicprogram/AcademicProgramEdit"; 

import AdmissionPlanList from "scenes/admissionplan";
import AdmissionPlanAdd from "scenes/admissionplan/AdmissionPlanAdd"; 
import AdmissionPlanDetail from "scenes/admissionplan/AdmissionPlanDetail"; 
import AdmissionPlanEdit from "scenes/admissionplan/AdmissionPlanEdit"; 

import PublicationList from "scenes/publication";
import PublicationAdd from "scenes/publication/PublicationAdd"; 
import PublicationDetail from "scenes/publication/PublicationDetail"; 
import PublicationEdit from "scenes/publication/PublicationEdit"; 

import ProjectList from "scenes/project";
import ProjectAdd from "scenes/project/ProjectAdd"; 
import ProjectDetail from "scenes/project/ProjectDetail"; 
import ProjectEdit from "scenes/project/ProjectEdit"; 

import DocumentList from "scenes/document";
import DocumentAdd from "scenes/document/DocumentAdd"; 
import DocumentDetail from "scenes/document/DocumentDetail"; 
import DocumentEdit from "scenes/document/DocumentEdit"; 

import LeaverecordList from "scenes/leaverecord";
import LeaverecordAdd from "scenes/leaverecord/LeaverecordAdd"; 
import LeaverecordDetail from "scenes/leaverecord/LeaverecordDetail"; 
import LeaverecordEdit from "scenes/leaverecord/LeaverecordEdit"; 
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
          <Route path="student/add" element={<StudentAdd />} />
          <Route path="student/detail" element={<StudentDetail />} />
          <Route path="student/edit" element={<StudentEdit />} />
          <Route path="student" element={<StudentList />} />
          <Route path="studentgrant/add" element={<StudentgrantAdd />} />
          <Route path="studentgrant/detail" element={<StudentgrantDetail />} />
          <Route path="studentgrant/edit" element={<StudentgrantEdit />} />
          <Route path="studentgrant" element={<StudentgrantList />} />
          <Route path="staff/add" element={<StaffAdd />} />
          <Route path="staff/detail" element={<StaffDetail />} />
          <Route path="staff/edit" element={<StaffEdit />} />
          <Route path="staff" element={<StaffList />} />
          <Route path="staffeducation/add" element={<StaffeducationAdd />} />
          <Route path="staffeducation/detail" element={<StaffeducationDetail />} />
          <Route path="staffeducation/edit" element={<StaffeducationEdit />} />
          <Route path="staffeducation" element={<StaffeducationList />} />

          <Route path="academicprogram/add" element={<AcademicProgramAdd />} />
          <Route path="academicprogram/detail" element={<AcademicProgramDetail />} />
          <Route path="academicprogram/edit" element={<AcademicProgramEdit />} />
          <Route path="academicprogram" element={<AcademicProgramList />} />    

          <Route path="admissionplan/add" element={<AdmissionPlanAdd />} />
          <Route path="admissionplan/detail" element={<AdmissionPlanDetail />} />
          <Route path="admissionplan/edit" element={<AdmissionPlanEdit />} />
          <Route path="admissionplan" element={<AdmissionPlanList />} />   

          <Route path="publication/add" element={<PublicationAdd />} />
          <Route path="publication/detail" element={<PublicationDetail />} />
          <Route path="publication/edit" element={<PublicationEdit />} />
          <Route path="publication" element={<PublicationList />} />     

          <Route path="project/add" element={<ProjectAdd />} />
          <Route path="project/detail" element={<ProjectDetail />} />
          <Route path="project/edit" element={<ProjectEdit />} />
          <Route path="project" element={<ProjectList />} />     

          <Route path="document/add" element={<DocumentAdd />} />
          <Route path="document/detail" element={<DocumentDetail />} />
          <Route path="document/edit" element={<DocumentEdit />} />
          <Route path="document" element={<DocumentList />} />   

          <Route path="leaverecord/add" element={<LeaverecordAdd />} />
          <Route path="leaverecord/detail" element={<LeaverecordDetail />} />
          <Route path="leaverecord/edit" element={<LeaverecordEdit />} />
          <Route path="leaverecord" element={<LeaverecordList />} />                  
          <Route path="calendar" element={<Calendar />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />

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
