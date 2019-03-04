import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import {checkExpiresToken, hasLogin} from "../../utils/common";
import Login from '../../components/login/login';
import SearchBar from '../../components/index/SearchBar'
import SearchHistory from '../../components/index/searchHistory'

import './index.scss'
import {LOADING_TEXT} from "../../constants/common";

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'Giteer',
  }

  constructor (props) {
    super(props)
    this.state = {
      notice: null,
      notice_closed: false,
      isLogin: false,
      history:[]
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    const {isLogin} = this.state;
    if(isLogin){
      if(!checkExpiresToken()){
        this.loadNotice();
        this.loadHistory();
      }else {
        this.setState({
          isLogin: false,
        },() => {
          Taro.navigateTo({
            url: '/pages/login/login'
          })
        })
      }
    }
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    })
  }

  componentDidHide () { }

  onPullDownRefresh() {
  }



  loadNotice(){
    let that = this;
    const db = wx.cloud.database();
    db.collection('notices').orderBy('create_date', 'desc')
      .get()
      .then(res => {
        if(res.data.length > 0){
          const key = 'notice_key_'+res.data[0]._id;
          const notice_closed = Taro.getStorageSync(key);
          that.setState({
            notice: res.data[0],
            notice_closed: notice_closed
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  onCloseNotice() {
    const { notice } = this.state;
    const key = 'notice_key_' + notice._id;
    Taro.setStorageSync(key, true)
  }

  onClickSearch(e) {
    const value = e.detail.value
    if (value && value.length > 0) {
      this.updateHistory(value);
      Taro.navigateTo({
        url: '/pages/index/searchResult?value=' + encodeURI(value)
      });
    } else {
      Taro.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
    }
  }

  updateHistory(value) {
    const { history } = this.state;
    for (let item of history) {
      if (value === item) {
        history.splice(history.indexOf(item), 1);
        break
      }
    }
    history.unshift(value);
    let that = this
    Taro.setStorage({
      key: 'search_history',
      data: history,
      success(res) {
        that.loadHistory()
      }
    })
  }

  loadHistory() {
    let that = this;
    Taro.getStorage({
      key: 'search_history',
    }).then(res =>{
      if (res.data.length > 0) {
        that.setState({
          history: res.data
        })
      }
    }).catch(err =>{

    })
  }

  clear_history() {
    console.log('clear')
    Taro.removeStorage({
      key: 'search_history'
    })
    this.setState({
      history: []
    })
  }

  onTagClick (item) {
    this.updateHistory(item.name);
    let url = '/pages/index/searchResult?value=' + encodeURI(item.name)
    Taro.navigateTo({
      url: url
    })
  }

  render () {
    const { notice, notice_closed, isLogin } = this.state;
    let {history} = this.state;
    if(history.length > 10){
      history = history.slice(0,10)
    }
    return (
      <View>
        {
          isLogin ? (
            <View className='content'>
              {
                (notice.status && !notice_closed) &&
                <AtNoticebar icon='volume-plus'
                             close
                             onClose={this.onCloseNotice.bind(this)}>
                  {notice.notice_content}
                </AtNoticebar>
              }
              <View className='search-bar-fixed'>
                <SearchBar onClickSearch={this.onClickSearch} />
              </View>
              {
                history.length > 0 &&
                <View className='search-history-bg'>
                  <View className='search-history'>
                    <SearchHistory items={history} onTagClick={this.onTagClick}/>
                  </View>
                  <View className='clear' onClick={this.clear_history.bind(this)}>Clear All</View>
                </View>
              }
              { history.length == 0 &&
                <View style={{textAlign: 'center', marginTop: '90px'}}>
                  <Image mode='aspectFit'
                         className='logo'
                         src={require('../../asset/images/octocat.png')}/>
                  <Text className='text'>Giteer For 码云</Text>
                </View>
              }
            </View>):<Login/>
        }
      </View>
    )
  }
}

