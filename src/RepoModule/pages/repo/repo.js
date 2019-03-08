import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Navigator, Ad,Image } from '@tarojs/components'
import { AtIcon, AtFloatLayout  } from 'taro-ui'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import Empty from '../../../components/empty/index'
import { base64_decode } from '../../../utils/base64'
import { NAVIGATE_TYPE } from '../../../constants/navigateType'
import {hasLogin} from "../../../utils/common";
import {connect} from "@tarojs/redux";
import Markdown from '../../components/repo/markdown'
import Painter from '../../components/repo/painter'
import line from '../../asset/images/share/share_line.png';
import quan from '../../asset/images/share/share_pengyouquan.png'
import wechat from '../../asset/images/share/share_wechat.png'

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
      md: null,
      isOpened: false,
      posterData: null
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  componentWillMount() {
    let params = this.$router.params
    console.log(decodeURI(params.url))
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
    let path = '/RepoModule/pages/repo/repo?url=' + encodeURI(url) + '&share=true'
    return {
      title: `「${repo.name}」★${repo.stargazers_count} - 来自 Gitee 的开源项目，快来看看吧~~`,
      path: path
    }
    this.setState({
      isOpened: false
    })
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
        if(res){
          that.setState({
            readme: res,
            baseUrl: res.download_url
          },() =>{
            that.parseReadme();
          });
        }
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
          url: '/RepoModule/pages/repo/contentList?repo=' + repo.full_name+'&branch='+repo.default_branch,
        })
      }
        break
      case NAVIGATE_TYPE.ISSUES: {
        let url = '/RepoModule/pages/repo/issues?url=' + repo.full_name +'&path=' + repo.namespace.path + '&repoPath=' + repo.path
        Taro.navigateTo({
          url: url
        })
      }
        break
      case NAVIGATE_TYPE.REPO_CONTRIBUTORS_LIST: {
        let url = '/RepoModule/pages/repo/contributors?url=' + repo.full_name;
        Taro.navigateTo({
          url: url
        })
      }
        break
      case NAVIGATE_TYPE.REPO_EVENTS_LIST: {
        let url = '/RepoModule/pages/repo/repoEvents?url='+repo.full_name
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

  handleShareClick = (e) =>{
    this.setState({
      isOpened: true
    })
  };

  handleCloseClick = (e) =>{
    this.setState({
      isOpened: false
    })
  };

  onClickedActionButton(index) {
    console.log(index)
    const { repo } = this.state
    switch(index) {
      case 0:
        setTimeout(() => {
          this.setState({
              isOpened: false,
            })
        }, 1000);
        break;
      case 1:
        this.loadWXACode()
        break;
      case 2:
        const url = `https://gitee.com/${repo.full_name}`
        Taro.setClipboardData({
          data: url
        })
        break;
      default:
    }
  }

  loadWXACode = () =>{
    const { repo, url } = this.state;
    let path = '/RepoModule/pages/repo/repo?url=' + encodeURI(url) + '&share=true';
    let that = this;
    Taro.showLoading({title: LOADING_TEXT})
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'painter',
      // 传递给云函数的event参数
      data: {
        path: path,
        name: `${repo.owner.login}_${repo.name}`
      }
    }).then(res => {
      console.log('painter', res)
      if (res.result && res.result.length > 0) {
        that.generatePoster(res.result[0].tempFileURL)
      } else {
        Taro.hideLoading()
      }
    }).catch(err => {
      Taro.hideLoading()
    })
  }

  generatePoster(imgUrl) {
    const { repo } = this.state
    const data = {
      background: '#f7f7f7',
      width: '750rpx',
      height: '1100rpx',
      borderRadius: '0rpx',
      views: [
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            top: '50rpx',
            color: '#ffffff',
            height: '900rpx',
            borderRadius: '20rpx',
            shadow: '10rpx 10rpx 5rpx #888888',
          }
        },
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            height: '640rpx',
            top: '50rpx',
            color: '#D64337',
            borderRadius: '20rpx',
          }
        },
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            height: '50rpx',
            top: '640rpx',
            color: '#D64337',
          }
        },
        {
          type: 'text',
          text: `「${repo.name}」`,
          css: {
            top: '80rpx',
            left: '375rpx',
            align: 'center',
            fontSize: '38rpx',
            color: '#ffffff',
            width: '550rpx',
            maxLines: '1',
          }
        },
        {
          type: 'text',
          text: `Stars：★${repo.stargazers_count}  ${repo.stargazers_count > 99 ? '🔥' : ''}`,
          css: {
            top: '150rpx',
            left: '80rpx',
            width: '550rpx',
            maxLines: '1',
            fontSize: '28rpx',
            color: '#ffffff'
          }
        },
        {
          type: 'text',
          text: `作者：${repo.owner.name}`,
          css: {
            top: '250rpx',
            left: '80rpx',
            width: '550rpx',
            maxLines: '1',
            fontSize: '28rpx',
            color: '#ffffff'
          }
        },
        {
          type: 'text',
          text: `Gitee：https://gitee.com/${repo.full_name}`,
          css: {
            top: '350rpx',
            left: '80rpx',
            width: '550rpx',
            fontSize: '28rpx',
            color: '#ffffff',
            lineHeight: '36rpx',
            maxLines: '2',
          }
        },
        {
          type: 'text',
          text: `项目描述：${repo.description || '暂无描述'}`,
          css: {
            top: '450rpx',
            left: '80rpx',
            width: '550rpx',
            fontSize: '28rpx',
            maxLines: '4',
            color: '#ffffff',
            lineHeight: '36rpx'
          }
        },
        {
          type: 'image',
          url: `${imgUrl}`,
          css: {
            bottom: '180rpx',
            left: '120rpx',
            width: '200rpx',
            height: '200rpx',
          },
        },
        {
          type: 'text',
          text: '长按识别，查看项目详情',
          css: {
            bottom: '290rpx',
            left: '350rpx',
            fontSize: '28rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: '分享自「Gitter」',
          css: {
            bottom: '230rpx',
            left: '350rpx',
            fontSize: '28rpx',
            color: '#666666',
          }
        },
        {
          type: 'text',
          text: '开源的世界，有你才更精彩',
          css: {
            bottom: '60rpx',
            left: '375rpx',
            align: 'center',
            fontSize: '28rpx',
            color: '#666666',
          }
        }
      ],
    }
    this.setState({
      posterData: data
    })
  }

  onPainterFinished() {
    console.log('onPainterFinished');
    this.setState({
      posterData: null,
      isOpened: false
    })
  }

  loadError(event) {
    this.setState({
      loadAd: false
    })
  }

  render () {
    const { repo, isShare, md, baseUrl, loadAd, isStar, isWatch, isOpened, posterData} = this.state;
    if (!repo) return <View />
    return (
      <View className='content'>
        <View className='repo_bg_view'>
          <Text className='repo_info_title'>{repo.name}</Text>
          {
            repo.fork &&
            <View className='fork'>
              <AtIcon value='shuffle-play' size='15' color='#fff' />
              <Navigator url={'/RepoModule/pages/repo/repo?url=' + encodeURI(repo.parent.full_name)}>
                <Text className='fork_title'>
                  {repo.parent.human_name}
                </Text>
              </Navigator>
            </View>
          }
          <Text className='repo_info_desc'>{repo.description || '暂无描述~'}</Text>
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
          <Button className='share_button' onClick={this.handleShareClick.bind(this)}>分享</Button>
        </View>
        <View className='repo_info_list_view'>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.USER)}>
            <View className='list_title'>作者</View>
            <View className='list_content'>
              <Text className='list_content_title'>{repo.owner.name}</Text>
              <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
            </View>
          </View>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.REPO_CONTENT_LIST)}>
            <View className='list_title'>查看代码</View>
            <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
          </View>
          <View className='repo_info_list'>
            <View className='list_title'>默认分支</View>
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
            <View className='list_title'>动态</View>
            <AtIcon value='chevron-right' size='18' color='#7f7f7f' />
          </View>
          <View className='repo_info_list' onClick={this.handleNavigate.bind(this, NAVIGATE_TYPE.REPO_CONTRIBUTORS_LIST)}>
            <View className='list_title'>贡献者</View>
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
            <Text className='support'>Support Giteer ❤</Text>
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
        {
          posterData && <Painter style='position:fixed;top:-9999rpx' data={posterData} save onPainterFinished={this.onPainterFinished}/>
        }
        <AtFloatLayout isOpened={isOpened} title="分享" onClose={this.handleCloseClick.bind(this)}>
          <View className='share_item_view'>
            <View className='repo_share_item' onClick={this.onClickedActionButton.bind(this,0)}>
              <Button className='action_button'
                      openType='share'>
                <Image className='btn-img' src={wechat}/>
                <Text className='action_button_title'>发给朋友</Text>
              </Button>
            </View>
            <View className='repo_share_item'>
              <Button className='action_button'
                      onClick={this.onClickedActionButton.bind(this, 1)}>
                <Image className='btn-img' src={quan}/>
                <Text className='action_button_title'>分享到朋友圈</Text>
              </Button>
            </View>
            <View className='repo_share_item'>
              <Button className='action_button'
                      onClick={this.onClickedActionButton.bind(this, 2)}>
                <Image className='btn-img' src={line}/>
                <Text className='action_button_title'>复制链接</Text>
              </Button>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default Repo
