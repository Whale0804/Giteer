import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {LOADING_TEXT} from "../../../constants/common";
import { AtTextarea } from 'taro-ui'
import {connect} from "@tarojs/redux";


import './addComment.scss'

@connect(({ repo }) => ({
  ...repo,
}))
class AddComment extends Component {

  config = {
    navigationBarTitleText: '评论'
  }

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      number: null,
      comment: null
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    console.log(params)
    this.setState({
      url: params.url,
      number: params.number
    })
  }

  componentDidMount() {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleTextareaChange (event) {
    this.setState({
      comment: event.target.value
    })
  }

  handleSubmit () {
    const { comment, url, number } = this.state;
    if (comment.length === 0) {
      Taro.showToast({
        title: '请输入评论内容...',
        icon: 'none'
      })
    } else {
      Taro.showLoading({title: LOADING_TEXT});
      let source = '\n\n\n\n\n\n**来自Gitee小程序客户端：**\n\n![image](https://githink.cn/gitee/gitee.jpg)'
      let body =  comment + source;
      let params = {
        url: url,
        body: body,
        number: number
      };
      this.props.dispatch({
        type: 'repo/addIssueComments',
        payload: params,
        callback: (res) => {
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
          Taro.navigateBack()
        }
      })
    }
  }

  render () {
    return (
      <View className='content'>
        <View className='issue_comment'>
          <AtTextarea
            className='input_comment'
            height={200}
            count={false}
            maxlength={10000}
            value={this.state.comment}
            onChange={this.handleTextareaChange.bind(this)}
            placeholder='请输入评论内容...'
          />
        </View>
        <View className='submit' onClick={this.handleSubmit.bind(this)}>
          提交
        </View>
      </View>

    )
  }
}

export default AddComment
