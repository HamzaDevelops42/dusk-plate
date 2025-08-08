
import "./globals.css";
import { Poppins } from 'next/font/google'
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
})


export const metadata = {
  title: `${process.env.NAME} | Elegant Dining Experience`,
  description:
    `${process.env.NAME} offers a refined dining experience inspired by the ambiance of twilight. Discover handcrafted dishes, bold flavors, and a modern atmosphere designed for unforgettable evenings.`,
  keywords: [
    process.env.NAME,
    'fine dining',
    'evening restaurant',
    'romantic dinner',
    'modern cuisine',
    'dark themed restaurant',
    'gourmet food',
    'chef specials',
  ],
  openGraph: {
    title: `${process.env.NAME} | Elegant Dining Experience`,
    description:
      `Join us at ${process.env.NAME} for an unforgettable evening of gourmet cuisine, ambient lighting, and bold flavors crafted by expert chefs.`,
    url: process.env.URL,
    siteName: process.env.NAME,
    locale: 'en_US',
    type: 'website',
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-bg min-h-[100vh] text-dark-text`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
