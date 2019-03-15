import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import {connect} from "@tarojs/redux";
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import { hasLogin } from '../../../utils/common'
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
      url: null,
      path: null,
      repoPath: null,
      isUser: false,
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
    let params = this.$router.params
    this.setState({
      url: params.url,
      isUser: params.url.indexOf('user') !== -1,
      path: params.path,
      repoPath: params.repoPath
    })
  }

  componentDidMount() {
    Taro.showLoading({title: LOADING_TEXT})
    this.getOpenIssuesList()
    this.getClosedIssuesList()
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
      state: 'open',
      sort: 'updated',
      direction:'desc'
    }

    this.props.dispatch({
      type: 'repo/getRepoIssues',
      payload: params,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
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
      state: 'closed',
      sort: 'updated',
      direction:'desc'
    }

    this.props.dispatch({
      type: 'repo/getRepoIssues',
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

  addIssue() {
    if(hasLogin()){
      Taro.navigateTo({
        url: '/RepoModule/pages/repo/addIssue?path=' + this.state.path + '&repoPath=' + this.state.repoPath
      })
    }else{
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }

  }

  onTabChange(index) {
    this.setState({
      current: index
    })
  }

  render () {
    const { openList, closedList, isUser, fixed, current, open_status, close_status } = this.state
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
        {
          !isUser &&
          <View className='add_issue' onClick={this.addIssue.bind(this)}>
            <AtIcon value='add'
                    size='26'
                    color='#fff' />
          </View>
        }
      </View>
    )
  }
}

export default Issues
