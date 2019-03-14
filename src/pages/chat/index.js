import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSwipeAction, AtList, AtListItem } from "taro-ui"
import {connect} from "@tarojs/redux";
import {PER_PAGE, LOADING_TEXT, REFRESH_STATUS} from "../../../constants/common";
import LoadMore from "../../../components/loadMore/loadMore";

@connect(({ chat }) => ({
  ...chat,
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '私信',
    enablePullDownRefresh:true
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtList>
          <AtSwipeAction autoClose onClick={(e)=>{

          }} options={[
            {
              text: '标记为已读',
              style: {
                backgroundColor: '#6190E8'
              }
            }
          ]}>
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://avatar.gitee.com/uploads/1/1_oschina-org.png?1524465517'
              note='详细信息详细信息详细信息详细信息'
            />
          </AtSwipeAction>
          <AtSwipeAction autoClose onClick={(e)=>{

          }} options={[
            {
              text: '标记为已读',
              style: {
                backgroundColor: '#6190E8'
              }
            }
          ]}>
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              note='详细信息详细信息详细信息详细信息'
            />
          </AtSwipeAction>
          <AtSwipeAction autoClose onClick={(e)=>{

          }} options={[
              {
                text: '标记为已读',
                style: {
                  backgroundColor: '#6190E8'
                }
              }
            ]}
          >
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              note='详细信息详细信息详细信息详细信息'
            />
          </AtSwipeAction>
        </AtList>
      </View>
    )
  }
}

