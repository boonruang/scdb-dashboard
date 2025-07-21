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
})