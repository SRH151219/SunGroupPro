export default {
  saveAddress(state, params) {
    state.addressList = params
  },
  modifyAddress(state, params) {
    state.addressList.splice(params.id, 1, params)
  },
  delAddress(state, params) {
    state.addressList.splice(params, 1)
  },
  addAddress(state, params) {
    state.addressList.unshift(params)
  },
  getUserInfo(state, params) {
    state.userInfo = params
    console.log(params)

  }
}