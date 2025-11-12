import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: number
  email: string
  name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') ?? '', // string toujours
    user: null as User | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password })
      this.token = res.data.token ?? ''
      localStorage.setItem('token', this.token)
    },

    async fetchProfile() {
      if (!this.token) return
      const res = await axios.get('http://localhost:3000/auth/profile', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      this.user = res.data
    },

    async updateProfile(data: { email?: string; name?: string; password?: string }) {
      if (!this.user) return
      const res = await axios.patch('http://localhost:3000/users/me', data, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      this.user = res.data
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },

    // si tu veux signup, il faut le définir explicitement
    async signup(payload: { email: string; password: string; name?: string }) {
      const res = await axios.post('http://localhost:3000/auth/signup', payload)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.fetchProfile()
    },
  },
})
