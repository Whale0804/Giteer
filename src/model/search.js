import Taro from '@tarojs/taro';
import * as search from '../pages/index/service';
import * as dynamic from "../pages/dynamic/service";

export default {
  namespace: 'search',
  state: {
    repos: [],
    users: [],
  },
  effects: {
    *getSearchReposList({payload, callback}, {call, put, select}){
      const { repos } = yield select(state => state.search);
      const { page } = payload;
      console.log(payload)
      const res = yield call(search.getSearchReposList,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            repos: page > 1 ? [...repos, ...res] : res,
          },
        });
      }
    },
    *getSearchUserList({payload, callback}, {call, put, select}){
      const { users } = yield select(state => state.search);
      const { page } = payload;
      const res = yield call(search.getSearchUserList,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            users: page > 1 ? [...users, ...res] : res,
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
