import Taro from '@tarojs/taro';
import Request from '../../../utils/request';
import {repoRequest} from '../../../utils/otherRequest';
import {METHOD_TYPE} from '../../../constants/methodType'

//列出授权用户的所有仓库
export const getFollowList = data =>Request({
  url: '/api/v5' + data.url,
  method: 'GET',
  data: data
});

//检查授权用户是否关注了一个用户
export const checkFollowing = data => {
  return Request({
    url: '/api/v5/user/following/'+data.username,
    method: 'GET',
    data: {
      METHOD_TYPE: METHOD_TYPE.CHECK_FOLLOW
    }
  });
};
//关注一个用户
export const doFollowed = data => {
  return Request({
    url: '/api/v5/user/following/'+data.username,
    method: 'PUT',
    data: {}
  });
};
//取消关注一个用户
export const unFollowed = data => {
  return Request({
    url: '/api/v5/user/following/'+data.username,
    method: 'DELETE',
    data: {}
  });
};
