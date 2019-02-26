import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Navigator, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { timeago } from '../../utils/common'

import './dynamicItem.scss'

export default class DynamicItem extends Component {
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: null,
  }

  render() {
    const { item } = this.props
    if (!item) return <View />
    let created_at = timeago(Date.parse(new Date(item.created_at)));
    let dynamic = null
    if (item.type === 'ProjectCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator style={{width:'100%'}} url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>发表了对</Text>
              <Text className='reposname'>
                {' '+item.repo.human_name+' '}
              </Text>
              <Text className='textprefix'>
                仓库的评论:
              </Text>
              <Text className='commentBody'>
                {' '+item.payload.comment.body}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'WatchEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>收藏了仓库</Text>
              <Text className='username'>
                {item.repo.human_name}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'CreateEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>创建了一个新的仓库</Text>
              <Text className='reposname'>
                {' '+item.repo.human_name}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'ForkEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.payload.forkee.url)} >
              <Text className='textprefix'>Fork了仓库</Text>
              <Text className='reposname'>
                {' ' + item.repo.name}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>到仓库</Text>
              <Text className='reposname'>
                {' ' + item.payload.forkee.full_name}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'IssueEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>对</Text>
              <Text className='reposname'>
                {' '+item.repo.human_name+' '}
              </Text>
              <Text className='textprefix'>仓库创建了新的Issue:</Text>
              <Text className='reposname'>{' #'+item.payload.number}</Text>
              <Text className='commentBody'>{' '+item.payload.title}</Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'IssueCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>评论了</Text>
              <Text className='reposname'>
                {' ' + item.repo.human_name + ' '}
              </Text>
              <Text className='textprefix'>的 Issue</Text>
              <Text className='reposname'>
                {' #' + item.payload.issue.number + ' ' + item.payload.issue.title + ': '}
              </Text>
              <Text className='commentBody'>
                {item.payload.comment.body}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'FollowEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/account/developerInfo?username=' + item.payload.target.login} >
              <Text className='textprefix'>关注了</Text>
              <Text className='reposname'>
                {' ' + item.payload.target.login}
              </Text>
            </Navigator>
          </View>

        </View>
      )
    } else if (item.type === 'PushEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>推送到了</Text>
              <Text className='reposname'>
                {' ' + item.repo.full_name + ' '}
              </Text>
              <Text className='textprefix'>
                的 {' ' + item.payload.ref + ' '} 分支
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'PullRequestEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </Navigator>
            <Navigator url='' hoverClass='none' >
              <Text className='text'>{item.payload.action + ' a PullRequest in'}</Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='username'>
                {item.repo.human_name}
              </Text>
            </Navigator>
          </View>
          <Text className='time'>
            {created_at}
          </Text>
        </View>
      )
    } else if (item.type === 'PullRequestReviewCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>{item.payload.action + ' a pullRequest comment in' }</Text>
              <Text className='reposname'>
                {item.repo.human_name}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'CommitCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>creates a commit comment in </Text>
              <Text className='reposname'>
                {item.repo.human_name}
              </Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'DeleteEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>删除了这个</Text>
              <Text className='reposname'>
                {' ' + item.repo.human_name + ''}
              </Text>
              <Text className='textprefix'>仓库</Text>
            </Navigator>
          </View>
        </View>
      )
    } else if (item.type === 'MemberEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>{item.payload.action + ' a member in '}</Text>
              <Text className='reposname'>
                {item.repo.full_name}
              </Text>
            </Navigator>
          </View>

        </View>
      )
    } else if (item.type === 'PublicEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <Navigator url={'/pages/account/developerInfo?username=' + item.actor.login} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </Navigator>
            <Navigator url={'/pages/repo/repo?url=' + encodeURI(item.repo.url)} >
              <Text className='textprefix'>将仓库</Text>
              <Text className='username'>
                {' ' + item.repo.full_name + ' '}
              </Text>
              <Text className='textprefix'>更改为公开状态</Text>
            </Navigator>
          </View>
        </View>
      )
    }

    return (
      <View className='content'>
        <AtAvatar circle image={item.actor.avatar_url} />
        {dynamic}
      </View>
    )
  }
}
