import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

import { CartProvider } from '../context/CartContext'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Loja React',
  description: 'TP WebAcademy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryClientProvider>
          <CartProvider>
            {children}
            <Toaster position="top-right" />
          </CartProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
