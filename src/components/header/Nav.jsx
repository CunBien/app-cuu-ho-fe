export default function Nav() {
  return (
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
  );
}
