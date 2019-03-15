import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";

import IssueList from '../../components/repo/issueList'
import Segment from '../../../components/index/segment'
import Empty from '../../../components/empty/index'
import LoadMore from '../../../components/loadMore/loadMore'


import './issues.scss'


@connect(({ repo }) => ({
  ...repo,
}))
class Issues extends Component {

  config = {
    navigationBarTitleText: 'Issues',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      fixed: false,
      openList: [],
      closedList: [],
      open_page: 1,
      close_page: 1,
      open_status: REFRESH_STATUS.NORMAL,
      close_status: REFRESH_STATUS.NORMAL,
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {

  }

  componentDidMount() {
    Taro.startPullDownRefresh();
    this.getOpenIssuesList();
    this.getClosedIssuesList();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPageScroll(obj) {
    const { fixed } = this.state
    if (obj.scrollTop > 0) {
      if (!fixed) {
        this.setState({
          fixed: true
        })
      }
    } else {
      this.setState({
        fixed: false
      })
    }
  }

  onPullDownRefresh() {
    let that = this
    const { current } = this.state
    if (current === 0) {
      this.setState({
        open_page: 1
      }, ()=>{
        that.getOpenIssuesList()
      })
    } else {
      this.setState({
        close_page: 1
      }, ()=>{
        that.getClosedIssuesList()
      })
    }
  }

  onReachBottom() {
    let that = this
    const { current, open_page, close_page, open_status, close_status } = this.state
    if (current === 0) {
      if (open_status !== REFRESH_STATUS.NO_MORE_DATA) {
        this.setState({
          open_page: open_page + 1
        }, ()=>{
          that.getOpenIssuesList()
        })
      }
    } else {
      if (close_status !== REFRESH_STATUS.NO_MORE_DATA) {
        this.setState({
          close_page: close_page + 1
        }, ()=>{
          that.getClosedIssuesList()
        })
      }
    }
  }

  getOpenIssuesList() {
    let that = this
    const { url, openList, open_page } = this.state
    if (open_page !== 1) {
      that.setState({
        open_status: REFRESH_STATUS.REFRESHING
      })
    }
    let params = {
      url: url,
      page: open_page,
      per_page: PER_PAGE,
      filter: 'all',
      state: 'open',
      sort: 'updated',
      direction:'desc'
    }

    this.props.dispatch({
      type: 'repo/getUserIssues',
      payload: params,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        if (open_page === 1) {
          that.setState({
            openList: res
          })
        } else {
          that.setState({
            openList: openList.concat(res)
          })
        }
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          open_status: status,
        })
      }
    })

  }

  getClosedIssuesList() {
    let that = this
    const { url, closedList, close_page } = this.state
    if (close_page !== 1) {
      that.setState({
        close_status: REFRESH_STATUS.REFRESHING
      })
    }
    let params = {
      url: url,
      page: close_page,
      per_page: PER_PAGE,
      filter: 'all',
      state: 'closed',
      sort: 'updated',
      direction:'desc'
    }

    this.props.dispatch({
      type: 'repo/getUserIssues',
      payload: params,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        if (close_page === 1) {
          that.setState({
            closedList: res
          })
        } else {
          that.setState({
            closedList: closedList.concat(res)
          })
        }
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          close_status: status,
        })
      }
    })
  }

  onTabChange(index) {
    this.setState({
      current: index
    })
  }

  render () {
    const { openList, closedList, fixed, current, open_status, close_status } = this.state
    const count = current === 0 ? openList.length : closedList.length
    return (
      <View className='content'>
        <View className={fixed ? 'segment-fixed' : ''}>
          <Segment tabList={['OPEN', 'CLOSED']}
                   current={current}
                   showAction={false}
                   onTabChange={this.onTabChange}
          />
        </View>
        {
          fixed &&
          <View className='segment-placeholder' />
        }
        {count === 0 ?
          <Empty /> : (
            current === 0 ? <IssueList itemList={openList} /> : <IssueList itemList={closedList} />
        )}
        <LoadMore status={current === 0 ? open_status : close_status} />
      </View>
    )
  }
}

export default Issues
