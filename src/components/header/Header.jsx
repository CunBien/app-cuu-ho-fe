import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <>
      <header className="bg-white shadow-sm border border-solid border-gray-300 relative">
        {/* Logo - sát trái */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-3 sm:pl-4 md:pl-6 lg:pl-8">
          <Link className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            <div className="flex flex-row items-center gap-3">
              <img
                src="/icons8-map.gif"
                alt="Biểu tượng bản đồ cứu hộ"
                className="w-8 h-8 object-contain"
              />
              <span className="md:inline text-xl font-bold text-gray-500 transition hover:text-gray-800">
                Hệ thống cứu hộ khẩn cấp
              </span>
            </div>
          </Link>
        </div>

        {/* Nav + Mobile Button - sát phải */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-3 sm:pr-4 md:pr-6 lg:pr-8">
          <div className="flex items-center gap-6">
            {/* Navigation - chỉ hiện trên md+ */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {["About"].map((item) => (
                  <li key={item}>
                    <a
                      className="text-sm font-medium text-gray-500 transition hover:text-gray-800"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

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

        {/* Container trung tâm (chỉ để giữ layout, không chứa logo/nav) */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-16"></div> {/* Chiều cao để tránh chồng lấp */}
        </div>
      </header>

      {/* Render children below header */}
      {/* {children} */}
    </>
  );
}
