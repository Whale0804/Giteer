import Taro, { Component } from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import { base64_decode } from '../../../utils/base64'
import Markdown from '../../components/repo/markdown'
import {connect} from "@tarojs/redux";

import './file.scss'

@connect(({ repo }) => ({
  ...repo,
}))
class File extends Component {

  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      url: null,
      repo: null,
      sha: null,
      isDir: false
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    let repo = params.repo || null;
    let sha = params.sha || null;
    let isDir = params.isDir || false;
    this.setState({
      url: params.url,
      repo: repo,
      sha: sha,
      isDir: isDir
    })
  }

  componentDidMount() {
    this.getFile()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getFile() {
    let that = this;
    const { url, isDir, repo, sha } = this.state;
    Taro.startPullDownRefresh();
    if(isDir){
      this.props.dispatch({
        type: 'repo/getFile',
        payload: {url:url},
        callback: (res) => {
          Taro.stopPullDownRefresh();
          console.log(res);
          that.setState({
            file: res
          })
          Taro.setNavigationBarTitle({
            title: res.name
          })
        }
      })
    } else {
      this.props.dispatch({
        type: 'repo/getFile2',
        payload: {url:repo, sha: sha},
        callback: (res) => {
          Taro.stopPullDownRefresh();
          console.log(res);
          that.setState({
            file: res
          })
        }
      })
    }
  }

  render () {
    const { file } = this.state
    if (!file) return <View />
    let md = ''
    if (file.content.length > 0) {
      md = base64_decode(file.content)
    }
    return (
      <View className='content'>
        {
          md.length > 0 &&
          <View className='markdown'>
            <View className='md'>
              <Markdown md={md} />
            </View>
          </View>
        }
      </View>
    )
  }
}

export default File
