import { Navbar } from "@/components/navbar";
import { NavbarMobile } from "@/components/navbar-mobile";
import { Sidebar } from "@/components/sidebar";
import { SidebarMobile } from "@/components/sidebar-mobile";

export default function HomeLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
        <NavbarMobile />
      </header>
      <div className="relative mt-20 flex">
        <Sidebar />
        <SidebarMobile />
        <main className="flex w-full">{children}</main>
      </div>
    </>
  );
}
