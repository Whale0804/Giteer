import Taro from '@tarojs/taro';
import * as login from '../service/login';

export default {
  namespace: 'login',
  state: {},
  effects: {},
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
