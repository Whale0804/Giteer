import Taro from '@tarojs/taro';
import {searchRequest} from '../../utils/otherRequest';

export const getSearchReposList = (data) => searchRequest({
  url: '/api/v5/search/repositories',
  method: 'GET',
  data: data
});

export const getSearchUserList = (data) => searchRequest({
  url: '/api/v5/search/users',
  method: 'GET',
  data: data
});
