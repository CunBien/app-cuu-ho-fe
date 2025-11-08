export default function Sidebar({ children }) {
  return (
    <div className="w-96 bg-white shadow-lg flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
