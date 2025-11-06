const urgencyColors = {
  critical: "bg-red-100 border-red-500",
  high: "bg-orange-100 border-orange-500",
  medium: "bg-yellow-100 border-yellow-500",
};

const disasterIcons = {
  flood: "🌊",
  landslide: "🪨",
};

export default function RescueCard({ data }) {
  return (
    <div
      className={`p-4 rounded-lg border-l-4 ${
        urgencyColors[data.urgency]
      } shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{data.name}</h3>
        <span className="text-2xl">{disasterIcons[data.disasterType]}</span>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <strong>Mức nước:</strong>{" "}
          {data.floodLevel ? `${data.floodLevel}m` : "N/A"}
        </p>
        <p>
          <strong>Người bị ảnh hưởng:</strong> {data.affectedPeople} người
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              data.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {data.status === "pending" ? "Chờ xử lý" : "Đang xử lý"}
          </span>
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {new Date(data.timestamp).toLocaleString("vi-VN")}
      </p>
    </div>
  );
}
