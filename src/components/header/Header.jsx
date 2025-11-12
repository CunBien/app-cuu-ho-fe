// src/components/header/Header.jsx
import Logo from "./Logo.jsx";
import Nav from "./Nav.jsx";
import ProvinceSelect from "./ProvinceSelect.jsx";

export default function Header({ mapRef }) {
  return (
    <>
      {/* Header cố định, nền trắng, viền dưới nhẹ */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Logo />
          </div>

          {/* Dropdown */}
          <div className="flex-0.5 max-w-md mx-8">
            <ProvinceSelect mapRef={mapRef} />
          </div>

          {/* Nav */}
          {/* <div className="flex items-center">
            <Nav />
          </div> */}
        </div>
      </header>

      {/* Đẩy nội dung xuống dưới header */}
      <div className="h-16" />
    </>
  );
}
