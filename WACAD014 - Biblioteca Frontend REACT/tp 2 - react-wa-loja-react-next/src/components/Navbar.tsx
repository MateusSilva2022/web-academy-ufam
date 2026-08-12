'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/login' || pathname === '/register' || pathname === '/cadastro') {
    return null
  }

  const isAuthenticated =
    typeof window !== 'undefined' && Boolean(localStorage.getItem('@WA-Loja:user'))

  const handleLogout = () => {
    localStorage.removeItem('@WA-Loja:user')
    router.push('/login')
  }

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          WA Loja
        </Link>

        <div className="justify-content-between container-fluid" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cart">
                Carrinho
              </Link>
            </li>
            {isAuthenticated && (
              
              <li className="nav-item">
                <Link className="nav-link" href="/favorites">
                  Favoritos
                </Link>
              </li>

            )}
          </ul>

          {isAuthenticated ? (
            <button className="btn btn-dark" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-dark" href="/login">
                Entrar
              </Link>
              <Link className="btn btn-dark" href="/register">
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
