const getters = {
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  token: state => state.user.token
}
export default getters
