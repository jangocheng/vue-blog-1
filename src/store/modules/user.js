import { login, getInfo, logout } from '@/api/getUserInfo'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setAvatar, removeAvatar } from '@/utils/avatar'
const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    REMOVE_TOKEN: (state, token) => {
      state.token = ''
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.data.errorCode === 0) {
            setToken(username)
            commit('SET_TOKEN', username)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo () {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (response.data.data) {
            setAvatar(response.data.data.avatarUrl)
          } else {
            removeAvatar()
            removeToken()
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 后端 登出
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          if (response.data.errorCode === 0) {
            commit('SET_TOKEN', '')
            removeAvatar()
            removeToken()
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeAvatar()
        removeToken()
        resolve()
      })
    }
  }
}

export default user
