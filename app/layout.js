import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Hopefit Wellness",
  description: "HOPE FIT WELLNESS is dedicated to making health and wellness accessible and achievable for everyone. Our journey is built on integrity, humanity, and a commitment to each client's success. We have worked with a diverse range of clients, tailoring programs that not only meet goals but inspire lifelong wellness habits.",
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
