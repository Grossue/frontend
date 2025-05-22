import { CSSProperties } from "react";

const fontFamily = `"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const FONT = {
  xxxl: {
    fontSize: "32px",
    lineHeight: "150%",
    fontFamily,
  } as CSSProperties,
  xxl: {
    fontSize: "24px",
    lineHeight: "150%",
    fontFamily,
  } as CSSProperties,
  xl: {
    fontSize: "20px",
    lineHeight: "150%",
    fontFamily,
  } as CSSProperties,
  lg: {
    fontSize: "18px",
    lineHeight: "160%",
    fontFamily,
  } as CSSProperties,
  md: {
    fontSize: "16px",
    lineHeight: "160%",
    fontFamily,
  } as CSSProperties,
  sm: {
    fontSize: "14px",
    lineHeight: "150%",
    fontFamily,
  } as CSSProperties,
  xs: {
    fontSize: "12px",
    lineHeight: "150%",
    fontFamily,
  } as CSSProperties,
  xxs: {
    fontSize: "10px",
    lineHeight: "120%",
    fontFamily,
  } as CSSProperties,
};

export default FONT;
