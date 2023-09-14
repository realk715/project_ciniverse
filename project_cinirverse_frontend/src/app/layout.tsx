'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider,useAuth  } from './context/AuthContext';
import Navbar from './Header_Navbar';
import Footer from './Footer';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
