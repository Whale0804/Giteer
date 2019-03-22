import Taro, { Component } from '@tarojs/taro'
import {Text, View, Image,} from '@tarojs/components'
import {AtSwipeAction, AtList, AtFloatLayout,AtInput, AtTextarea, AtMessage} from "taro-ui"
import {connect} from "@tarojs/redux";
import {PER_PAGE, REFRESH_STATUS} from "../../constants/common";
import LoadMore from "../../components/loadMore/loadMore";
import Empty from '../../components/empty'
import {hasLogin, checkExpiresToken, timeago} from "../../utils/common";
import Login from '../../components/login/login';
import {tokenRequest} from "../../utils/otherRequest";
import ChatItem from '../../components/chat/chatItem';

import './index.scss'

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
      sub_chat_list: [],
      isOpen:false,
      commentBody: '',
      commentName: '',
    }
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    });
    if(hasLogin()){
      if(!checkExpiresToken()) {
        Taro.startPullDownRefresh();
        this.getAllChats();
        //this.getChatCount();
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

  getChatCount(){
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
        let status = res.list.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL
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

  // handleItemClick = item =>{
  //   const {chat_list,sub_chat_list} = this.state;
  //   let chatIds = {};
  //   sub_chat_list.map((sub,index)=>{
  //     let ids = [];
  //     chat_list.map((chat,idx)=>{
  //       if(sub.sender.login == chat.sender.login){
  //         if(item.sender.login == sub.sender.login){
  //           ids.push(chat.id);
  //         }
  //       }
  //     })
  //     if(ids.length > 0){
  //       chatIds.ids = ids;
  //     }
  //   })
  //   console.log(chatIds)
  // }

  handleUnReadClick = ({id}) => {
    this.props.dispatch({
      type: 'chat/setRead',
      payload: {
        id: id
      },
      callback: (res) => {
        //this.getChatCount();
        this.getAllChats();

      }
    })
  }

  handleItemClick = item =>{
    //this.handleUnReadClick(item);
    Taro.navigateTo({
      url: '/ChatModule/pages/chat/index?id='+item.id,
    })
  };

  handleAddChatClick = () =>{
    this.setState({
      isOpen: true
    })
  };

  handleClose = (e) =>{
    this.setState({
      commentName: '',
      commentBody: '',
      isOpen: false
    })
  };

  handleChange =(value)=>{
    this.setState({
      commentName: value
    })
  };

  handleTextareaChange =(event)=>{
    this.setState({
      commentBody: event.target.value
    })
  };

  handleSubmit(){
    const {commentName, commentBody} = this.state;
    if(commentName == ''){
      Taro.showToast({
        title: '请输入接收者...',
        icon: 'none',
        mask: true,
      });
      return false;
    }
    if(commentBody == ''){
      Taro.showToast({
        title: '请输入私信内容...',
        icon: 'none',
        mask: true,
      });
      return false;
    }

    this.props.dispatch({
      type: 'chat/putChat',
      payload: {
        username: commentName,
        content: commentBody
      },
      callback: (res) => {
        if(res.id){
          Taro.atMessage({
            'message': '私信成功',
            'type': 'error',
          })
          this.setState({
            commentName: '',
            commentBody: '',
            isOpen: false
          })
        }
      }
    })
  }

  render () {
    const {isLogin, chat_list, refresh_status,isOpen, commentName, commentBody} = this.state;
    return (
      <View className='chat'>
        <AtMessage />
        {
          isLogin ? (
            <View>
              {
                chat_list.length > 0 ? (
                  <AtList>
                    {
                      chat_list.map((item, index) => (
                        <View className='chat' key={index}>
                          <View className='list-item' onClick={this.handleItemClick.bind(this,item)}>
                            <ChatItem item={item}/>
                          </View>
                        </View>
                      ))
                    }
                  </AtList>
                ):<Empty/>

              }
              <LoadMore status={refresh_status} />
              <AtFloatLayout isOpened={isOpen} onClose={this.handleClose.bind(this)}>
                <View className='comment-content'>
                  <View className='chat_title'>
                    <AtInput
                      className='input_title'
                      name='title'
                      title=''
                      type='text'
                      placeholder='接收者名'
                      value={commentName}
                      border={false}
                      onChange={this.handleChange.bind(this)}
                    />
                  </View>
                  <View className='chat_comment'>
                    <AtTextarea
                      className='input_comment'
                      height={200}
                      count={false}
                      maxlength={10000}
                      value={commentBody}
                      onChange={this.handleTextareaChange.bind(this)}
                      placeholder='请输入内容...'
                    />
                  </View>
                  <View className='submit' onClick={this.handleSubmit.bind(this)}>
                    发送
                  </View>
                </View>
              </AtFloatLayout>
            </View>
          ):<Login/>
        }
        {
          isLogin && (
            <View className='add_chat' onClick={this.handleAddChatClick}>
              <Image className='chat_icon' src={require('../../asset/images/add_chat.png')} />
            </View>
          )
        }
      </View>
    )
  }
}

