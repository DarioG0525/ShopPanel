import { createContext, useContext, useState } from 'react'
import { loginRequest } from '../services/authService.js'
import {
  clearAuthStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
} from '../utils/storage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const persisted = loadAuthFromStorage()

  const [user, setUser] = useState(persisted?.user ?? null)
  const [token, setToken] = useState(persisted?.token ?? null)

  const isAuthenticated = Boolean(user && token)

  async function login(credentials) {
    const response = await loginRequest(credentials)
    const authData = {
      token: response.accessToken,
      user: {
        id: response.id,
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        image: response.image,
      },
    }

    setUser(authData.user)
    setToken(authData.token)
    saveAuthToStorage(authData)
  }

  function logout() {
    setUser(null)
    setToken(null)
    clearAuthStorage()
  }

  const value = { user, token, isAuthenticated, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return context
}
