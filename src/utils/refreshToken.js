import Taro from "@tarojs/taro";

export const refreshToken = () => {
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
