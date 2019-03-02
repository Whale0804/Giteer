import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Navigator, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { timeago, formatCount } from '../../utils/common'

import './repoItem.scss'

export default class RepoItem extends Component{
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: null,
  }

  handleClickName(name){
    Taro.navigateTo({
      url:'/pages/mine/developerInfo/developerInfo?username='+name,
    })
  }

  render() {
    const { item } = this.props;
    if (!item) return <View/>
    let update_time = ' ' + timeago(Date.parse(new Date(item.updated_at)));
    let is_bottom_show = (item.language && item.language.length > 0 || item.stargazers_count > 0 || item.forks_count > 0)
    return (
      <View className='content'>
        <View className='repo_title_view'>
          <AtIcon value='bookmark' size='20'></AtIcon>
          <View className='repo_title'>{item.human_name}</View>
        </View>
        <View className='repo_desc'>{item.description || '暂无描述~'}</View>
        {is_bottom_show &&
        <View className='repo_bottom'>
          {
            item.language.length > 0 &&
            <View className='repo_number_item'>
              <AtIcon prefixClass='ion' value='ios-pricetag' size='16' color='#7f7f7f'/>
              <View className='repo_number_title'>{item.language}</View>
            </View>
          }
          {
            item.watchers_count > 0 &&
            <View className='repo_number_item'>
              <AtIcon prefixClass='ion' value='ios-eye' size='16' color='#7f7f7f'/>
              <View className='repo_number_title'>{formatCount(item.watchers_count)}</View>
            </View>
          }
          {
            item.stargazers_count > 0 &&
            <View className='repo_number_item'>
              <AtIcon prefixClass='ion' value='ios-star' size='16' color='#7f7f7f'/>
              <View className='repo_number_title'>{formatCount(item.stargazers_count)}</View>
            </View>
          }
          {
            item.forks_count > 0 &&
            <View className='repo_number_item'>
              <AtIcon prefixClass='ion' value='ios-git-network' size='16' color='#7f7f7f'/>
              <View className='repo_number_title'>{formatCount(item.forks_count)}</View>
            </View>
          }
        </View>
        }
        <View className='update_view'>
          <View className='update_date'>最后更新于{' ' + update_time}</View>
        </View>
      </View>
    )
  }
}
