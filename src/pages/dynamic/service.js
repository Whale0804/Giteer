import Taro from '@tarojs/taro';
import Request from '../../utils/request';

export const getDynamicList = (data) => Request({
  url: '/api/v5/users/'+data.username+'/received_events',
  method: 'GET',
  data: data
})
