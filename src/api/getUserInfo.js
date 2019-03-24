import axios from '@/utils/request'
import qs from 'qs'

export function getInfo () {
  return axios.get('/blog/getCurrentUser')
}

export function login (username, password) {
  return axios.post('/blog/login', qs.stringify({ username, password }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export function logout () {
  return axios({
    url: '/blog/logout',
    method: 'post'
  })
}
