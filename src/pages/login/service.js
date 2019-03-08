import Request from '../../utils/request';

// 获取token
export const getAccessToken = data => {
  var v1 = {
    ...data,
  };
  return Request({
    url: '/oauth/token',
    method: 'POST',
    data: v1,
  });
};

export const getUserInfo = (token) => Request({
  url: '/api/v5/user',
  method: 'GET',
  data: token
})
