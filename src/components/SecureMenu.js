import { Outlet  } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecureMenu = ({ allowedRoles }) => {
  const { result } = useSelector(state => state.app.loginReducer)
  if (result) {
    console.log('loginReducer result ',result)
  }
  return (
  result?.roles?.find((role) => allowedRoles?.includes(role))
   ? <Outlet />
   : undefined
  )
  
}

export default SecureMenu