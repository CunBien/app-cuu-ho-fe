import React from "react";
import PropTypes from "prop-types";

// ===== Styles =====
const cardContainer = (isSelected) => ({
  display: "flex",
  alignItems: "flex-start",
  background: isSelected ? "linear-gradient(180deg, #fff5f5, #fff)" : "#fff",
  border: `1px solid ${isSelected ? "#f87171" : "#f0f0f0"}`,
  borderLeft: isSelected ? "4px solid #ef4444" : "4px solid transparent",
  borderRadius: 10,
  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.15s ease-in-out",
  userSelect: "none",
  marginBottom: 10,
});

const imageStyle = {
  width: 90,
  height: 90,
  objectFit: "cover",
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  backgroundColor: "#f3f4f6",
  flexShrink: 0,
};

const textContainer = {
  flex: 1,
  padding: "10px 12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: 0,
};

const titleStyle = {
  color: "#b91c1c",
  fontWeight: "bold",
  fontSize: 14,
  margin: 0,
  lineHeight: 1.3,
};

const descStyle = {
  fontSize: 13,
  color: "#4b5563",
  marginTop: 4,
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const statusBadge = (status) => ({
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 999,
  background: "#fee2e2",
  color: "#991b1b",
  fontWeight: 500,
  whiteSpace: "nowrap",
});

const expandButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ef4444",
  color: "white",
  width: 30,
  height: 30,
  borderRadius: 8,
  cursor: "pointer",
  transition: "background 0.2s",
  flexShrink: 0,
  border: "none",
};

// ===== Component =====
const IncidentCard = ({ incident, onSelect, onExpand, isSelected }) => {
  const hasImage = !!(incident?.image || incident?.imageUrl);
  const imageSrc = incident?.image || incident?.imageUrl || "";
  const title = incident?.title || incident?.name || "Sự cố chưa có tiêu đề";
  const description = incident?.description || "Chưa có mô tả.";
  const status = incident?.status || "Cần cứu trợ";

  const shortDesc =
    description.length > 60 ? description.slice(0, 60) + "..." : description;

  return (
    <div
      style={cardContainer(isSelected)}
      onClick={() => onSelect?.(incident)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.(incident)}
    >
      {/* === Ảnh === */}
      {hasImage ? (
        <img src={imageSrc} alt={title} style={imageStyle} loading="lazy" />
      ) : (
        <div
          style={{
            ...imageStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          Không có ảnh
        </div>
      )}

      {/* === Nội dung === */}
      <div style={textContainer}>
        <div>
          <div style={titleStyle}>{title}</div>
          <div style={descStyle} title={description}>
            {shortDesc}
          </div>
        </div>

        {/* === Hàng dưới === */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
            gap: 8,
          }}
        >
          <span style={statusBadge(status)}>{status}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand?.(incident);
            }}
            style={expandButton}
            title="Xem chi tiết"
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#dc2626")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#ef4444")
            }
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== PropTypes =====
IncidentCard.propTypes = {
  incident: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  isSelected: PropTypes.bool,
};

IncidentCard.defaultProps = {
  onSelect: () => {},
  onExpand: () => {},
  isSelected: false,
};

export default IncidentCard;
