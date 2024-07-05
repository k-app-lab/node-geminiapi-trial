import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layouts/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'カラオケ曲おすすめ選ぶよ！',
  description: 'カラオケ曲おすすめ選ぶよ！',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='jp'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
