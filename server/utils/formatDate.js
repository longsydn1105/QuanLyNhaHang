// Đổi định dạng ISO → dạng người Việt dễ hiểu
export const formatDateVN = (isoDateString) => {
  if (!isoDateString) return 'Không có';

  const date = new Date(isoDateString);

  // Lấy múi giờ Việt Nam
  const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // GMT+7

  // Format thủ công dạng: dd/mm/yyyy hh:mm
  const dd = String(vnTime.getDate()).padStart(2, '0');
  const mm = String(vnTime.getMonth() + 1).padStart(2, '0');
  const yyyy = vnTime.getFullYear();

  const hh = String(vnTime.getHours()).padStart(2, '0');
  const min = String(vnTime.getMinutes()).padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
};
