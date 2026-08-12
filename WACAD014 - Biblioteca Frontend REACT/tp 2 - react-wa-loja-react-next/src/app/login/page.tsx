'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

interface FormularioLogin {
  email: string
  senha: string
}

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioLogin>()

  const onSubmit = (data: FormularioLogin) => {
    localStorage.setItem('@WA-Loja:user', JSON.stringify({ email: data.email }))
    toast.success('Login realizado com sucesso!')
    router.push('/')
  }

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4 font-weight-bold">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              {...register('email', {
                required: 'O e-mail é obrigatório.',
              })}
            />
            {errors.email && (
              <span className="text-danger fs-7 mt-1 d-block">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              {...register('senha', {
                required: 'A senha é obrigatória.',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres.',
                },
              })}
            />
            {errors.senha && (
              <span className="text-danger fs-7 mt-1 d-block">
                {errors.senha.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-dark w-100 mt-2 py-2">
            Entrar
          </button>
        </form>

        <div className="text-center mt-3 fs-7">
          <span className="text-muted">Ainda não tem conta? </span>
          <Link href="/register" className="text-decoration-none">
            Cadastre-se
          </Link>
        </div>
      </div>
    </main>
  )
}