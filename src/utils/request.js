import Taro from '@tarojs/taro'
import {baseUrl, noConsole} from "../config";
import {hasLogin} from "./common";
import {METHOD_TYPE} from '../constants/methodType';

export default (options = {method: 'GET',data: {} }) =>{
  var data = {};

  //判断是否登录，自动封装TOKEN
  if(hasLogin()){
    data = {
      ...options.data,
      access_token: Taro.getStorageSync('access_token')
    }
  }else{
    data = {
      ...options.data
    }
  }

  //输出请求日志
  if (!noConsole){
    console.log(
      `${new Date().toLocaleDateString()}【M=${options.url}】P=${JSON.stringify(data)}`
    );
  }

  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...data,
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const {statusCode, data} = res;
    if(statusCode >= 200 && statusCode < 300){
      if(!noConsole){
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res
        )
      }
      return data;
    }else {
      // if(statusCode == 401){
      //   Taro.setStorageSync('access_token', '');
      //   Taro.setStorageSync('user_info', '');
      //   Taro.navigateTo({
      //     url: '/pages/login/login'
      //   })
      // }else
      if(statusCode == 404){
        //Api返回404即未关注此用户
        console.log(options)
        if(options.data !=  undefined){
          if(options.data.METHOD_TYPE == METHOD_TYPE.CHECK_FOLLOW){
            return {
              isFollow:false
            };
          }else if(options.data.METHOD_TYPE == METHOD_TYPE.CHECK_WATCH) {
            return {
              isWatch:false
            };
          }else if(options.data.METHOD_TYPE == METHOD_TYPE.CHECK_STAR) {
            return {
              isStar:false
            };
          }
        }
      }else {
        Taro.showToast({
          title: '遇到未知错误',
          icon: 'none',
          mask: true,
        });
      }
      console.log(`网络请求状态码${statusCode}`);
    }
  });

}
