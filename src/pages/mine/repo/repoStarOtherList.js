import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import LoadMore from "../../../components/loadMore/loadMore";
import RepoItem from '../../../components/mine/repoItem'

import './repoList.scss'

@connect(({ repo }) => ({
  ...repo,
}))
class RepoList extends Component{

  config = {
    navigationBarTitleText: '仓库',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      username: '',
      refresh_status: REFRESH_STATUS.NORMAL,
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  componentWillMount() {
    let params = this.$router.params;
    this.setState({
      username: params.username
    })
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
    Taro.showLoading({title: LOADING_TEXT});
    this.getRepoList()
  }

  onPullDownRefresh() {
    let that = this;
    this.setState({
      page: 1
    }, ()=>{
      that.getRepoList()
    })
  }

  onReachBottom() {
    let that = this;
    Taro.showLoading({title: LOADING_TEXT});
    const { page } = this.state;
    this.setState({
      page: page + 1
    }, ()=>{
      that.getRepoList()
    })
  }

  getRepoList() {
    let that = this;
    const { page, username } = this.state;
    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }

    this.props.dispatch({
      type: 'repo/getStarOtherRepoList',
      payload:{
        page: page,
        per_page: PER_PAGE,
        username: username,
        sort:'last_push',
        direction:'desc'
      },
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
    let url = '/pages/repo/repo?url=' + decodeURI(item.full_name)
    Taro.navigateTo({
      url: url
    })
  }

  render () {
    const {repo_list} = this.props;
    const {refresh_status} = this.state;
    const repoList = repo_list.map((item, index) => {
      return (
        <View onClick={this.handleClickedItem.bind(this, item)} key={index}>
          <RepoItem item={item} />
        </View>
      )
    });
    return (
      <View className='content'>
        {repoList}
        <LoadMore status={refresh_status} />
      </View>
    )
  }
}
