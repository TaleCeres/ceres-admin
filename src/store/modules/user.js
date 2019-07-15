import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },
  actions: {
    // user login
    Login({ commit }, userInfo) {
      console.log('userInfo', userInfo)
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const { data } = response.data
          // console.log('data.token', data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const { data } = response
          console.log('data', data)
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar } = data
          // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject('getInfo: roles must be a non-null array!')
          // }
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FedLogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  },
}


export default user
