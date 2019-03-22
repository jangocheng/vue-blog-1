import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const state = {

}

export default new Vuex.Store({
  modules: {
    permission, user
  },
  state,
  getters,
  actions,
  mutations
})
