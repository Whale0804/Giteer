import Taro from '@tarojs/taro';
import * as chat from '../service/chat'

export default {
  namespace: 'chat',
  state: {
    chat_list: []
  },
  effects: {
    *getAllChats({ payload, callback }, { call, put, select}){
      const { chat_list } = yield select(state => state.chat);
      const { page } = payload;
      const res = yield call(chat.getAllChats,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            chat_list: page > 1 ? [...chat_list, ...res] : res,
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
