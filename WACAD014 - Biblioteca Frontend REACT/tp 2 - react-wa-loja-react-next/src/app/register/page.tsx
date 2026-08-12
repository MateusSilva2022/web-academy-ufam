'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { registerUser } from '@/services/auth.service'

interface FormularioCadastro {
  nome: string
  email: string
  senha: string
  confirmarSenha: string
}

export default function RegisterPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioCadastro>()

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      localStorage.setItem('@WA-Loja:user', JSON.stringify(user))
      toast.success('Cadastro realizado com sucesso!')
      router.push('/')
    },
    onError: () => {
      toast.error('Não foi possível cadastrar. Verifique os dados informados.')
    },
  })

  const onSubmit = (data: FormularioCadastro) => {
    registerMutation.mutate({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    })
  }

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4 font-weight-bold">Cadastro</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome"
              {...register('nome', {
                required: 'O nome é obrigatório.',
              })}
            />
            {errors.nome && (
              <span className="text-danger fs-7 mt-1 d-block">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              {...register('email', {
                required: 'O e-mail é obrigatório.',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Digite um e-mail válido.',
                },
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

          <div className="mb-3">
            <label className="form-label">Confirmar senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirme sua senha"
              {...register('confirmarSenha', {
                required: 'A confirmação de senha é obrigatória.',
                validate: (value, formValues) =>
                  value === formValues.senha || 'As senhas não coincidem.',
              })}
            />
            {errors.confirmarSenha && (
              <span className="text-danger fs-7 mt-1 d-block">
                {errors.confirmarSenha.message}
              </span>
            )}
          </div>

          <button type="submit" className="btn btn-dark w-100 mt-2 py-2">
            {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          {registerMutation.isError && (
            <p className="text-danger mt-2 mb-0">Erro ao realizar cadastro.</p>
          )}
        </form>

        <div className="text-center mt-3 fs-7">
          <span className="text-muted">Já tem uma conta? </span>
          <Link href="/login" className="text-decoration-none">
            Faça login
          </Link>
        </div>
      </div>
    </main>
  )
}
