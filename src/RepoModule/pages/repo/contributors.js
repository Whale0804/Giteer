import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {LOADING_TEXT} from "../../../constants/common";
import FollowItem from '../../../components/mine/followItem'
import Empty from '../../../components/empty/index'
import {connect} from "@tarojs/redux";

import './contentList.scss'


@connect(({ repo }) => ({
  ...repo,
}))
class Contributors extends Component {

  config = {
    navigationBarTitleText: '贡献者'
  }

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      dataList: [],
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params;
    this.setState({
      url: params.url,
    })
  }

  componentDidMount() {
    Taro.showLoading({title: LOADING_TEXT});
    this.getContributors()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  getContributors() {
    const { url } = this.state;
    this.props.dispatch({
      type: 'repo/getContributors',
      payload:{
        url: url
      },
      callback: (res) => {
        console.log(res);
        this.setState({
          dataList: res
        });
        Taro.hideLoading();
      }
    });
  }

  render () {
    const { dataList } = this.state;
    return (
      <View className='content'>
        {
          dataList.length > 0 ? (
            dataList.map((item, index)=>{
              return (
                <View key={index}>
                  <FollowItem item={item} isContributors={true}/>
                </View>
              )
            })
          ) : <Empty />
        }
      </View>
    )
  }
}

export default Contributors
