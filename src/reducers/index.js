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
})