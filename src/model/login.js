import Taro from '@tarojs/taro';
import * as login from "../pages/login/service";

export default {
  namespace: 'login',
  state: {
    access_token: '',
    user:{}
  },
  effects: {
    *login({ payload }, { call, put, }){
      const res = yield call(login.getAccessToken, payload);
      console.log(res);
      if(res.access_token){
        var token = {access_token: res.access_token}
        const user = yield call(login.getUserInfo,token);
        Taro.setStorageSync('user_info', user);
        Taro.setStorageSync('access_token', res.access_token);
        Taro.setStorageSync('refresh_token', res.refresh_token);
        Taro.setStorageSync('expires_in', new Date());
        yield put({
          type: 'common/save',
          payload: {
            access_token: res.access_token,
            user: user
          },
        });

        yield put({
          type: 'save',
          payload: {
            access_token: res.access_token,
            user: user
          },
        });

        Taro.showToast({
          title: '登录成功，欢迎回来～～～',
          icon: 'none',
        });

        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    }
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
