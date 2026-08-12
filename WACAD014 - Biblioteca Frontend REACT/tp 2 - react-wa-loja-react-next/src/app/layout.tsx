import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

import { CartProvider } from '../context/CartContext'
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'
import BootstrapClient from '@/components/BootstrapClient'
import Navbar from '@/components/Navbar'
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
            <Navbar />
            {children}
            <BootstrapClient />
            <Toaster position="top-right" />
          </CartProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}