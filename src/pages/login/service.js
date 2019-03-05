import Request from '../../utils/request';
import {client_id,client_secret,scope} from '../../config'

// 获取token
export const getAccessToken = data => {
  var v1 = {
    ...data,
    client_id: client_id,
    client_secret: client_secret,
    scope: scope,
    grant_type: 'password'
  };
  return Request({
    url: '/oauth/token',
    method: 'POST',
    data: v1,
  });
}

export const getUserInfo = (token) => Request({
  url: '/api/v5/user',
  method: 'GET',
  data: token
})
