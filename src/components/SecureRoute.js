import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecureRoute = ({ allowedRoles }) => {
  const location = useLocation()
  const { result } = useSelector(state => state.app.loginReducer)
  if (result) {
    console.log('loginReducer result ',result)
  }
  return (
  result?.roles?.find((role) => allowedRoles?.includes(role))
   ? <Outlet />
   : result?.username
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
  
}

export default SecureRoute