'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: string | null
  login: (email: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
})

export function useAuthContext() {
  return useContext(AuthContext)
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const currentUser = localStorage.getItem('user')

    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  function login(email: string) {
    setUser(email)
    localStorage.setItem('user', email)
    router.push('/')
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}