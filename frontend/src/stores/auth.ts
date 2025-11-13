import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: number
  email: string
  name: string
}

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') ?? '',
    user: null as User | null,
  }),

  actions: {
    async login(email: string, password: string) {
      console.log('API_URL:', API_URL)
      const res = await axios.post(`${API_URL}/auth/login`, { email, password })
      this.token = res.data.token ?? ''
      localStorage.setItem('token', this.token)
    },

    async fetchProfile() {
      if (!this.token) return
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      this.user = res.data
    },

    async updateProfile(data: { email?: string; name?: string; password?: string }) {
      if (!this.user) return
      const res = await axios.patch(`${API_URL}/users/me`, data, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      this.user = res.data
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },

    async signup(payload: { email: string; password: string; name?: string }) {
      const res = await axios.post(`${API_URL}/auth/signup`, payload)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.fetchProfile()
    },
  },
})
