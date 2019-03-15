import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSwipeAction, AtList, AtListItem } from "taro-ui"
import {connect} from "@tarojs/redux";
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../constants/common";
import LoadMore from "../../../components/loadMore/loadMore";
import Empty from '../../components/empty'
import {hasLogin,checkExpiresToken} from "../../utils/common";
import Login from '../../components/login/login';
import {tokenRequest} from "../../utils/otherRequest";

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
    })
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

  render () {
    const {chat_list} = this.props;
    console.log(chat_list);
    return (
      <View className='chat'>
        <AtList>
          <AtSwipeAction autoClose onClick={(e)=>{

          }} options={[
            {
              text: '标记为已读',
              style: {
                backgroundColor: '#6190E8'
              }
            }
          ]}>
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://avatar.gitee.com/uploads/1/1_oschina-org.png?1524465517'
              note='详细信息详细信息详细信息详细信息'
            />
          </AtSwipeAction>
          <AtSwipeAction autoClose onClick={(e)=>{

          }} options={[
            {
              text: '标记为已读',
              style: {
                backgroundColor: '#6190E8'
              }
            }
          ]}>
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              note='详细信息详细信息详细信息详细信息'
            />
          </AtSwipeAction>
          <AtSwipeAction autoClose onClick={(e)=>{

          }} options={[
              {
                text: '标记为已读',
                style: {
                  backgroundColor: '#6190E8'
                }
              }
            ]}
          >
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              note='详细信息详细信息详细信息详细信息'
            />
          </AtSwipeAction>
        </AtList>
      </View>
    )
  }
}

