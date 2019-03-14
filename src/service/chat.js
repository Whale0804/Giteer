import Taro from '@tarojs/taro';
import Request from '../utils/request';

//列出授权用户的某个仓库
export const getAllChats = (data) =>Request({
  url: '/api/v5/notifications/messages',
  method: 'GET',
  data: data
});
