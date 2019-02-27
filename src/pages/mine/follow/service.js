import Taro from '@tarojs/taro';
import Request from '../../../utils/request';

//列出授权用户的所有仓库
export const getFollowList = data =>Request({
  url: '/api/v5' + data.url,
  method: 'GET',
  data: data
});
