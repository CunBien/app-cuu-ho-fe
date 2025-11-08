export default function Header({ children }) {
  return (
    <>
      <header className="bg-white shadow-sm border border-solid border-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-none md:flex md:items-center md:gap-12 pl-0 xl:-ml-40">
              <a className="block text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <div className="flex flex-row items-center gap-3 ">
                  <img
                    src="/icons8-map.gif"
                    alt="Biểu tượng bản đồ cứu hộ"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-2xl font-bold text-gray-500 transition hover:text-gray-800">
                    Hệ thống cứu hộ khẩn cấp
                  </span>
                </div>
              </a>
            </div>

            {/* Navigation & Actions */}
            <div className="md:flex md:items-center md:gap-12">
              {/* Navigation */}
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  {["About"].map((item) => (
                    <li key={item}>
                      <a
                        className="text-sm font-medium text-gray-500 transition hover:text-gray-800 mr-[-5rem]"
                        href="#"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <div className="block md:hidden">
                  <button
                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                    aria-label="Toggle mobile menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Render children below header */}
      {/* {children} */}
    </>
  );
}
