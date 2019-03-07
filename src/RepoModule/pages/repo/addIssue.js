import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import { AtInput, AtTextarea } from 'taro-ui'
import {connect} from "@tarojs/redux";

import './addIssue.scss'


@connect(({ repo }) => ({
  ...repo,
}))
class AddIssue extends Component {

  config = {
    navigationBarTitleText: '创建 Issue'
  }

  constructor(props) {
    super(props)
    this.state = {
      path: '',
      repoPath: '',
      title: '',
      comment: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    this.setState({
      path: params.path,
      repoPath: params.repoPath
    })
  }

  componentDidMount() {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (value) {
    this.setState({
      title: value
    })
  }

  handleTextareaChange (event) {
    this.setState({
      comment: event.target.value
    })
  }

  handleSubmit () {
    const { title, comment, path, repoPath } = this.state;
    if (title.length === 0) {
      Taro.showToast({
        title: '请输入标题',
        icon: 'none'
      })
    } else {
      Taro.showLoading({title: LOADING_TEXT});
      let source = '\n\n\n\n\n\n**来自Gitee小程序客户端：**\n\n![image](https://githink.cn/gitee/gitee.jpg)';
      let body = '';
      if (comment.length > 0) {
        body = comment + source
      } else {
        body = source
      }
      let params = {
        owner: path,
        repo: repoPath,
        title: title,
        body: body
      };
      this.props.dispatch({
        type: 'repo/addIssue',
        payload: params,
        callback: (res) => {
          Taro.navigateBack();
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    }
  }

  render () {
    return (
      <View className='content'>
        <View className='issue_title'>
          <AtInput
            className='input_title'
            name='title'
            title=''
            type='text'
            placeholder='标题'
            value={this.state.title}
            border={false}
            onChange={this.handleChange.bind(this)}
          />
        </View>
        <View className='issue_comment'>
          <AtTextarea
            className='input_comment'
            height={200}
            count={false}
            maxlength={10000}
            value={this.state.comment}
            onChange={this.handleTextareaChange.bind(this)}
            placeholder='请输入内容...'
          />
        </View>
        <View className='submit' onClick={this.handleSubmit.bind(this)}>
          提交
        </View>
      </View>
    )
  }
}

export default AddIssue
