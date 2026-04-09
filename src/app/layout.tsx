import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roundfire',
  description: 'Two teams. One device. No mercy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}