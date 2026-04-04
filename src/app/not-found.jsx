import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Decorative blobs matching brand palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-lime-100 opacity-60"
        style={{ filter: "blur(80px)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-teal-100 opacity-50"
        style={{ filter: "blur(70px)" }}
      />

      <main className="relative z-10 flex flex-col items-center text-center">
        {/* Large 404 number */}
        <p className="select-none text-[10rem] font-semibold leading-none tracking-tight text-gray-200 sm:text-[13rem] lg:text-[22rem]">
          404
        </p>

        {/* Leaf/plant icon — brand-appropriate SVG */}
        <div className="-mt-50 mb-28 ml-1.5 flex h-16 w-16 items-center justify-center rounded-full bg-lime-400 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-gray-900"
          >
            {/* Leaf path */}
            <path d="M12 22c0 0-8-4-8-12a8 8 0 0 1 16 0c0 8-8 12-8 12z" />
            <line x1="12" y1="22" x2="12" y2="10" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-gray-900 sm:text-5xl">
          Oops! Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-500">
          We couldn’t find what you were looking for. It might have been removed
          or the link is broken. Don’t worry — let’s get you back to products
          that are perfect for your skin.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full bg-teal-950 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="inline-flex rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Browse products
          </Link>
        </div>

        {/* Quick-link strip */}
        {/* <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
          <span className="font-medium text-gray-400 uppercase tracking-wider text-xs">
            Or explore
          </span>
          <Link
            href="/categories"
            className="font-medium text-gray-700 underline-offset-2 hover:underline"
          >
            Categories
          </Link>
          <Link
            href="/orders"
            className="font-medium text-gray-700 underline-offset-2 hover:underline"
          >
            Orders
          </Link>
          <Link
            href="/#about"
            className="font-medium text-gray-700 underline-offset-2 hover:underline"
          >
            About
          </Link>
        </div> */}
      </main>

      {/* Bottom brand strip */}
      {/* <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white py-5 text-center text-xs text-gray-400">
        Natural skincare — back to the basics.
      </div> */}
    </div>
  );
}
