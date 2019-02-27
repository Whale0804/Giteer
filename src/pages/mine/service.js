import Taro from '@tarojs/taro';
import Request from '../../../utils/request';

//获取一个用户
export const getUser = data =>Request({
  url: '/api/v5/users/'+ data.username,
  method: 'GET',
  data: {}
});
