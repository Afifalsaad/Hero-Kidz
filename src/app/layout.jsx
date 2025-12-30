import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const fontBangla = localFont({
  src: "../../src/fonts/mayaboti-normal.ttf",
});

export const metadata = {
  title: "Hero Kidz",
  description:
    "A website where you find educative toys for your child.",

  url: "https://hero-kidz-amber.vercel.app/",

  image: "https://i.ibb.co.com/s9brDwvd",
  type: "website", 

  openGraph: {
    title: "Hero Kidz",
    description:
      "A website where you find educative toys for your child.",
    url: "https://yourapp.com",
    site_name: "Hero Kidz",
    images: [
      {
        url: "https://i.ibb.co.com/fYmhk8J8",
        width: 1200,
        height: 630,
        alt: "Home Page Preview",
      },
      {
        url: "https://i.ibb.co.com/Td25FrF",
        width: 1200,
        height: 630,
        alt: "Product Page Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },


  twitter: {
    card: "summary_large_image", 
    site: "@YourTwitterHandle", 
    creator: "@YourTwitterHandle", 
    title: "Hero Kidz",
    description:
      "A website where you find educative toys for your child.",
    images: [
      "https://i.ibb.co.com/fYmhk8J8",
    ],
  },


  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },


  robots: "index, follow",
  keywords: ["react", "next.js", "full stack", "MERN", "productivity"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header className="py-2 md:max-w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>

        <main className="py-2 md:max-w-11/12 mx-auto min-h-[calc(100svh-302px)]">
          {children}
        </main>

        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
