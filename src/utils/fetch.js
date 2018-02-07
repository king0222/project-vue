require('es6-promise').polyfill()
import fetch from 'isomorphic-fetch'
import { baseUrl } from './config'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */


export default function request(url, options) {
	console.log('optons is:', options)
  return fetch(baseUrl + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => {
    	return {
    		data: {} ,
		    error_code: "FALSE",
	        error_msg:  "网络请求出错",
		    success: false
    	}
    });
}
