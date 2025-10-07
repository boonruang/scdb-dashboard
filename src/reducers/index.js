import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";
import dashboardReducer from "./dashboard.reducer";
import userReducer from "./user.reducer";
import userSelectedReducer from "./userSelected.reducer";
import roleReducer from "./role.reducer";
import logReducer from "./log.reducer";   
import studentReducer from "./student.reducer";   
import staffReducer from "./staff.reducer";   
import studentgrantReducer from "./studentgrant.reducer";   
import publicationReducer from "./publication.reducer";   
import academicProgramReducer from "./academicProgram.reducer";   
import projectReducer from "./project.reducer";   
import staffeducationReducer from "./staffeducation.reducer";   
import leaverecordReducer from "./leaverecord.reducer";   
import admissionPlanReducer from "./admissionPlan.reducer";   
import documentReducer from "./document.reducer";   
import stafftypeReducer from "./stafftype.reducer";   
import departmentReducer from "./department.reducer";   
import staffuploadfileReducer from "./staffeducation.reducer";   
import dashboard1Reducer from "./dashboard1.reducer";   
import dashboard2Reducer from "./dashboard2.reducer";   
import dashboard3Reducer from "./dashboard3.reducer";   
import dashboard4Reducer from "./dashboard4.reducer";   
import dashboard5Reducer from "./dashboard5.reducer";   

export default combineReducers({
  appReducer,
  loginReducer,
  dashboardReducer,
  userReducer,
  userSelectedReducer,
  roleReducer,
  registerReducer,
  logReducer,
  studentReducer,
  academicProgramReducer,
  staffReducer,
  studentgrantReducer,
  publicationReducer,
  projectReducer,
  staffeducationReducer,
  leaverecordReducer,
  admissionPlanReducer,
  documentReducer,
  stafftypeReducer,
  departmentReducer,
  staffuploadfileReducer,
  dashboard1Reducer,
  dashboard2Reducer,
  dashboard3Reducer,
  dashboard4Reducer,
  dashboard5Reducer,
})