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
      <div className="relative mt-16 flex md:mt-16 lg:mt-20">
        <Sidebar />
        <SidebarMobile />
        <main className="flex w-full">{children}</main>
      </div>
    </>
  );
}
