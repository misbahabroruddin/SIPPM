import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    default: "Dasboard",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function DashboardLayout({ children }) {
  return <>{children}</>;
}
