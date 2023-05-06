export const metadata = {
  title: 'SimpleCity',
  description: 'Share your city with the world!',
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
