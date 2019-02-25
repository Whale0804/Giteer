import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text,Button } from '@tarojs/components'
import { NAVIGATE_TYPE } from '../../constants/navigateType'
import { AtAvatar, AtIcon } from 'taro-ui'
import {hasLogin} from "../../utils/common";
import Login from '../../components/login/login';

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      isLogin: hasLogin()
    })
  }

  componentDidHide () { }

  handleNavigate(type) {
    switch (type) {
      case NAVIGATE_TYPE.REPOS: {
        let url = encodeURI(baseUrl + '/user/repos')
        Taro.navigateTo({
          url: '/pages/repo/repoList?url=' + url
        })
      }
        break
      case NAVIGATE_TYPE.FOLLOWERS: {
        Taro.navigateTo({
          url: '/pages/account/follow?type=followers'
        })
      }
        break
      case NAVIGATE_TYPE.FOLLOWING: {
        Taro.navigateTo({
          url: '/pages/account/follow?type=following'
        })
      }
        break
      case NAVIGATE_TYPE.STARRED_REPOS: {
        Taro.navigateTo({
          url: '/pages/repo/starredRepo'
        })
      }
        break
      case NAVIGATE_TYPE.ISSUES: {
        Taro.navigateTo({
          url: '/pages/repo/issues?url=/user/issues'
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
      default: {
      }
    }
  }

  render () {
    const user = Taro.getStorageSync('user_info');
    const { isLogin } = this.state
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
                <View className='list_title'>Starred Repos</View>
                <AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f'/>
              </View>
              <View className='list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.ISSUES)}>
                <View className='list_title'>Issues</View>
                <AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f'/>
              </View>
            </View>
            <View className='list_view'>
              <View className='list'>
                <View className='list_title'>Email</View>
                <View className='list_content'>{user.email.length > 0 ? user.email : '--'}</View>
              </View>
              <View className='list'>
                <View className='list_title'>Blog</View>
                <View className='list_content'>{user.blog.length > 0 ? user.blog : '--'}</View>
              </View>
              <View className='list'>
                <View className='list_title'>Company</View>
                <View className='list_content'>{user.company.length > 0 ? user.company : '--'}</View>
              </View>
              <View className='list'>
                <View className='list_title'>Location</View>
                <View className='list_content'>{user.location.length > 0 ? user.location : '--'}</View>
              </View>
            </View>
            <View className='list_view'>
              <Button className='list btn' openType="contact">
                <View className='list_title'>客服反馈</View>
                <AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f'/>
              </Button>
              <View className='list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.ABOUT)}>
                <View className='list_title'>关于</View>
                <AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f'/>
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

