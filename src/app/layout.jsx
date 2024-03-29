import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config/site";
import { SidebarProvider } from "@/lib/hooks/useSidebar";
import { MaterializeProvider } from "@/providers/materialize-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { authOptions } from "@/config/auth";
import Toast from "@/components/react-toastify";
import QueryProvider from "@/providers/query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo-unsia.svg",
      href: "/logo-unsia.svg",
    },
  ],
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={`${poppins.className}`}>
        <AuthProvider session={session}>
          <SidebarProvider>
            <MaterializeProvider>
              <QueryProvider>{children}</QueryProvider>
            </MaterializeProvider>
            <Toast />
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
