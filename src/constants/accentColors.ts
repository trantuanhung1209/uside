// Định nghĩa các màu accent có sẵn
export const ACCENT_COLORS = {
  default: '#00d2ff',
  accent1: '#e8a9c4', // hồng pastel
  accent2: '#eabf94', // cam đào pastel
  accent3: '#e8e39a', // vàng pastel
  accent4: '#a9d7a1', // xanh lá pastel
  accent5: '#9fc9e8', // xanh dương pastel
} as const;

export type AccentColorType = keyof typeof ACCENT_COLORS;
