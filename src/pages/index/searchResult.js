import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../constants/common";
import Empty from '../../components/empty'
import LoadMore from "../../components/loadMore/loadMore"
import Segment from '../../components/index/segment'
import RepoItem from '../../components/mine/repoItem'
import FollowItem from '../../components/mine/followItem'
import './searchResult.scss'
import {connect} from "@tarojs/redux";

@connect(({ search }) => ({
  ...search,
}))
class SearchResult extends Component {

  config = {
    enablePullDownRefresh: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      current: 0,
      fixed: false,
      repos: [],
      users: [],
      repo_sort: '最佳匹配',
      user_sort: '最佳匹配',
      repo_sort_value: '',
      user_sort_value: '',
      repo_page: 1,
      user_page: 1,
      repo_status: REFRESH_STATUS.NORMAL,
      user_status: REFRESH_STATUS.NORMAL
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params
    this.setState({
      value: decodeURI(params.value),
    })
    Taro.setNavigationBarTitle({
      title: params.value
    })
  }

  componentDidMount() {
    let that = this
    this.setState({
      user_page: 1,
      repo_page: 1
    }, () => {
      Taro.showLoading({title: LOADING_TEXT});
      that.searchRepo();
      that.searchUsers();
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onPullDownRefresh() {
    this.refresh()
  }

  refresh() {
    let that = this;
    const { current } = this.state;
    if (current === 0) {
      this.setState({
        repo_page: 1
      }, () => {
        that.searchRepo()
      })
    } else {
      this.setState({
        user_page: 1
      }, () => {
        that.searchUsers()
      })
    }
  }

  onReachBottom() {
    let that = this;
    const { repo_page, user_page, current, repo_status, user_status } = this.state;
    if (current === 0) {
      if (repo_status !== REFRESH_STATUS.NO_MORE_DATA) {
        this.setState({
          repo_page: repo_page + 1
        }, () => {
          that.searchRepo()
        })
      }
    } else {
      if (user_status !== REFRESH_STATUS.NO_MORE_DATA) {
        this.setState({
          user_page: user_page + 1
        }, () => {
          that.searchUsers()
        })
      }
    }
  }

  searchRepo() {
    let that = this;
    const {repo_page, repos, value, repo_sort_value} = this.state;

    if (repo_page !== 1) {
      that.setState({
        repo_status: REFRESH_STATUS.REFRESHING
      })
    }
    let parmas;
    if(repo_sort_value == ''){
      parmas = {
        q: value,
        page: repo_page,
        per_page:PER_PAGE
      }
    }else{
      parmas = {
        q: value,
        page: repo_page,
        per_page:PER_PAGE,
        sort: repo_sort_value
      }
    }
    this.props.dispatch({
      type: 'search/getSearchReposList',
      payload: parmas,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        if (repo_page === 1) {
          that.setState({
            repos: res
          })
        } else {
          that.setState({
            repos: repos.concat(res)
          })
        }
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          repo_status: status,
        })
      }
    })
  }

  searchUsers() {
    let that = this;
    const {user_page, value, users, user_sort_value } = this.state;
    if (user_page !== 1) {
      that.setState({
        user_status: REFRESH_STATUS.REFRESHING
      })
    }

    let parmas;
    if(user_sort_value == ''){
      parmas = {
        q: value,
        page: user_page,
        per_page:PER_PAGE
      }
    }else{
      parmas = {
        q: value,
        page: user_page,
        per_page:PER_PAGE,
        sort: user_sort_value
      }
    }

    this.props.dispatch({
      type: 'search/getSearchUserList',
      payload: parmas,
      callback: (res) => {
        Taro.stopPullDownRefresh();
        Taro.hideLoading();
        if (user_page === 1) {
          that.setState({
            users: res
          })
        } else {
          that.setState({
            users: users.concat(res)
          })
        }
        let status = res.length < PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL;
        that.setState({
          user_status: status
        })
      }
    })
  }

  handleClickedRepoItem(item) {
    let url = '/pages/repo/repo?url=' + encodeURI(item.full_name)
    Taro.navigateTo({
      url: url
    })
  }

  handleClickedUserItem(item) {
    Taro.navigateTo({
      url: '/pages/mine/developerInfo/developerInfo?username=' + item.login
    })
  }

  onPageScroll(obj) {
    const {fixed} = this.state;
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

  onTabChange(index) {
    this.setState({
      current: index
    })
  }

  onClickedFilter() {
    const {current} = this.state;
    let itemList = null;
    if (current === 0) {
      itemList = ['最佳匹配', '创建时间', '更新时间', '最多收藏', '最多Fork','最多关注']
    } else {
      itemList = ['最佳匹配','注册时间']
    }

    let that = this;
    Taro.showActionSheet({
      itemList,
      success(res) {
        let value = null;
        if (current === 0) {
          if (res.tapIndex === 0) {
            value = ''
          } else if (res.tapIndex === 1) {
            value = 'created_at'
          } else if (res.tapIndex === 2) {
            value = 'last_push_at'
          } else if (res.tapIndex === 3) {
            value = 'stars_count'
          } else if (res.tapIndex === 4) {
            value = 'forks_count'
          } else if (res.tapIndex === 5) {
            value = 'watches_count'
          }
          that.setState({
            repo_sort: itemList[res.tapIndex],
            repo_sort_value: value
          }, ()=>{
            Taro.showLoading({title: LOADING_TEXT})
            that.refresh()
          })
        } else {
          if (res.tapIndex === 0) {
            value = ''
          } else if (res.tapIndex === 1) {
            value = 'joined_at'
          }
          that.setState({
            user_sort: itemList[res.tapIndex],
            user_sort_value: value
          }, ()=>{
            Taro.showLoading({title: LOADING_TEXT});
            that.refresh()
          })
        }
      }
    }).catch(err =>{

    })
  }

  render() {
    const {current, repos, users, fixed, repo_sort, user_sort, repo_status, user_status} = this.state;
    let list = null;
    let count = current === 0 ? repos.length : users.length;
    switch (current) {
      case 0: {
        list = repos.map((item, index) => {
          return (
            <View onClick={this.handleClickedRepoItem.bind(this, item)} key={index}>
              <RepoItem item={item}/>
            </View>
          )
        })
      }
        break;
      case 1: {
        list = users.map((item, index) => {
          return (
            <View onClick={this.handleClickedUserItem.bind(this, item)} key={index}>
              <FollowItem item={item}/>
            </View>
          )
        })
      }
        break;
    }
    return (
      <View className='content'>
        <View className={fixed ? 'search-segment-fixed' : ''}>
          <Segment tabList={['仓库', '用户']}
                   current={current}
                   showAction={false}
                   onTabChange={this.onTabChange}
          />
        </View>
        {
          fixed &&
          <View className='search-segment-placeholder'/>
        }
        {count === 0 ? <Empty /> : list}
        {
          count != 0 && (
          <LoadMore status={current === 0 ? repo_status : user_status} />
          )
        }
        {
          count > 0 &&
          <View className='filter' onClick={this.onClickedFilter.bind(this)}>
            <Text className='filter-title'>{current === 0 ? repo_sort : user_sort}</Text>
          </View>
        }
      </View>
    )
  }
}

export default SearchResult
