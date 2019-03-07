const rp = require('request-promise')
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

async function fetchAccessToken() {
  const date = new Date()
  const cacheData = await db.collection('access_token')
    .where({})
    .orderBy('cacheDate', 'desc')
    .get();
  const settings = await db.collection('settings').where({
    _id: 'XIDHWVsqTi00toxp'
  }).get();

  if (cacheData.data.length !== 0 &&
    ((date.getTime() - cacheData.data[0].cacheDate)  < 3600 * 1000)) {
    return cacheData.data[0].access_token
  } else {
    const appid = settings.data[0].app_id;
    const secret = settings.data[0].secret;
    const accessToken_options = {
      method: 'GET',
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      qs: {
        appid,
        secret,
        grant_type: 'client_credential'
      },
      json: true
    };
    //获取AccessToken
    const resultValue = await rp(accessToken_options);
    resultValue.cacheDate = date.getTime()
    await db.collection('access_token').add({
      data: resultValue
    })
    return resultValue.access_token
  }
}

async function fetchACode(token, path) {
  // 获取小程序码配置
  const code_options = {
    method: 'POST',
    url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token,
    body: {
      'path': path,
      'width': 300,
      'is_hyaline': true
    },
    json: true,
    encoding: null
  };
  // 获取二进制图片
  return await rp(code_options);
}


exports.fetchAccessToken = fetchAccessToken;
exports.fetchACode = fetchACode;
