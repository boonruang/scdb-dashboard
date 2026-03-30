import {
  HTTP_AUTHORPROFILESUPPORT_FETCHING,
  HTTP_AUTHORPROFILESUPPORT_SUCCESS,
  HTTP_AUTHORPROFILESUPPORT_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

var setFetching = function() { return { type: HTTP_AUTHORPROFILESUPPORT_FETCHING } }
var setSuccess = function(payload) { return { type: HTTP_AUTHORPROFILESUPPORT_SUCCESS, payload: payload } }
var setFailed = function() { return { type: HTTP_AUTHORPROFILESUPPORT_FAILED } }

export var getAuthorProfileSupports = function() {
  return async function(dispatch) {
    dispatch(setFetching())
    try {
      var res = await httpClient.get(server.AUTHORPROFILESUPPORT_URL + '/list')
      dispatch(setSuccess(res.data))
    } catch (e) { dispatch(setFailed()) }
  }
}

export var createAuthorProfileSupport = function(data) {
  return async function() {
    try {
      var res = await httpClient.post(server.AUTHORPROFILESUPPORT_URL, data)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}

export var updateAuthorProfileSupport = function(id, data) {
  return async function() {
    try {
      var res = await httpClient.put(server.AUTHORPROFILESUPPORT_URL + '/' + id, data)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}

export var deleteAuthorProfileSupport = function(id) {
  return async function(dispatch) {
    try {
      await httpClient.delete(server.AUTHORPROFILESUPPORT_URL + '/' + id)
      dispatch(setFetching())
      var res = await httpClient.get(server.AUTHORPROFILESUPPORT_URL + '/list')
      dispatch(setSuccess(res.data))
    } catch (e) { dispatch(setFailed()) }
  }
}

export var bulkImportAuthorProfileSupport = function(records) {
  return async function() {
    try {
      var res = await httpClient.post(server.AUTHORPROFILESUPPORT_URL + '/bulk', records)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}
