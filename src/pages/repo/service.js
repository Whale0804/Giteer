import Taro from '@tarojs/taro';
import Request from '../../utils/request';
import {METHOD_TYPE} from "../../constants/methodType";

//列出授权用户的某个仓库
export const getRepo = (data) =>Request({
  url: '/api/v5/repos/'+data.url,
  method: 'GET',
});
//获取仓库README
export const getReadme = (data) =>Request({
  url: '/api/v5/repos/'+data.url+'/readme',
  method: 'GET',
});

/**
 *  ###################################  WATCH  #####################################
 */
//watch 一个仓库
export const doWatch = (data) =>Request({
  url: '/api/v5/user/subscriptions/'+data.url,
  method: 'PUT',
});
//检查授权用户是否 watch 了一个仓库
export const checkWatch = (data) =>Request({
  url: '/api/v5/user/subscriptions/'+data.url,
  method: 'GET',
  data: {
    METHOD_TYPE: METHOD_TYPE.CHECK_WATCH
  }
});
//取消 watch 一个仓库
export const delWatch = (data) =>Request({
  url: '/api/v5/user/subscriptions/'+data.url,
  method: 'DELETE',
});
/**
 *  ###################################  WATCH  #####################################
 */


/**
 *  ###################################  Star  ######################################
 */
//检查授权用户是否 star 了一个仓库
export const checkStar = (data) =>Request({
  url: '/api/v5/user/starred/'+data.url,
  method: 'GET',
  data: {
    METHOD_TYPE: METHOD_TYPE.CHECK_STAR
  }
});
//star 一个仓库
export const doStar = (data) =>Request({
  url: '/api/v5/user/starred/'+data.url,
  method: 'PUT',
});
//取消 star 一个仓库
//取消 watch 一个仓库
export const delStar = (data) =>Request({
  url: '/api/v5/user/starred/'+data.url,
  method: 'DELETE',
});
/**
 *  ###################################  Star  ######################################
 */


/**
 *  ###################################  Fork  ######################################
 */
//fork 一个仓库
export const doFork = (data) =>Request({
  url: '/api/v5/repos/'+data.url+'/forks',
  method: 'POST',
});
/**
 *  ###################################  Fork  ######################################
 */

/**
 *  ###################################  Tree  ######################################
 */
//获取目录Tree（支持跨域）
export const getConent = (data) =>Request({
  url: '/api/v5/repos/'+data.url+'/git/gitee/trees/'+ data.sha,
  method: 'GET',
  data: data
});
/**
 *  ###################################  Tree  ######################################
 */
