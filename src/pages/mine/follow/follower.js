import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import LoadMore from "../../../components/loadMore/loadMore";
import FollowItem from '../../../components/mine/followItem'

import './follower.scss'

@connect(({ follow }) => ({
  ...follow,
}))
export default class Follower extends Component {

  config = {
    enablePullDownRefresh: true
  };

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      page: 1,
      refresh_status: REFRESH_STATUS.NORMAL,
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    let type = params.type;
    let username = params.username;
    let url = '';
    let title = '';
    if (type === 'followers') {
      // Followers
      url = '/user/followers';
      if (username) {
        url = '/users/' + username + '/followers'
      }
      title = '关注我的';
    } else if (type === 'following') {
      // Following
      url = '/user/following';
      if (username) {
        url = '/users/' + username + '/following'
      }
      title = '我关注的';
    }

    Taro.setNavigationBarTitle({
      title: title
    });

    this.setState({
      url: url
    })
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
    Taro.showLoading({title: LOADING_TEXT});
    this.getFollow()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  onPullDownRefresh() {
    let that = this;
    this.setState({
      page: 1
    }, ()=>{
      that.getFollow()
    })
  }

  onReachBottom() {
    let that = this;
    Taro.showLoading({title: LOADING_TEXT});
    const { page } = this.state;
    this.setState({
      page: page + 1
    }, ()=>{
      that.getFollow()
    })
  }

  getFollow() {
    let that = this;
    const { url, page } = this.state;
    let params = this.$router.params;
    let username = params.username;
    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }
    let parmas;
    if(username){
      parmas = {
        url: url,
        page: page,
        per_page: PER_PAGE,
        username: username
      }
    }else {
      parmas = {
        url: url,
        page: page,
        per_page: PER_PAGE
      }
    }

    this.props.dispatch({
      type: 'follow/getFollowList',
      payload:{...parmas},
      callback: res => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          refresh_status: status
        });
      }
    });
  }

  handleClickedItem(item) {
    Taro.navigateTo({
      url: '/pages/mine/developerInfo/developerInfo?username=' + item.name
    })
  }

  render () {
    const {follow_list} = this.props;
    const {refresh_status} = this.state;
    const followList = follow_list.map((item, index) => {
      return (
        <View onClick={this.handleClickedItem.bind(this, item)} key={index}>
          <FollowItem item={item} />
        </View>
      )
    });
    return (
      <View className='content'>
        {followList}
        <LoadMore status={refresh_status} />
      </View>
    )
  }
}
