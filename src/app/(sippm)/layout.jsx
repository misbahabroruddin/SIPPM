import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function HomeLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className='flex mt-20'>
        <Sidebar />
        <main className='flex w-full'>{children}</main>
      </div>
    </>
  );
}
