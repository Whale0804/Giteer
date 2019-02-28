import Taro from '@tarojs/taro';
import * as follow from '../pages/mine/follow/service';

export default {
  namespace: 'follow',
  state: {
    follow_list: [],
    isFollow: true
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
    },
    *checkFollowing({payload, callback}, {call, put, select}){
      const res = yield call(follow.checkFollowing,payload);
      if(res != ''){
        callback(res);
        yield put({
          type: 'save',
          payload: {
            isFollow: res.isFollow,
          },
        });
      }else{
        callback({isFollow:true});
        yield put({
          type: 'save',
          payload: {
            isFollow: true,
          },
        });
      }
    },
    *doFollowed({payload, callback}, {call, put, select}){
      const res = yield call(follow.doFollowed,payload);
      callback({isFollow:true});
      yield put({
        type: 'save',
        payload: {
          isFollow: true,
        },
      });
    },
    *unFollowed({payload, callback}, {call, put, select}){
      const res = yield call(follow.unFollowed,payload);
      callback({isFollow:false});
      yield put({
        type: 'save',
        payload: {
          isFollow: false,
        },
      });
    }
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
