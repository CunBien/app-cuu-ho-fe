export default function Sidebar({ children }) {
  return (
    <div className="w-96 bg-white shadow-lg flex flex-col overflow-hidden">
      <div className="bg-red-600 text-white p-4">
        <h1 className="text-xl font-bold">HỆ THỐNG CỨU HỘ KHẨN CẤP</h1>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
