import {
  HTTP_LOGIN_FAILED,
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  server,
  YES,
  HTTP_LOGOUT,
  LOGIN_STATUS,
  TOKEN,
  OK,
  ROLES,
} from '../constants'

import { httpClient } from '../utils/HttpClient'
import { jwtDecode } from 'jwt-decode'

export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
})

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
})

export const setLoginStateToFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload,
})

export const setLoginStateToLogout = () => ({
  type: HTTP_LOGOUT,
})

export const reLogin = ({navigate}) => {
  console.log('reLogin action is called')
  return (dispatch) => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS)
    console.log('LoginStatus: ', loginStatus)
    let userToken = localStorage.getItem(TOKEN)
    console.log('userToken: ', userToken)
    if (userToken) {
      const userToken_decoded = jwtDecode(userToken)
      console.log('User Token Decoded in reLogin: ', userToken_decoded)
      var { username, roles } = userToken_decoded
    } else {
      console.log('userToken on localStorage not found')
    }
    if (loginStatus === 'ok' && username && roles) {
      // dispatch(setLoginStateToSuccess({}))
      dispatch(setLoginStateToSuccess({ status: 'ok', username, roles }))
      console.log('reLogin dispatch is called')
      // navigate('/herbals/list')
      navigate('/dashboard')
    }
  }
}

export const isLoggedIn = () => {
  console.log('isLoggedIn action is called')
  const loginStatus = localStorage.getItem(LOGIN_STATUS)
  //return true or false
  return loginStatus === 'ok'
}

export const login = ({ username, password, navigate }) => {
  console.log('login action is called')
  return async (dispatch) => {
    dispatch(setLoginStateToFetching())
    console.log('User: ', username)
    // console.log('History: ', history)
    const result = await httpClient.post(server.LOGIN_URL, {
      username,
      password,
    })
    if (result.data.result === 'ok') {
      localStorage.setItem(LOGIN_STATUS, 'ok')
      localStorage.setItem(TOKEN, result.data.accessToken)
      let userToken = result.data.accessToken
      let roles
      if (userToken) {
        let userToken_decoded = jwtDecode(userToken)
        console.log('User Token Decoded in login: ', userToken_decoded)
        roles = userToken_decoded.roles
      }
      dispatch(
        // setLoginStateToSuccess({ status: 'ok', token: result.data.token }),
        // setLoginStateToSuccess('ok'),
        setLoginStateToSuccess({ status: 'ok', username, roles }),
      )
      console.log('login dispatch is called')
      // history.push('/dashboard')
      navigate('/dashboard')
      // alert(JSON.stringify(result.data));
    } else {
      localStorage.setItem(LOGIN_STATUS, 'nok')
      dispatch(setLoginStateToFailed(result.data.message))
    }
  }
}

export const letin = ({ username, password, navigate }) => {
  console.log('login action is called')
  return async (dispatch) => {
    dispatch(setLoginStateToFetching())
    console.log('User: ', username)
    // console.log('History: ', history)
    const result = await httpClient.post(server.LETIN_URL, {
      username,
      password,
    })
    if (result.data.result === 'ok') {
      localStorage.setItem(LOGIN_STATUS, 'ok')
      localStorage.setItem(TOKEN, result.data.accessToken)
      let userToken = result.data.accessToken
      let roles
      if (userToken) {
        let userToken_decoded = jwtDecode(userToken)
        console.log('User Token Decoded in login: ', userToken_decoded)
        roles = userToken_decoded.roles
      }
      dispatch(
        // setLoginStateToSuccess({ status: 'ok', token: result.data.token }),
        // setLoginStateToSuccess('ok'),
        setLoginStateToSuccess({ status: 'ok', username, roles }),
      )
      console.log('login dispatch is called')
      // history.push('/dashboard')
      navigate('/dashboard')
      // alert(JSON.stringify(result.data));
    } else {
      localStorage.setItem(LOGIN_STATUS, 'nok')
      dispatch(setLoginStateToFailed(result.data.message))
    }
  }
}

export const logout = ({ navigate }, roles) => {
  return (dispatch) => {
    localStorage.removeItem(LOGIN_STATUS)
    localStorage.removeItem(TOKEN)
    // history.push('/')
    dispatch(setLoginStateToLogout())
    console.log('roles in login.action',roles)
    // roles.find((role) => [ROLES.Admin].includes(role)) ? navigate('/backoffice') : navigate('/')   
    navigate('/')
  }
}
