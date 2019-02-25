import Taro from '@tarojs/taro';
import * as dynamic from '../pages/dynamic/service'

export default {
  namespace: 'dynamic',
  state: {
    dynamic_list: []
  },
  effects: {
    *getDynamicList({ payload, callback }, { call, put, select}){
      const { dynamic_list } = yield select(state => state.dynamic);
      const { page } = payload;
      const res = yield call(dynamic.getDynamicList,payload);
      if(res.length > 0){
        console.log(page)
        callback(res)
        yield put({
          type: 'save',
          payload: {
            dynamic_list: page > 1 ? [...dynamic_list, ...res] : res,
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
