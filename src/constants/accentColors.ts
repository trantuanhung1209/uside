export const ACCENT_COLORS = {
  default: '#00d2ff',  // Cyan sáng – mặc định, hiện đại

  accent1: '#ff4da6',  // Hồng magenta sáng – nổi bật, cân bằng với cyan
  accent2: '#ff884d',  // Cam san hô tươi – ấm, vẫn trong sáng
  accent3: '#ffd633',  // Vàng tươi – sáng rõ, không quá chói
  accent4: '#33d96f',  // Xanh lá tươi (emerald/green mint) – fresh
  accent5: '#3385ff',  // Xanh dương sáng – công nghệ, đồng điệu với cyan
} as const;

export type AccentColorType = keyof typeof ACCENT_COLORS;
