import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-[100dvh] place-items-center text-[#10487A]">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-8xl font-bold ">404</h1>
        <h3 className="text-xl font-semibold">NOT FOUND</h3>
        <Link href="/dashboard" className="mt-6">
          <button className="rounded-full bg-primary px-4 py-2 text-white active:scale-95 active:transform">
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>
  );
}
