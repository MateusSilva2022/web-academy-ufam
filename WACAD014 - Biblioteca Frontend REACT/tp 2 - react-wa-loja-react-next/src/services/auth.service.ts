import { favoriteApi } from '@/lib/api'

export interface LoginPayload {
  email: string
  senha: string
}

export interface RegisterPayload {
  nome: string
  email: string
  senha: string
}

export interface AuthUser {
  id: string
  nome: string
  email: string
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const { data } = await favoriteApi.post<AuthUser>('/login', payload)
  return data
}

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const { data } = await favoriteApi.post<AuthUser>('/register', payload)
  return data
}
