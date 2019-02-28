import Taro from '@tarojs/taro';
import Request from '../../../utils/request';

//列出授权用户的所有仓库
export const getRepoList = data =>Request({
  url: '/api/v5/user/repos',
  method: 'GET',
  data: data
});
//获取某个用户的公开仓库
export const getOtherRepoList = data =>Request({
  url: '/api/v5/users/'+data.username+'/repos',
  method: 'GET',
  data: data
});
//列出用户 star 了的仓库
export const getStarOtherRepoList = data =>Request({
  url: '/api/v5/users/'+data.username+'/starred',
  method: 'GET',
  data: data
});
