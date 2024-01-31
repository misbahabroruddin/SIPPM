import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    default: "Login",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function HomeLayout({ children }) {
  return <main>{children}</main>;
}
