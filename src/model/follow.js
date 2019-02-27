import Taro from '@tarojs/taro';
import * as follow from '../pages/mine/follow/service';

export default {
  namespace: 'follow',
  state: {
    follow_list: []
  },
  effects: {
    *getFollowList({payload, callback}, {call, put, select}){
      const { follow_list } = yield select(state => state.follow);
      const { page } = payload;
      const res = yield call(follow.getFollowList,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            follow_list: page > 1 ? [...follow_list, ...res] : res,
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
