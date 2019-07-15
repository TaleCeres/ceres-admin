import requestUser from '@/utils/requestUser'

export function login(userInfo) {
  return requestUser({
    url: '/v1/token/user',
    method: 'post',
    data: userInfo,
  })
}

export function getInfo() {
  return requestUser({
    url: '/v1/user',
    method: 'get',
  })
}
