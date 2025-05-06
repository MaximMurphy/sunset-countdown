import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#0032a3] relative h-svh md:h-screen flex flex-col items-center justify-center">
      <div className="z-20 absolute inset-0 flex flex-col items-center justify-center px-2 lg:px-12 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-4 text-center font-mono font-medium text-amber-50 transition-all duration-500 ease-in-out">
          <p className="text-[2rem] md:text-[4rem] lg:text-[6rem]">
            404 Page Not Found
          </p>

          <Link
            href="/"
            className="h-full w-fit border py-2 px-4 rounded-md hover:cursor-pointer hover:border-amber-500 transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
