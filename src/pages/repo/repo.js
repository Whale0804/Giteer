import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Navigator, Ad } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../constants/common";
import Empty from '../../components/empty'
import { base64_decode } from '../../utils/base64'
import { NAVIGATE_TYPE } from '../../constants/navigateType'
import {hasLogin} from "../../utils/common";
import {connect} from "@tarojs/redux";
import Towxml from '../../components/towxml/main'
import Markdown from '../../components/repo/markdown'
const render = new Towxml()

import './repo.scss'


@connect(({ repo }) => ({
  ...repo,
}))
class Repo extends Component {

  config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#D64337',
    navigationBarTextStyle: 'white'
  }

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      repo: null,
      readme: null,
      hasWatching: false,
      isWatch:false,
      isStar:false,
      isFork:false,
      isShare: false,
      loadAd: true,
      baseUrl: null,
      md: null
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  componentWillMount() {
    let params = this.$router.params
    this.setState({
      url: decodeURI(params.url),
      isShare: params.share
    })
  }

  componentDidMount() {
    Taro.showLoading({title: LOADING_TEXT})
    this.getRepo()
  }

  onPullDownRefresh() {
    this.getRepo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPageScroll(e) {
    let title = ''
    const { repo } = this.state
    if (e.scrollTop > 0) {
      title = repo.name
    }
    Taro.setNavigationBarTitle({
      title: title
    })
  }

  onShareAppMessage(obj) {
    const { repo } = this.state
    const { url } = this.state
    let path = '/pages/repo/repo?url=' + encodeURI(url) + '&share=true'
    return {
      title: `「${repo.name}」★${repo.stargazers_count} - 来自Gitee的开源项目，快来看看吧~~`,
      path: path
    }
  }

  getRepo() {
    let that = this
    const { url } = this.state
    this.props.dispatch({
      type: 'repo/getRepo',
      payload: { url: url},
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        console.log(res)
        that.setState({
          repo: res
        },() =>{
          that.getReadme();
          that.checkStarring();
          this.checkWatching();
        });
      }
    })
  }

  getReadme() {
    let that = this
    const { url } = this.state;
    this.props.dispatch({
      type: 'repo/getReadme',
      payload: { url: url},
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        console.log(res)
        that.setState({
          readme: res,
          baseUrl: res.download_url
        },() =>{
          that.parseReadme();
        });
      }
    });
  }

  parseReadme() {
    const { readme } = this.state
    this.setState({
      md: base64_decode(readme.content)
    })
  }

  checkStarring() {
    if (hasLogin()) {
      const { repo } = this.state
      this.props.dispatch({
        type: 'repo/checkStar',
        payload:{
          url: repo.full_name
        },
        callback: (res) => {
          console.log(res);
          this.setState({
            isStar: res.isStar
          });
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    }
  }

  handleStar() {
    Taro.showLoading({title: LOADING_TEXT})
    const { isStar, repo } = this.state
    let that = this
    if (isStar) {
      //取消收藏
      this.props.dispatch({
        type: 'repo/delStar',
        payload:{
          url: repo.full_name
        },
        callback: (res) => {
          console.log(res);
          this.setState({
            isStar: false
          });
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    } else {
      this.props.dispatch({
        type: 'repo/doStar',
        payload:{
          url: repo.full_name
        },
        callback: (res) => {
          console.log(res);
          this.setState({
            isStar: true
          });
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    }
  }

  checkWatching() {
    if (hasLogin()) {
      const { repo } = this.state
      let that = this
      this.props.dispatch({
        type: 'repo/checkWatch',
        payload:{
          url: repo.full_name
        },
        callback: (res) => {
          console.log(res);
          this.setState({
            isWatch: res.isWatch
          });
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    }
  }

  handleWatch() {
    Taro.showLoading({title: LOADING_TEXT})
    const { isWatch, repo } = this.state
    let that = this
    if (isWatch) {
      //取消收藏
      this.props.dispatch({
        type: 'repo/delWatch',
        payload:{
          url: repo.full_name
        },
        callback: (res) => {
          console.log(res);
          this.setState({
            isWatch: false
          });
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    } else {
      this.props.dispatch({
        type: 'repo/doWatch',
        payload:{
          url: repo.full_name
        },
        callback: (res) => {
          console.log(res);
          this.setState({
            isWatch: true
          });
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        }
      });
    }
  }

  handleFork() {
    Taro.showLoading({title: LOADING_TEXT})
    const { repo } = this.state
    this.props.dispatch({
      type: 'repo/doFork',
      payload:{
        url: repo.full_name
      },
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        Taro.showToast({
          title: 'fork成功~',
          icon: 'none'
        })
      }
    });
  }

  handleNavigate(type) {
    const { repo } = this.state
    switch (type) {
      case NAVIGATE_TYPE.USER: {
        Taro.navigateTo({
          url: '/pages/mine/developerInfo/developerInfo?username=' + repo.owner.login
        })
      }
        break
      case NAVIGATE_TYPE.REPO_CONTENT_LIST: {
        Taro.navigateTo({
          url: '/pages/repo/contentList?repo=' + repo.full_name+'&branch='+repo.default_branch,
        })
      }
        break
      case NAVIGATE_TYPE.ISSUES: {
        let url = '/pages/repo/issues?url=/repos/' + repo.full_name + '/issues&repo=' + repo.full_name
        Taro.navigateTo({
          url: url
        })
      }
        break
      case NAVIGATE_TYPE.REPO_CONTRIBUTORS_LIST: {
        let url = '/pages/repo/contributors?url=/repos/' + repo.full_name + '/contributors'
        Taro.navigateTo({
          url: url
        })
      }
        break
      case NAVIGATE_TYPE.REPO_EVENTS_LIST: {
        let url = '/pages/repo/repoEvents?url=/repos/' + repo.full_name + '/events'
        Taro.navigateTo({
          url: url
        })
      }
        break
      default: {

      }
    }
  }

  onClickedHome () {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  loadError(event) {
    this.setState({
      loadAd: false
    })
    console.log(event.detail)
  }

  render () {
    const { repo, isShare, md, baseUrl, loadAd, isStar, isWatch} = this.state
    if (!repo) return <View />
    return (
      <View className='content'>
        <View className='repo_bg_view'>
          <Text className='repo_info_title'>{repo.name}</Text>
          {
            repo.fork &&
            <View className='fork'>
              <AtIcon value='shuffle-play' size='15' color='#fff' />
              <Navigator url={'/pages/repo/repo?url=' + encodeURI(repo.parent.full_name)}>
                <Text className='fork_title'>
                  {repo.parent.human_name}
                </Text>
              </Navigator>
            </View>
          }
          <Text className='repo_info_desc'>{repo.description || 'no description'}</Text>
        </View>
        <View className='repo_number_view'>
          <View className='repo_number_item_view'>
            <View className='repo_number_item' onClick={this.handleWatch.bind(this)}>
              <AtIcon value='eye' size='25' color={isWatch ? '#333' : '#ccc'}/>
              <Text className='repo_number_title'>{repo.watchers_count}</Text>
            </View>
            <View className='repo_number_item' onClick={this.handleStar.bind(this)}>
              <AtIcon value='star'
                      size='25'
                      color={isStar ? '#333' : '#ccc'} />
              <Text className='repo_number_title'>{repo.stargazers_count}</Text>
            </View>
            <View className='repo_number_item' onClick={this.handleFork.bind(this)}>
              <AtIcon value='shuffle-play' size='25' color={'#333'} />
              <Text className='repo_number_title'>{repo.forks_count}</Text>
            </View>
          </View>
          <Button className='share_button' openType='share'>Share</Button>
        </View>
        <View className='repo_info_list_view'>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.USER)}>
            <View className='list_title'>Author</View>
            <View className='list_content'>
              <Text className='list_content_title'>{repo.owner.name}</Text>
              <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
            </View>
          </View>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.REPO_CONTENT_LIST)}>
            <View className='list_title'>View Code</View>
            <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
          </View>
          <View className='repo_info_list'>
            <View className='list_title'>Branch</View>
            <View className='list_content'>
              <Text className='list_content_title'>{repo.default_branch}</Text>
              {/*<AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f' />*/}
            </View>
          </View>
          <View className='repo_info_list'>
            <View className='list_title'>License</View>
            <View className='list_content'>
              <Text className='list_content_title'>{repo.license || '--'}</Text>
              {/*<AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f' />*/}
            </View>
          </View>
        </View>
        <View className='repo_info_list_view'>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.ISSUES)}>
            <View className='list_title'>Issues</View>
            <View className='list_content'>
              {
                repo.open_issues_count > 0 &&
                <View className='tag'>{repo.open_issues_count}</View>
              }
              <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
            </View>
          </View>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.REPO_EVENTS_LIST)}>
            <View className='list_title'>Events</View>
            <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
          </View>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.REPO_CONTRIBUTORS_LIST)}>
            <View className='list_title'>Contributors</View>
            <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
          </View>
        </View>
        {
          md &&
          <View className='markdown'>
            <Text className='md_title'>README.md</Text>
            <View className='repo_md'>
              <Markdown md={md} base={baseUrl} />
            </View>
          </View>
        }
        {
          (md && loadAd) &&
          <View className='ad'>
            <Text className='support'>Support Gitter ❤</Text>
            <Ad unitId='adunit-04a1d10f49572d65' onError={this.loadError.bind(this)} />
          </View>
        }
        {
          isShare &&
          <View className='home_view' onClick={this.onClickedHome.bind(this)}>
            <AtIcon value='home'
                    size='30'
                    color='#fff' />
          </View>
        }
      </View>
    )
  }
}

export default Repo
