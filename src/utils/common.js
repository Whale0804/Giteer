import Taro from '@tarojs/taro'

export const hasLogin = () => {
  return Taro.getStorageSync('Authorization').length > 0
}
