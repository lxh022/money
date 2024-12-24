import { defineStore } from 'pinia'

const userStore = defineStore('user', {
  state: () => {
    return {
      user: {} as any,
      params: {} as any,
      saveUrl: '',
    }
  },
  getters: {
    loggedIn(state: any) {
      return !!state
    },
    userInfo:
      (state: any) =>
      (field: any, defaultValue = null) => {
        return state.user ? state.user[field] : defaultValue
      },
  },
  actions: {
    async logout() {
      try {
        // logout()
        setTimeout(() => {
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = '/login'
        }, 1300)
      } catch (e) {}
    },
    getUser() {
      //   getUser()
      //     .then(res => {
      //       const oData = res.data.data
      //       this.user = oData
      //     })
      //     .catch(() => {})
    },
    setParams(params: any) {
      this.params = params
    },
    setSaveUrl(url: string) {
      this.saveUrl = url
    },
  },
})

export default userStore
