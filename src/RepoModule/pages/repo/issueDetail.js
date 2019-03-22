import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import { AtIcon } from 'taro-ui'
import {connect} from "@tarojs/redux";
import IssueCommentItem from '../../components/repo/issueCommentItem'
import Markdown from '../../components/repo/markdown'
import LoadMore from '../../../components/loadMore/loadMore'


import './issueDetail.scss'

@connect(({ repo }) => ({
  ...repo,
}))
class IssueDetail extends Component {

  config = {
    navigationBarTitleText: 'Issue 评论',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      number: '',
      issue: null,
      page: 1,
      comments: [],
      refresh_status: REFRESH_STATUS.NORMAL
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    this.setState({
      url: params.url,
      number: params.number
    })
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
    this.getIssue()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    let that = this;
    this.setState({
      page: 1
    }, ()=>{
      that.getIssue()
    })
  }

  onReachBottom() {
    const { page, refresh_status } = this.state;
    if (refresh_status !== REFRESH_STATUS.NO_MORE_DATA) {
      let that = this;
      this.setState({
        page: page + 1
      }, ()=>{
        that.getComments()
      })
    }
  }

  getComments() {
    let that = this
    const { url, page, comments, number } = this.state;

    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }
    let params = {
      page: page,
      per_page: PER_PAGE,
      url: url,
      number: number,
    };
    this.props.dispatch({
      type: 'repo/getIssuesComments',
      payload: params,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        if (page === 1) {
          that.setState({
            comments: res
          })
        } else {
          that.setState({
            comments: comments.concat(res)
          })
        }
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          refresh_status: status,
        })
      }
    })
  }

  getIssue() {
    const { url, number } = this.state;
    let that = this;
    this.props.dispatch({
      type: 'repo/getIssues',
      payload: {
        url: url,
        number: number
      },
      callback: (res) => {
        that.setState({
          issue: res,
        },() => {
          this.getComments();
        })
      }
    })

  }

  addComment() {
    const { url, number } = this.state
    Taro.navigateTo({
      url: '/RepoModule/pages/repo/addComment?url=' + url + '&number=' + number
    })
  }

  render () {
    const { issue, comments, refresh_status } = this.state
    if (!issue) return <View />
    return (
      <View className='content'>
        <View className='title_view'>
          <Text className='title'>{'#' + issue.number + ' ' + issue.title}</Text>
          {
            issue.body.length > 0 ? (
              <View className='markdown'>
                <View className='md'>
                  <Markdown md={issue.body} />
                </View>
              </View>
            ) : (
              <Text className='description'>
                暂无描述~
              </Text>
            )
          }
        </View>
        {
          comments.map((item, index) => {
            return (
              <IssueCommentItem item={item} key={index} />
            )
          })
        }
        <LoadMore status={refresh_status} />
        <View className='add_chat' onClick={this.addComment.bind(this)}>
          <AtIcon value='add'
                  size='26'
                  color='#fff' style={{marginBottom:'2Px'}} />
        </View>
      </View>
    )
  }
}

export default IssueDetail
