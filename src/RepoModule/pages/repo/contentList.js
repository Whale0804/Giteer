import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import ContentListItem from '../../../components/repo/contentListItem'
import ContentListNextItem from '../../../components/repo/contentListNextItem'
import {connect} from "@tarojs/redux";

import './contentList.scss'


@connect(({ repo }) => ({
  ...repo,
}))
class ContentList extends Component {

  config = {
    navigationBarTitleText: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      repo: null,
      path: null,
      branch: null,
      dataList: [],
      isDir: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    let path = params.path || null;
    this.setState({
      repo: params.repo,
      path: path,
      branch: params.branch,
      isDir: params.isDir
    })
  }

  componentDidMount() {
    const { repo, path } = this.state
    Taro.setNavigationBarTitle({
      title: path || repo.split('/')[1]
    })
    this.getContents()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getContents() {
    let that = this
    const { repo, branch, isDir, path} = this.state
    Taro.showLoading({title: LOADING_TEXT});
    let parmas;
    if (isDir){
      parmas = {
        url: repo,
        path: path,
        isDir: isDir
      }
    }else{
      parmas = {
        url: repo,
        sha: branch,
        isDir: false
      }
    }
    this.props.dispatch({
      type: 'repo/getContent',
      payload: parmas,
      callback: (res) => {
        if(res.tree){
          that.setState({
            dataList: res.tree
          },() =>{
            Taro.hideLoading();
          });
        }else{
          that.setState({
            dataList: res
          },() =>{
            Taro.hideLoading();
          });
        }
      }
    })
  }

  handleItemClick(item) {
    const { isDir } = this.state;
    if(isDir){
      if (item.type === 'dir') {
        // 文件夹
        Taro.redirectTo({
          url: '/RepoModule/pages/repo/contentList?repo=' + this.state.repo + '&path=' + item.path + '&isDir='+true
        })
      } else if (item.type === 'file') {
        // 文件
        Taro.navigateTo({
          url: '/RepoModule/pages/repo/file?url=' + item.url + '&isDir=' + isDir
        })
      }
    }else{
      if (item.type === 'tree') {
        // 文件夹
        Taro.navigateTo({
          url: '/RepoModule/pages/repo/contentList?repo=' + this.state.repo + '&path=' + item.path + '&isDir='+true
        })
      } else if (item.type === 'blob') {
        // 文件
        Taro.navigateTo({
          url: '/RepoModule/pages/repo/file?repo='+ this.state.repo + '&sha='+item.sha
        })
      }
    }
  }

  render () {
    const { dataList, isDir } = this.state;
    return (
      <View className='content'>
        {
          dataList.map((item, index) => {
            return (
              <View key={index} onClick={this.handleItemClick.bind(this, item)}>
                {
                  isDir ? <ContentListNextItem item={item}/>:<ContentListItem item={item} />
                }
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default ContentList
