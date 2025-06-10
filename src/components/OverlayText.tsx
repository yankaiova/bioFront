import type { FC } from "react";

type OverlayTextProps = {
  text: string;
};

export const OverlayText: FC<OverlayTextProps> = ({ text }) => (
  <div
    aria-hidden="false"
    style={{
      position: "absolute",
      fontSize: "1.1rem",
      whiteSpace: "pre-wrap",
      fontFamily: "monospace",
      color: "transparent",
      textAlign: "left",
      userSelect: "text",
      zIndex: 3,
      width: "100%",
    }}
  >
    {text}
  </div>
);
