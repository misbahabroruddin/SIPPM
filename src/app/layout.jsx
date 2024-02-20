import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";

import "./globals.css";
import { siteConfig } from "@/config/site";
import { SidebarProvider } from "@/lib/hooks/useSidebar";
import { MaterializeProvider } from "@/providers/materialize-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { authOptions } from "@/config/auth";
import Toast from "@/components/react-toastify";
import QueryProvider from "@/providers/query-provider";
import { StepProvider } from "@/lib/hooks/useStep";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body className={`${poppins.className}`}>
        <AuthProvider session={session}>
          <SidebarProvider>
            <StepProvider>
              <MaterializeProvider>
                <QueryProvider>{children}</QueryProvider>
              </MaterializeProvider>
              <Toast />
            </StepProvider>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
