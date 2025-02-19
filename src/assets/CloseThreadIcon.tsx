/* eslint-disable max-len */
export const CloseThreadIcon = ({ closeThread }: {
  closeThread?: (event: React.BaseSyntheticEvent) => void;
}) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={closeThread}
    style={{
      cursor     : 'pointer',
      marginRight: '10px'
    }}
  >
    <path
      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
      fill="#3E3E41"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.5625 25.4416L22.1208 20L27.5625 14.5583C28.15 13.9708 28.15 13.025 27.5625 12.4375C26.975 11.85 26.0291 11.85 25.4416 12.4375L20 17.8791L14.5583 12.4375C13.9708 11.85 13.025 11.85 12.4375 12.4375C11.85 13.025 11.85 13.9708 12.4375 14.5583L17.8791 20L12.4375 25.4416C11.85 26.0291 11.85 26.975 12.4375 27.5625C13.025 28.15 13.9708 28.15 14.5583 27.5625L20 22.1208L25.4416 27.5625C26.0291 28.15 26.975 28.15 27.5625 27.5625C28.1458 26.975 28.1458 26.025 27.5625 25.4416Z"
      fill="#E9E9EA"
    />
  </svg>
);
