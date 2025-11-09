import { Link } from "react-router-dom";

export default function Logo() {
  return (
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
  );
}
