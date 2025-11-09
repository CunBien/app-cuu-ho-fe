import Logo from "./Logo.jsx";
import Nav from "./Nav.jsx";

export default function Header({ children }) {
  return (
    <>
      <header className="bg-white shadow-sm border border-solid border-gray-300 relative">
        {/* Logo */}
        <Logo />
        {/* Nav + Mobile Button */}
        <Nav />
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
