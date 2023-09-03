import { Metadata} from 'next';

export const metadata: Metadata = {
     title: 'equiz',
     description: 'Online test platform'
}

const RootLayout = ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
})=> {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout;