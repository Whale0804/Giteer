import Taro from '@tarojs/taro';
import * as dynamic from '../pages/dynamic/service'

export default {
  namespace: 'dynamic',
  state: {
    dynamic_list: []
  },
  effects: {
    *getDynamicList({ payload }, { call, put, }){
      const res = yield call(dynamic.getDynamicList,payload);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            dynamic_list: res
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
