import Taro from "@tarojs/taro";
import {baseUrl} from "../config";
export const tokenRequest = () => {
  Taro.request({
    url: 'https://gitee.com/oauth/token',
    data: { grant_type: 'refresh_token',refresh_token:Taro.getStorageSync('refresh_token') },
    header: { 'content-type': 'application/json' },
    method: 'POST'
  }).then(res => {
    console.log('刷新Token');
    console.log(res.data.access_token);
    Taro.setStorageSync('access_token', res.data.access_token);
    Taro.setStorageSync('expires_in', new Date());
  })
}

export const fileRequest = (options) => Taro.request({
  url: options.url,
  data: { ...options.data },
  header: { 'content-type': 'application/json' },
  method: options.method.toUpperCase()
}).then(res => {
  return res.data;
});

export const searchRequest = (options) => Taro.request({
  url: baseUrl+options.url,
  data: { ...options.data },
  header: { 'content-type': 'application/json' },
  method: options.method.toUpperCase()
}).then(res => {
  return res.data;
});

export const repoRequest = (options) => Taro.request({
  url: baseUrl+options.url,
  data: { ...options.data },
  header: { 'content-type': 'application/json' },
  method: options.method.toUpperCase()
}).then(res => {
  return res.data;
});

