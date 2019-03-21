import Taro from '@tarojs/taro';
import * as chat from '../service/chat'

export default {
  namespace: 'chat',
  state: {
    chat_list: [],
    chat: {}
  },
  effects: {
    *getAllChats({ payload, callback }, { call, put, select}){
      const { chat_list } = yield select(state => state.chat);
      const { page } = payload;
      const res = yield call(chat.getAllChats,payload);
      callback(res);
      if(res.list.length > 0){
        yield put({
          type: 'save',
          payload: {
            chat_list: page > 1 ? [...chat_list, ...res.list] : res.list,
          },
        });
      }
    },
    *setRead({ payload, callback }, { call, put, select}){
      const res = yield call(chat.setRead,payload);
      callback(res);
    },
    *putChat({ payload, callback }, { call, put, select}){
      const res = yield call(chat.putChat,payload);
      callback(res);
    },
    *getChat({ payload, callback }, { call, put, select}){
      const res = yield call(chat.getChat,payload);
      callback(res);
      yield put({
        type: 'save',
        payload: {
          chat: res,
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
