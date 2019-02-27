import Taro from '@tarojs/taro';
import Request from '../../../utils/request';

//列出授权用户的所有仓库
export const getRepoList = data =>Request({
  url: '/api/v5/user/repos',
  method: 'GET',
  data: data
});
