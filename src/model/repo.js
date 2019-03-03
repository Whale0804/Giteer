import Taro from '@tarojs/taro';
import * as repo from '../pages/mine/repo/service';
import * as repos from '../pages/repo/service';
import * as follow from "../pages/mine/follow/service";


export default {
  namespace: 'repo',
  state: {
    repo_list: [],
    repo: {},
    readme: {},
    isWatch: false,
    isStar: false,
    content: null
  },
  effects: {
    *getRepoList({payload, callback}, {call, put, select}){
      const { repo_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repo.getRepoList,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            repo_list: page > 1 ? [...repo_list, ...res] : res,
          },
        });
      }
    },
    *getOtherRepoList({payload, callback}, {call, put, select}){
      const { repo_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repo.getOtherRepoList,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            repo_list: page > 1 ? [...repo_list, ...res] : res,
          },
        });
      }
    },
    *getStarOtherRepoList({payload, callback}, {call, put, select}){
      const { repo_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repo.getStarOtherRepoList,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            repo_list: page > 1 ? [...repo_list, ...res] : res,
          },
        });
      }
    },
    *getRepo({payload, callback}, {call, put, select}){
      const res = yield call(repos.getRepo,payload);
      console.log(res)
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            repo: res,
          },
        });
      }
    },
    *getReadme({payload, callback}, {call, put, select}){
      const res = yield call(repos.getReadme,payload);
      console.log(res)
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            repo: res,
          },
        });
      }
    },
    *checkWatch({payload, callback}, {call, put, select}){
      const res = yield call(repos.checkWatch,payload);
      if(res != ''){
        callback(res);
        yield put({
          type: 'save',
          payload: {
            isWatch: res.isWatch,
          },
        });
      }else{
        callback({isWatch:true});
        yield put({
          type: 'save',
          payload: {
            isWatch: true,
          },
        });
      }
    },
    *doWatch({payload, callback}, {call, put, select}){
      const res = yield call(repos.doWatch,payload);
      callback({isWatch:true});
      yield put({
        type: 'save',
        payload: {
          isWatch: true,
        },
      });
    },
    *delWatch({payload, callback}, {call, put, select}){
      const res = yield call(repos.delWatch,payload);
      callback({isWatch:false});
      yield put({
        type: 'save',
        payload: {
          isWatch: false,
        },
      });
    },
    *checkStar({payload, callback}, {call, put, select}){
      const res = yield call(repos.checkStar,payload);
      if(res != ''){
        callback(res);
        yield put({
          type: 'save',
          payload: {
            isStar: res.isStar,
          },
        });
      }else{
        callback({isStar:true});
        yield put({
          type: 'save',
          payload: {
            isStar: true,
          },
        });
      }
    },
    *doStar({payload, callback}, {call, put, select}){
      const res = yield call(repos.doStar,payload);
      callback({isWatch:true});
      yield put({
        type: 'save',
        payload: {
          isStar: true,
        },
      });
    },
    *delStar({payload, callback}, {call, put, select}){
      const res = yield call(repos.delStar,payload);
      callback({isStar:false});
      yield put({
        type: 'save',
        payload: {
          isStar: false,
        },
      });
    },
    *doFork({payload, callback}, {call, put, select}){
      const res = yield call(repos.doFork,payload);
      callback(res);
    },
    *getContent({payload, callback}, {call, put, select}){
      const res = yield call(repos.getConent,payload);
      console.log(res)
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            content: res,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
