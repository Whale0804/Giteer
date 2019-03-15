import Taro, { Component } from '@tarojs/taro'
import {Text, View, Image} from '@tarojs/components'
import {AtSwipeAction, AtList, AtAvatar, AtIcon} from "taro-ui"
import {connect} from "@tarojs/redux";
import {PER_PAGE, REFRESH_STATUS} from "../../constants/common";
import LoadMore from "../../components/loadMore/loadMore";
import Empty from '../../components/empty'
import {hasLogin, checkExpiresToken, timeago} from "../../utils/common";
import Login from '../../components/login/login';
import {tokenRequest} from "../../utils/otherRequest";
import ChatItem from '../../components/chat/chatItem';

@connect(({ chat }) => ({
  ...chat,
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '私信',
    enablePullDownRefresh:true
  }

  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      page: 1,
      refresh_status: REFRESH_STATUS.NORMAL,
      user: Taro.getStorageSync('user_info'),
      chat_list: [],
      sub_chat_list: []
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const {isLogin} = this.state;
    if(isLogin){
      if(!checkExpiresToken()){
        Taro.startPullDownRefresh();
        this.getAllChats();
      }else {
        this.setState({
          isLogin: false,
        },() => {
          tokenRequest()
        })
      }
    }
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    });
    if(hasLogin()){
      if(!checkExpiresToken()) {
        this.props.dispatch({
          type: 'chat/getAllChats',
          payload: {
            page: 1,
            per_page: 1,
            unread: true
          },
          callback: (res) => {
            if (res.total_count > 0) {
              Taro.setTabBarBadge({
                index: 2,
                text: res.total_count + ''
              })
            }
          }
        })
      }else {
        tokenRequest()
      }
    }
  }

  componentDidHide () { }

  //下拉刷新
  onPullDownRefresh() {
    let that = this;
    this.setState({
      page: 1
    }, ()=>{
      that.getAllChats();
    })
  }

  //上拉加载
  onReachBottom(){
    const { page, refresh_status } = this.state
    if (refresh_status !== REFRESH_STATUS.NO_MORE_DATA) {
      let that = this
      this.setState({
        page: page + 1
      }, ()=>{
        that.getAllChats()
      })
    }
  }

  getAllChats = () =>{
    const {chat_list,page} = this.state;
    let that = this;

    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }
    this.props.dispatch({
      type: 'chat/getAllChats',
      payload: {
        page: page,
        per_page:PER_PAGE
      },
      callback: (res) => {
        Taro.stopPullDownRefresh();
        if (page === 1) {
          that.setState({
            chat_list: res.list
          })
        } else {
          that.setState({
            chat_list: chat_list.concat(res.list)
          })
        }
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL
        that.setState({
          refresh_status: status
        })
      }
    })
  }

  arrayUnique2(arr, name) {
    let hash = {};
    let its = [];
    let list = arr.reduce((item, next) => {
      hash[next.sender[name]] ? '' : hash[next.sender[name]] = true && item.push(next);
      return item;
    }, []);
    this.setState({
      sub_chat_list: list
    })
    return list;
  }

  handleItemClick = item =>{
    const {chat_list,sub_chat_list} = this.state;
    let chatIds = {};
    sub_chat_list.map((sub,index)=>{
      let ids = [];
      chat_list.map((chat,idx)=>{
        if(sub.sender.login == chat.sender.login){
          if(item.sender.login == sub.sender.login){
            ids.push(chat.id);
          }
        }
      })
      if(ids.length > 0){
        chatIds.ids = ids;
      }
    })
    console.log(chatIds)
  }

  render () {
    const {isLogin, refresh_status} = this.state;
    let chatList = this.arrayUnique2(this.state.chat_list,'login');
    return (
      <View>
        {
          isLogin ? (
            <View className='chat'>
              {
                chatList.length > 0 ? (
                  <AtList>
                    {
                      chatList.map((item, index) => (
                        <AtSwipeAction autoClose onClick={(e)=>{
                          console.log(e)
                        }} options={[
                          {
                            text: '标记为已读',
                            style: {
                              backgroundColor: '#DD6157'
                            }
                          }
                        ]} key={index}>
                          <View className='list-item' onClick={this.handleItemClick.bind(this,item)}>
                            <ChatItem item={item}/>
                          </View>
                        </AtSwipeAction>
                      ))
                    }
                  </AtList>
                ):<Empty/>
              }
              <LoadMore status={refresh_status} />
            </View>
          ):<Login/>
        }
        <View className='add_chat' onClick={this.addIssue.bind(this)}>
          <Image src={require('../../asset/images/add_chat.png')} />
        </View>
      </View>
    )
  }
}

