import { Merriweather, Rubik } from 'next/font/google';
import "./globals.css";

// Load the fonts
const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

const rubik = Rubik({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Interim HealthCare",
  description: "Best Senior In Home-Care",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/faviconinterim.ico" sizes="any" type="image/x-icon" />
<link rel="icon" href="/faviconinterim.ico" type="image/png" />
<link rel="apple-touch-icon" href="/faviconinterim.ico"/>
      </head>
      <body className={rubik.className}> {/* Rubik for body text */}
        <div className={rubik.className}> {/* Heading font will be controlled here */}
          {children}
        </div>
      </body>
    </html>
  );
}