import Cookies from 'js-cookie'

const TokenKey = 'User-Avatar'

export function getAvatar () {
  return Cookies.get(TokenKey)
}

export function setAvatar (token) {
  return Cookies.set(TokenKey, token)
}

export function removeAvatar () {
  return Cookies.remove(TokenKey)
}
