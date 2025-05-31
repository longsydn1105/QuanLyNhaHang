function formatDateVN(isoDateString) {
  if (!isoDateString) return 'Không có';

  const date = new Date(isoDateString);
  if (isNaN(date)) return 'Không hợp lệ';
  
  const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // GMT+7

  const dd = String(vnTime.getDate()).padStart(2, '0');
  const mm = String(vnTime.getMonth() + 1).padStart(2, '0');
  const yyyy = vnTime.getFullYear();

  const hh = String(vnTime.getHours()).padStart(2, '0');
  const min = String(vnTime.getMinutes()).padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}
