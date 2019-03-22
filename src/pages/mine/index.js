import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text,Button } from '@tarojs/components'
import { NAVIGATE_TYPE } from '../../constants/navigateType'
import { AtAvatar, AtIcon } from 'taro-ui'
import {checkExpiresToken, hasLogin} from "../../utils/common";
import Login from '../../components/login/login';
import {connect} from "@tarojs/redux";

import './index.scss'
import {tokenRequest} from "../../utils/otherRequest";

@connect(({ user,chat }) => ({
  ...user,
  ...chat
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的',
    enablePullDownRefresh:true
  }

  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      userInfo: null,
    }
  }

  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    },() =>{
      const {isLogin} = this.state;
      if(isLogin){
        if(!checkExpiresToken()){
          Taro.startPullDownRefresh();
          this.getMine();
          // this.props.dispatch({
          //   type: 'chat/getAllChats',
          //   payload: {
          //     page: 1,
          //     per_page: 1,
          //     unread: true
          //   },
          //   callback: (res) => {
          //     console.log(res.total_count);
          //     if (res.total_count > 0) {
          //       Taro.setTabBarBadge({
          //         index: 2,
          //         text: res.total_count + ''
          //       })
          //     }
          //   }
          // })
        }else {
          this.setState({
            isLogin: false,
          },() => {
            tokenRequest()
          })
        }
      }
    });

  }

  componentDidHide () { }

  onPullDownRefresh() {
    this.getMine()
  }

  getMine(){
    let that = this;
    this.props.dispatch({
      type: 'user/getMine',
      payload: { },
      callback: (res) => {
        Taro.stopPullDownRefresh();
        that.setState({
          userInfo: res
        })
      }
    })
  }

  handleNavigate(type) {
    switch (type) {
      case NAVIGATE_TYPE.REPOS: {
        Taro.navigateTo({
          url: '/pages/mine/repo/repoList'
        })
      }
        break
      case NAVIGATE_TYPE.FOLLOWERS: {
        Taro.navigateTo({
          url: '/pages/mine/follow/follower?type=followers'
        })
      }
        break
      case NAVIGATE_TYPE.FOLLOWING: {
        Taro.navigateTo({
          url: '/pages/mine/follow/follower?type=following'
        })
      }
        break
      case NAVIGATE_TYPE.STARRED_REPOS: {
        const user = Taro.getStorageSync('user_info');
        Taro.navigateTo({
          url: '/pages/mine/repo/repoStarOtherList?username=' + user.login
        })
      }
        break
      case NAVIGATE_TYPE.ISSUES: {
        Taro.navigateTo({
          url: '/RepoModule/pages/repo/userIssues'
        })
      }
        break
      case NAVIGATE_TYPE.ABOUT: {
        Taro.navigateTo({
          url: '/pages/mine/about'
        })
      }
        break
      case NAVIGATE_TYPE.STAR: {
        this.handleStar()
      }
        break
      case NAVIGATE_TYPE.FEEDBACK: {
        Taro.navigateToMiniProgram({
          appId: 'wx8abaf00ee8c3202e',
          extraData: {
            id: '55714',
            customData: {}
          }
        })
      }
      break
      default: {
      }
    }
  }

  render () {
    let user = Taro.getStorageSync('user_info');
    if(user){
      user = this.state.userInfo
    }
    const { isLogin } = this.state;
    return (
      <View>
        {
          isLogin ? (
          <View className='content'>
            <Image className='account_bg' src={require('../../asset/images/account_bg.png')}/>
            <View className='user_info'>
              <AtAvatar className='avatar' circle image={user.avatar_url}/>
              {
                user.name.length > 0 &&
                <Text className='username'>{user.name}</Text>
              }
              <View className='login_name'>@{user.login}</View>
            </View>
            <View className='info_view'>
              {user.bio.length > 0 && <View className='bio'>{user.bio}</View>}
              <View className='item_view'>
                <View className='item' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.REPOS)}>
                  <View className='title'>{user.public_repos}+{user.owned_private_repos}</View>
                  <View className='desc'>Repos</View>
                </View>
                <View className='line'/>
                <View className='item' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.FOLLOWERS)}>
                  <View className='title'>{user.followers}</View>
                  <View className='desc'>Followers</View>
                </View>
                <View className='line'/>
                <View className='item' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.FOLLOWING)}>
                  <View className='title'>{user.following}</View>
                  <View className='desc'>Following</View>
                </View>
              </View>
            </View>

            <View className='list_view'>
              <View className='list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.STARRED_REPOS)}>
                <View className='list_title'>收藏的仓库</View>
                <AtIcon value='chevron-right' size='18' color='#7f7f7f'/>
              </View>
              <View className='list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.ISSUES)}>
                <View className='list_title'>Issues</View>
                <AtIcon value='chevron-right' size='18' color='#7f7f7f'/>
              </View>
            </View>
            <View className='list_view'>
              <View className='list'>
                <View className='list_title'>邮箱</View>
                <View className='list_content'>{user.email.length > 0 ? user.email : '--'}</View>
              </View>
              <View className='list'>
                <View className='list_title'>博客</View>
                <View className='list_content'>{user.blog.length > 0 ? user.blog : '--'}</View>
              </View>
              <View className='list'>
                <View className='list_title'>微博</View>
                <View className='list_content'>{user.weibo.length > 0 ? user.weibo : '--'}</View>
              </View>
              <View className='list'>
                <View className='list_title'>地址</View>
                <View className='list_content'>{user.address.length > 0 ? user.address : '--'}</View>
              </View>
            </View>
            <View className='list_view'>
              <Button className='list btn' openType="contact">
                <View className='list_title'>客服</View>
                <AtIcon value='chevron-right' size='18' color='#7f7f7f'/>
              </Button>
              <Button className='list btn' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.FEEDBACK)}>
                <View className='list_title'>意见反馈</View>
                <AtIcon value='chevron-right' size='18' color='#7f7f7f'/>
              </Button>
              <View className='list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.ABOUT)}>
                <View className='list_title'>关于</View>
                <AtIcon value='chevron-right' size='18' color='#7f7f7f'/>
              </View>
            </View>
            <View className='bottom_view'/>
          </View>
          ) : <Login/>
        }
      </View>
    )
  }
}

