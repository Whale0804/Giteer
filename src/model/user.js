import Taro from '@tarojs/taro';
import * as user from '../pages/mine/service';

export default {
  namespace: 'user',
  state: {
    user_info: []
  },
  effects: {
    *getUser({payload, callback}, {call, put, select}){
      const res = yield call(user.getUser,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            user_info: res,
          },
        });
      }
    }
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
