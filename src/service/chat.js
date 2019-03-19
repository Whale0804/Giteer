import Taro from '@tarojs/taro';
import Request from '../utils/request';

//列出授权用户的某个仓库
export const getAllChats = (data) =>Request({
  url: '/api/v5/notifications/messages',
  method: 'GET',
  data: data
});

//标记一条私信为已读
export const setRead = (data) =>Request({
  url: '/api/v5/notifications/messages/'+data.id,
  method: 'PUT',
  data: data
});

//获取一条私信
export const getChat = (data) =>Request({
  url: '/api/v5/notifications/messages/'+data.id,
  method: 'GET',
  data: data
});

//发送私信给指定用户
export const put = (data) =>Request({
  url: '/api/v5/notifications/messages',
  method: 'POST',
  data: data
});
