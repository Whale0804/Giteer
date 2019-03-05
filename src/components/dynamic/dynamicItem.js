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

  handleClickAvatar(name){
    Taro.navigateTo({
      url:'/pages/mine/developerInfo/developerInfo?username='+name,
    })
  }

  handleClickRepos(url){
    Taro.navigateTo({
      url: '/pages/repo/repo?url='+encodeURI(url)
    })
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
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
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
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'WatchEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>关注了仓库</Text>
              <Text className='reposname'>
                {' ' + item.repo.human_name}
              </Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'CreateEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>创建了一个新的仓库</Text>
              <Text className='reposname'>
                {' '+item.repo.human_name}
              </Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'ForkEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view'>
              <View onClick={this.handleClickRepos.bind(this,item.payload.forkee.full_name)} >
                <Text className='textprefix'>Fork了仓库</Text>
                <Text className='reposname'>
                  {' ' + item.repo.full_name}
                </Text>
              </View>
              <View onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
                <Text className='textprefix'>到仓库</Text>
                <Text className='reposname'>
                  {' ' + item.payload.full_name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'IssueEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>对</Text>
              <Text className='reposname'>
                {' '+item.repo.human_name+' '}
              </Text>
              <Text className='textprefix'>仓库创建了新的Issue:</Text>
              <Text className='reposname'>{' #'+item.payload.number}</Text>
              <Text className='commentBody'>{' '+item.payload.title}</Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'IssueCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
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
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'FollowEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.payload.target.login)} >
              <Text className='textprefix'>关注了</Text>
              <Text className='reposname'>
                {' ' + item.payload.target.login}
              </Text>
            </View>
          </View>

        </View>
      )
    } else if (item.type === 'PushEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this,item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickAvatar.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>推送到了</Text>
              <Text className='reposname'>
                {' ' + item.repo.human_name + ' '}
              </Text>
              <Text className='textprefix'>
                的 {' ' + item.payload.ref + ' '} 分支
              </Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'PullRequestEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
            </View>
            <View className='content-view'>
              <View onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
                <Text className='textprefix'>对仓库</Text>
                <Text className='username'>
                  {item.repo.human_name}
                </Text>
                <Text className='textprefix'>进行了 PullRequest 操作</Text>
              </View>
            </View>
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
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>{item.payload.action + ' a pullRequest comment in' }</Text>
              <Text className='reposname'>
                {item.repo.human_name}
              </Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'CommitCommentEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>creates a commit comment in </Text>
              <Text className='reposname'>
                {item.repo.human_name}
              </Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'DeleteEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>删除了这个</Text>
              <Text className='reposname'>
                {' ' + item.repo.human_name + ''}
              </Text>
              <Text className='textprefix'>仓库</Text>
            </View>
          </View>
        </View>
      )
    } else if (item.type === 'MemberEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>对仓库</Text>
              <Text className='reposname'>
                {' ' + item.repo.human_name + ' '}
              </Text>
              <Text className='textprefix'>添加了新成员</Text>
            </View>
          </View>

        </View>
      )
    } else if (item.type === 'PublicEvent') {
      dynamic = (
        <View className='activity'>
          <View className='activity_desc'>
            <View className='info_view' onClick={this.handleClickAvatar.bind(this, item.actor.login)} >
              <Text className='username'>
                {item.actor.name}
              </Text>
              <Text className='time'>
                {created_at}
              </Text>
            </View>
            <View className='content-view' onClick={this.handleClickRepos.bind(this,item.repo.full_name)} >
              <Text className='textprefix'>将仓库</Text>
              <Text className='username'>
                {' ' + item.repo.full_name + ' '}
              </Text>
              <Text className='textprefix'>更改为公开状态</Text>
            </View>
          </View>
        </View>
      )
    }

    return (
      <View>
        {
          item.type != null && (
            <View className='content'>
              <View onClick={this.handleClickAvatar.bind(this,item.actor.login)}>
                <AtAvatar size={"small"} image={item.actor.avatar_url}/>
              </View>
              {dynamic}
            </View>
          )
        }
      </View>
    )
  }
}
