import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "HFW App",
  description: "Full stack application with Next.js, Prisma, and PostgreSQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
