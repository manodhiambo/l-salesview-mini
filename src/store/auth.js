import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    loginAttempts: 0,
    cooldown: false,
  }),
  actions: {
    async login(username, password, remember) {
      this.loading = true
      this.error = null

      if (this.cooldown) {
        this.loading = false
        this.error = "Too many failed attempts. Please wait a moment."
        return
      }

      try {
        const data = await fetch('/src/assets/user_data.json')
        const users = await data.json()
        const foundUser = users.find(u => u.username === username && u.password === password)

        if (foundUser) {
          this.user = foundUser
          this.isAuthenticated = true
          this.loginAttempts = 0
          const storeType = remember ? localStorage : sessionStorage
          storeType.setItem('auth_token', 'fake-token')
          storeType.setItem('user', JSON.stringify(foundUser))
        } else {
          this.loginAttempts++
          if (this.loginAttempts >= 3) {
            this.cooldown = true
            setTimeout(() => {
              this.cooldown = false
              this.loginAttempts = 0
            }, 5000)
          }
          this.error = "Invalid credentials"
        }
      } catch (e) {
        this.error = "Something went wrong"
      }

      this.loading = false
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.clear()
      sessionStorage.clear()
    },
    checkAuth() {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      const user = localStorage.getItem('user') || sessionStorage.getItem('user')

      if (token && user) {
        this.isAuthenticated = true
        this.user = JSON.parse(user)
      }
    }
  }
})
