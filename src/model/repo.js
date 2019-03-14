import Taro from '@tarojs/taro';
import * as repo from '../pages/mine/repo/service';
import * as repos from '../service/repo';


export default {
  namespace: 'repo',
  state: {
    repo_list: [],
    repo: {},
    readme: {},
    isWatch: false,
    isStar: false,
    content: null,
    file: null,
    contributors: [],
    events: [],
    issues_list: [],
    issue: null,
    comment_list: [],
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
      if(res){
        if(res.length > 0){
          yield put({
            type: 'save',
            payload: {
              repo: res,
            },
          });
        }
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
    *getFile({payload, callback}, {call, put, select}){
      const res = yield call(repos.getFile,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            file: res,
          },
        });
      }
    },
    *getFile2({payload, callback}, {call, put, select}){
      const res = yield call(repos.getFile2,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            file: res,
          },
        });
      }
    },
    *getContributors({payload, callback}, {call, put, select}){
      const res = yield call(repos.getContributors,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            contributors: res,
          },
        });
      }
    },
    *getRepoEvents({payload, callback}, {call, put, select}){
      const { events } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repos.getRepoEvents,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            events: page > 1 ? [...events, ...res] : res,
          },
        });
      }
    },
    *getRepoIssues({payload, callback}, {call, put, select}){
      const { issues_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repos.getRepoIssues,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            issues_list: page > 1 ? [...issues_list, ...res] : res,
          },
        });
      }
    },
    *getUserIssues({payload, callback}, {call, put, select}){
      const { issues_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repos.getUserIssues,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            issues_list: page > 1 ? [...issues_list, ...res] : res,
          },
        });
      }
    },
    *addIssue({payload, callback}, {call, put, select}){
      const res = yield call(repos.addIssue,payload);
      callback(res);
    },
    *getIssues({payload, callback}, {call, put, select}){
      const res = yield call(repos.getIssues,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            issue: res,
          },
        });
      }
    },
    *getIssuesComments({payload, callback}, {call, put, select}){
      const { comment_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repos.getIssuesComments,payload);
      callback(res);
      if(res.length > 0){
        yield put({
          type: 'save',
          payload: {
            comment_list: page > 1 ? [...comment_list, ...res] : res,
          },
        });
      }
    },
    *addIssueComments({payload, callback}, {call, put, select}){
      console.log(payload)
      const res = yield call(repos.addComments,payload);
      callback(res);
    },
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
