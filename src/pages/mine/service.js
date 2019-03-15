import Taro from '@tarojs/taro';
import Request from '../../utils/request';
import {repoRequest} from '../../utils/otherRequest';

//获取授权用户的资料
export const getMine = () =>Request({
  url: '/api/v5/user',
  method: 'GET',
});
//获取一个用户
export const getUser = data =>repoRequest({
  url: '/api/v5/users/'+ data.username,
  method: 'GET',
  data: {}
});
