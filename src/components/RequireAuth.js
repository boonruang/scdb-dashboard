import { useLocation, Outlet, Navigate } from 'react-router-dom';
// import useAuth from 'hooks/useAuth'
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRoles }) => {
  // const { auth } = useAuth();
  const location = useLocation()
  const { result } = useSelector(state => state.app.loginReducer)
  // console.log('allowedRoles',allowedRoles)
  if (result) {
    console.log('loginReducer result ',result)
  }
  // if (auth) {
  //   console.log('auth',auth)
  // }
  return (
  result?.roles?.find((role) => allowedRoles?.includes(role))
   ? <Outlet />
   : result?.username
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
  
}

export default RequireAuth