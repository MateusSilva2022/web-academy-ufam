'use client'

import Link from 'next/link'
import { useAuthContext } from '@/app/State/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuthContext()

  return (
    <nav className='navbar navbar-expand-md bg-light border-bottom border-body sticky-top'>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          Loja WA
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Abrir menu'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0'>
            <li className='nav-item'>
              <Link className='nav-link' href='/'>
                Início
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link' href='/favorites'>
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          {user && (
            <span className='me-3 text-secondary'>
              {user}
            </span>
          )}

          {user ? (
            <button
              type='button'
              className='btn btn-secondary'
              onClick={logout}
            >
              Sair
            </button>
          ) : (
            <Link href='/login'>
              <button
                type='button'
                className='btn btn-secondary'
              >
                Entrar
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}