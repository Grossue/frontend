import { CSSProperties } from "react";
const fontFamily = `"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const createFontStyle = (
  fontSize: string,
  lineHeight: string,
): Record<'regular' | 'medium' | 'semibold' | 'bold', CSSProperties> => ({
  regular: { fontSize, lineHeight, fontFamily, fontWeight: 400 },
  medium: { fontSize, lineHeight, fontFamily, fontWeight: 500 },
  semibold: { fontSize, lineHeight, fontFamily, fontWeight: 600 },
  bold: { fontSize, lineHeight, fontFamily, fontWeight: 700 },
});

const FONT = {
  xxxl: createFontStyle("32px", "150%"),
  xxl: createFontStyle("24px", "150%"),
  xl: createFontStyle("20px", "150%"),
  lg: createFontStyle("18px", "160%"),
  md: createFontStyle("16px", "160%"),
  sm: createFontStyle("14px", "150%"),
  xs: createFontStyle("12px", "150%"),
  xxs: createFontStyle("10px", "120%"),
};

export default FONT;
