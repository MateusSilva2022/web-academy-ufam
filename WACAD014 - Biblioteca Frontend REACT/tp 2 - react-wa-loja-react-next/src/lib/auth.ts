import { AuthUser } from '@/services/auth.service'

const STORAGE_KEY = '@WA-Loja:user'

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const rawUser = localStorage.getItem(STORAGE_KEY)
  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as AuthUser
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredUser())
}
