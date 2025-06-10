import type { FC } from "react";

import { getColor } from "../../../lib/utils/getColor";

type AminoLineProps = {
  seq: string;
  compareWith?: string;
  highlightDiff?: boolean;
};
export const AminoLine: FC<AminoLineProps> = ({
  seq,
  compareWith,
  highlightDiff = false,
}) => {
  const str = seq.split("");

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        display: "inline",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
      }}
    >
      {str.map((char, index) => {
        const isDiff = highlightDiff && compareWith?.[index] !== char;
        const color = highlightDiff
          ? isDiff
            ? getColor(char)
            : "transparent"
          : getColor(char);
        return (
          <span
            key={`s${char}-${index}`}
            style={{
              backgroundColor: color,
              fontFamily: "monospace",
              fontSize: "1.1rem",
              lineHeight: 1.5,
              userSelect: "text",
              textAlign: "center",
              minWidth: "1ch",
              display: "inline-block",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
