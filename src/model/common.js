import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    access_token: Taro.getStorageSync('access_token'),
    user: Taro.getStorageSync('user_info')
      ? Taro.getStorageSync('user_info')
      : '',
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
