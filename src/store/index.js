import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const state = {
  tags: [
    {label: 'Java', icon: 'icon-java'},
    {label: 'JavaScript', icon: 'icon-logo-javascript'},
    {label: 'CSS', icon: 'icon-css'},
    {label: 'VUE', icon: 'icon-bxl-vuejs'},
    {label: 'REACT', icon: 'icon-react'},
    {label: 'Database', icon: 'icon-data-base'},
    {label: 'Server', icon: 'icon-fuwuqi'},
    {label: 'Others', icon: 'icon-qita'}
  ]
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
