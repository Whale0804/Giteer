import Taro, { Component } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {AtSwipeAction, AtList, AtAvatar} from "taro-ui"
import {connect} from "@tarojs/redux";
import {PER_PAGE, REFRESH_STATUS} from "../../constants/common";
import LoadMore from "../../components/loadMore/loadMore";
import Empty from '../../components/empty'
import {hasLogin, checkExpiresToken, timeago} from "../../utils/common";
import Login from '../../components/login/login';
import {tokenRequest} from "../../utils/otherRequest";
import Markdown from "../../RepoModule/components/repo/markdown";

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
      user: Taro.getStorageSync('user_info')
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
            console.log(res.total_count);
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
    const {user,page} = this.state;
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
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL
        that.setState({
          refresh_status: status
        })
      }
    })
  }

  subContent = content =>{
    return content.length > 30 ? content.substring(0,15) + '...' : content;
  };


  render () {
    const {chat_list} = this.props;
    const {isLogin,refresh_status} = this.state;
    console.log(chat_list);
    return (
      <View>
        {
          isLogin ? (
            <View className='chat'>
              {
                chat_list.length > 0 ? (
                  <AtList>
                    {
                      chat_list.map((item, index) => (
                        <AtSwipeAction autoClose onClick={(e)=>{
                          console.log(e)
                        }} options={[
                          {
                            text: '标记为已读',
                            style: {
                              backgroundColor: '#DD6157'
                            }
                          }
                        ]}>
                          <View className='list-item'>
                            <View className='info_view'>
                              <View className='avatar'>
                                <AtAvatar image={item.sender.avatar_url}/>
                              </View>
                              <View className='text_view'>
                                <Text className='username'>{item.sender.name}</Text>
                                <Text className='time'>{this.subContent(item.content)}</Text>
                              </View>
                            </View>
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
      </View>
    )
  }
}

