import React from 'react';
import PropTypes from 'prop-types';

const cardContainer = (isSelected) => ({
  display: 'flex',
  alignItems: 'flex-start',
  background: isSelected ? 'linear-gradient(180deg,#fff5f5,#fff)' : '#fff',
  border: `1px solid ${isSelected ? '#f87171' : '#f0f0f0'}`,
  borderLeft: isSelected ? '4px solid #ef4444' : '4px solid transparent',
  borderRadius: 10,
  boxShadow: '0 8px 18px rgba(15,23,42,0.04)',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all .15s ease-in-out'
});

const imageStyle = {
  width: 90,
  height: 90,
  objectFit: 'cover',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  backgroundColor: '#f3f4f6',
};

const textContainer = {
  flex: 1,
  padding: '10px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const IncidentCard = ({ incident, onSelect, onExpand, isSelected }) => {
  const hasImage = !!incident.image || !!incident.imageUrl;
  const imageSrc = incident.image || incident.imageUrl || '';

  return (
    <div style={cardContainer(isSelected)} onClick={onSelect}>
      {/* Ảnh sự cố (nếu có) */}
      {hasImage ? (
        <img src={imageSrc} alt="Sự cố" style={imageStyle} />
      ) : (
        <div
          style={{
            ...imageStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: 12,
          }}
        >
          Không có ảnh
        </div>
      )}

      {/* Nội dung */}
      <div style={textContainer}>
        <div>
          <strong style={{ color: '#b91c1c' }}>
            {incident.title || 'Sự cố chưa có tiêu đề'}
          </strong>
          <div
            style={{
              fontSize: 13,
              color: '#4b5563',
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {incident.description
              ? incident.description.length > 60
                ? incident.description.slice(0, 60) + '…'
                : incident.description
              : 'Chưa có mô tả.'}
          </div>
        </div>

        {/* Hàng dưới cùng: trạng thái + mũi tên */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontSize: 12,
              padding: '4px 8px',
              borderRadius: 999,
              background: '#fee2e2',
              color: '#991b1b',
              fontWeight: 500,
            }}
          >
            {incident.status || 'Cần cứu trợ'}
          </span>

          {/* Mũi tên mở chi tiết */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            title="Xem chi tiết"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ef4444',
              color: 'white',
              width: 30,
              height: 30,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

IncidentCard.propTypes = {
  incident: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default IncidentCard;
