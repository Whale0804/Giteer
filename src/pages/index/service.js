import Taro from '@tarojs/taro';
import Request from '../../utils/request';

export const getSearchReposList = (data) => Request({
  url: '/api/v5/search/repositories',
  method: 'GET',
  data: data
});

export const getSearchUserList = (data) => Request({
  url: '/api/v5/search/users',
  method: 'GET',
  data: data
});
