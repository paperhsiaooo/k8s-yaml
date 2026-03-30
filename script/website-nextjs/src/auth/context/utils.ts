import { ACCESS_TOKEN_KEY } from './constant'
import axios from 'axios'

export function jwtDecode(token: string) {
  try {
    if (!token) return null

    const parts = token.split('.')
    if (parts.length < 2) {
      throw new Error('Invalid token!')
    }

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decode = JSON.parse(atob(base64))

    return decode
  } catch (error) {
    console.error('Error decoding token: ', error)
    throw error
  }
}

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false
  }

  try {
    const decoded = jwtDecode(accessToken)

    if (!decoded || !('exp' in decoded)) {
      return false
    }

    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
  } catch (error) {
    console.error('Error during token validation: ', error)
    return false
  }
}

export function tokenExpired(exp: number) {
  const currentTime = Date.now()
  const timeLeft = exp * 1000 - currentTime

  setTimeout(() => {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    } catch (error) {
      console.error('Error during token expiration:', error)
      throw error
    }
  }, timeLeft)
}

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      const decodedToken = jwtDecode(accessToken)

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp)
      } else {
        throw new Error('Invalid access token!')
      }
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      delete axios.defaults.headers.common.Authorization
    }
  } catch (error) {
    console.error('Error during set session: ', error)

    throw error
  }
}
