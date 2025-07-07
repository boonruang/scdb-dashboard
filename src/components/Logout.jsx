import React, { useEffect, useState } from 'react'
import * as loginActions from '../actions/login.action'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { 
    Box, 
} from '@mui/material'

const Logout = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])

  const { result } = useSelector((state) => state.app.loginReducer)

  useEffect(() => {
    setRoles(result?.roles)
  },[result?.roles])
  

  useEffect(() => {
    dispatch(loginActions.logout({navigate},roles))
  },[])

    return <Box m="20px">
            Thank you.
        </Box>
}

export default Logout