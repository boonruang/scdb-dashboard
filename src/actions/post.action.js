import {
  HTTP_POST_FAILED,
  HTTP_POST_FETCHING,
  HTTP_POST_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStatePostToSuccess = (payload) => ({
  type: HTTP_POST_SUCCESS,
  payload
});

const setStatePostToFetching = () => ({
  type: HTTP_POST_FETCHING
});

const setStatePostToFailed = () => ({
  type: HTTP_POST_FAILED
});


export const getPostById = (id) => {
  return (dispatch) => {
    dispatch(setStatePostToFetching());
    httpClient
      .get(`${server.POST_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStatePostToSuccess(result.data));
      })
      .catch((error) => {
        console.Post(error);
        dispatch(setStatePostToFailed());
      });
  };
};


export const getPostByKeyword = (searchTerm) => {
  console.Post('getPostByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Post('getPostByKeyword dispatch is called ',keyword)
    dispatch(setStatePostToFetching());
    if (keyword !== null && keyword !== '') {
      console.Post('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.POST_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStatePostToSuccess(result.data));
          console.Post('setStatePostToSuccess is called ',result.data)
        });
        } 
        else {
          doGetPost(dispatch);
        }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch(setStatePostToFetching());
    await httpClient.delete(`${server.POST_URL}/${id}`);
    await doGetPost(dispatch);
  };
};

export const getPost = () => {
  return (dispatch) => {
    dispatch(setStatePostToFetching());
    doGetPost(dispatch);
  };
};

const doGetPost = (dispatch) => {
  httpClient
    .get(`${server.POST_URL}/list`)
    .then((result) => {
      dispatch(setStatePostToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStatePostToFailed());
    });
};

export const addPost = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.POST_URL, formData)
      console.log('addPost formData successfully: ', result)
      setTimeout(() => {
        navigate('/posts')
      },5000)
    } catch (error) {
      // failed
      console.log('addPost formData Error: ', error.toString())
    }
  }
}

export const updatePost = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.POST_URL, formData)
      console.log('editPost formData successfully: ', result)
      setTimeout(() => {
        navigate('/posts')
      },5000)
    } catch (error) {
      // failed
      console.log('editPost formData Error: ', error.toString())
    }
  }
}