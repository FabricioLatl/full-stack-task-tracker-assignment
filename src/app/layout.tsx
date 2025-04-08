// src/app/layout.tsx
import './styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Task Tracker',
  description: 'A minimal Task Tracker front-end example',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        {/* Simple Header (optional) */}
        <header className="p-4 bg-blue-500 text-white font-bold">
          Task Tracker
        </header>

        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
