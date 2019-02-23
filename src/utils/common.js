import Taro from '@tarojs/taro'

export const hasLogin = () => {
  return Taro.getStorageSync('access_token').length > 0
}
