import {
  HTTP_AUTHORPROFILE_FETCHING,
  HTTP_AUTHORPROFILE_SUCCESS,
  HTTP_AUTHORPROFILE_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

var setFetching = function() { return { type: HTTP_AUTHORPROFILE_FETCHING } }
var setSuccess = function(payload) { return { type: HTTP_AUTHORPROFILE_SUCCESS, payload: payload } }
var setFailed = function() { return { type: HTTP_AUTHORPROFILE_FAILED } }

export var getAuthorProfiles = function() {
  return async function(dispatch) {
    dispatch(setFetching())
    try {
      var res = await httpClient.get(server.AUTHORPROFILE_URL + '/list')
      dispatch(setSuccess(res.data))
    } catch (e) { dispatch(setFailed()) }
  }
}

export var createAuthorProfile = function(data) {
  return async function() {
    try {
      var res = await httpClient.post(server.AUTHORPROFILE_URL, data)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}

export var updateAuthorProfile = function(id, data) {
  return async function() {
    try {
      var res = await httpClient.put(server.AUTHORPROFILE_URL + '/' + id, data)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}

export var deleteAuthorProfile = function(id) {
  return async function(dispatch) {
    try {
      await httpClient.delete(server.AUTHORPROFILE_URL + '/' + id)
      dispatch(setFetching())
      var res = await httpClient.get(server.AUTHORPROFILE_URL + '/list')
      dispatch(setSuccess(res.data))
    } catch (e) { dispatch(setFailed()) }
  }
}

export var bulkImportAuthorProfile = function(records) {
  return async function() {
    try {
      var res = await httpClient.post(server.AUTHORPROFILE_URL + '/bulk', records)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}

// ยังคงไว้สำหรับ publication import (ใช้จาก publicationimportdata)
export var bulkImportPublication = function(records) {
  return async function() {
    try {
      var res = await httpClient.post(server.PUBLICATION_URL + '/bulk', records)
      return res.data
    } catch (e) { return { status: 'nok', result: String(e) } }
  }
}
